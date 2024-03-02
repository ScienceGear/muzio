const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const { readdirSync } = require("fs");
const { supportUrl, inviteUrl, voteUrl } = require("../../../settings/config.js");
const { config } = require("process");
const emoji = require("../../../settings/emoji.js");

module.exports = {
    name: "help",
    description: "Display all commands of the bot.",
    category: "Information",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: false,
        sameVc: false,
        player: false,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const row2 = new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setLabel("Invite Muzio").setURL(inviteUrl).setStyle(ButtonStyle.Link))
            .addComponents(new ButtonBuilder().setLabel("Support Server").setURL(supportUrl).setStyle(ButtonStyle.Link));

        const categories = readdirSync("./src/commands/Slash/");

        const embed = new EmbedBuilder()
            .setAuthor({
                    name: client.user.username,
                    iconURL: client.user.displayAvatarURL()
            })
            .setColor(client.color)
            .setDescription(`👋🏻 Hey ${interaction.member} I am **${client.user.username}** A complete Music Bot for your server Providing you the best quality music`)
            .addFields({
                name: `Links`,
                value: `[**Muzio**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) \n [**Support Server**](${supportUrl}) \n [**Vote me**](${voteUrl})`
            })
            .addFields({
                name: `Command Categories`,
                value: `${emoji.custom_emoji.dev} : **Developer** \n ${emoji.custom_emoji.filters} : **Filters** \n ${emoji.custom_emoji.info} : **Information** \n ${emoji.custom_emoji.music} : **Music** \n ${emoji.custom_emoji.premium} : **Premium**`
            })            
            .setFooter({
                text: `Thanks For Selecting Muzio!`,
                iconURL: interaction.member.displayAvatarURL({
                    dynamic: true
                })
            })
            .setThumbnail(interaction.guild.iconURL({
                dynamic: true
            }))
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("help-category")
                .setPlaceholder(`Muzio is Love!`)
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions(
                    categories.map((category) => {
                        const emojiMapping = {
                            Developer: emoji.custom_emoji.dev,
                            Filters: emoji.custom_emoji.filters,
                            Information: emoji.custom_emoji.info,
                            Music: emoji.custom_emoji.music,
                            Premium: emoji.custom_emoji.premium
                        };
                        const emojiForCategory = emojiMapping[category];
                        return {
                            label: `${category}`,
                            emoji: `${emojiForCategory}`,
                            value: category
                        };
                    })
                ),
        ]);

        interaction.editReply({ embeds: [embed], components: [row, row2] }).then(async (msg) => {
            let filter = (i) => i.isStringSelectMenu() && i.user && i.message.author.id == client.user.id;

            let collector = await msg.createMessageComponentCollector({
                filter,
                time: 90000,
            });

            collector.on("collect", async (m) => {
                if (m.isStringSelectMenu()) {
                    if (m.customId === "help-category") {
                        await m.deferUpdate();

                        let [directory] = m.values;

                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: `${interaction.guild.members.me.displayName}`,
                                iconURL: interaction.guild.iconURL({ dynamic: true }),
                            })
                            .setDescription(
                                `\ \n\n**\<:icons_audioenable:1123545966335762462> ${
                                    directory.slice(0, 1).toUpperCase() + directory.slice(1)
                                } Commands:**\n${client.slashCommands
                                    .filter((c) => c.category === directory)
                                    .map((c) => `\`${c.name}\` : ${c.description}`)
                                    .join("\n")}`
                            )
                            .setColor(client.color)
                            .setFooter({
                                text: `Muzio | Total Commands: ${
                                    client.slashCommands.filter((c) => c.category === directory).size
                                }`,
                                iconURL: client.user.displayAvatarURL({ dynamic: true }),
                            })
                            .setTimestamp();

                        msg.edit({ embeds: [embed] });
                    }
                }
            });

            collector.on("end", async (collected, reason) => {
                if (reason === "time") {
                    const timed = new EmbedBuilder()
                        .setAuthor({
                            name: `${interaction.guild.members.me.displayName}`,
                            iconURL: interaction.guild.iconURL({ dynamic: true }),
                        })
                        .setDescription(
                            `Help Command Menu was timed out, try using \`/help\` to show the help command menu again.`
                        )
                        .setColor(client.color)
                        .setFooter({
                            text: `Muzio!`,
                            iconURL: client.user.displayAvatarURL({ dynamic: true }),
                        })
                        .setTimestamp();

                    msg.edit({ embeds: [timed], components: [row2] });
                }
            });
        });
    },
};
