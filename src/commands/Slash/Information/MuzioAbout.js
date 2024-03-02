const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { supportUrl, inviteUrl, voteUrl } = require("../../../settings/config.js");
const ms = require("pretty-ms");
const emoji = require("../../../settings/emoji.js");

module.exports = {
    name: "about",
    description: "Show information about the bot.",
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

        const playingPlayers = client.poru.leastUsedNodes[0].stats.players;
        let uptime = await client.uptime;

        let scount = client.guilds.cache.size;
        let mcount = 0;

        client.guilds.cache.forEach((guild) => {
            mcount += guild.memberCount;
        });

        const row = new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setLabel("Invite Me").setURL(inviteUrl).setStyle(ButtonStyle.Link))
            .addComponents(new ButtonBuilder().setLabel("Vote Me").setURL(voteUrl).setStyle(ButtonStyle.Link))
            .addComponents(new ButtonBuilder().setLabel("Support Server").setURL(supportUrl).setStyle(ButtonStyle.Link));

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.members.me.displayName} About Panel!`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(`👋🏻 Hey ${interaction.member} I am **${client.user.username}** A complete Music Bot for your server Providing you the best quality music`)
            .addFields([
                { name: `${emoji.custom_emoji.home} Server`, value: `\`\`\`Total: ${scount} Server\`\`\``, inline: true },
                { name: `${emoji.custom_emoji.users} Users`, value: `\`\`\`Total: ${mcount} Users\`\`\``, inline: true },
                { name: `${emoji.custom_emoji.djs} Discord.js`, value: `\`\`\`v14.11.0\`\`\``, inline: true },
                { name: `${emoji.custom_emoji.node} Node.js`, value: `\`\`\`v18.16.0\`\`\``, inline: true },
                { name: `${emoji.custom_emoji.time} Uptime`, value: `\`\`\`${ms(uptime)}\`\`\``, inline: true },
                { name: `${emoji.custom_emoji.ping} Ping`, value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``, inline: true },
                { name: `${emoji.custom_emoji.owner} Creator`, value: `\`\`\`science_gear\`\`\``, inline: true },
                { name: `${emoji.custom_emoji.admin} Team`, value: `\`\`\`science_gear, mrduke15 , azerty442005\`\`\``, inline: true },
            ])
            .setColor(client.color)
            .setFooter({ text: `Muzio !`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        return interaction.editReply({ embeds: [embed], components: [row] });
    },
};
