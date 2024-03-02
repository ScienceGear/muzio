const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionType } = require("discord.js");
const { voteUrl } = require("../../../settings/config.js");
const Ban = require("../../../settings/models/Ban.js");
const emoji = require("../../../settings/emoji.js");

module.exports.run = async (client, interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = client.slashCommands.get(interaction.commandName);

        // GETTING PREMIUM USER DATABASW
        let user = client.premium.get(interaction.user.id);
        await client.createInteraction(interaction);

        if (!command) return;

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Vote Muzio").setURL(voteUrl).setStyle(ButtonStyle.Link),
        );

        if (client.dev.has(true) && interaction.user.id !== client.owner) {
            return interaction.reply({
                content: `👋🏻 Hey Users\n**${client.user} is under maintenance right now**`,
                components: [row],
                ephemeral: true,
            });
        }

        const msg_cmd = [
            `[SLASH] ${command.name}`,
            `used by ${interaction.user.tag} from ${interaction.guild.name} (${interaction.guild.id})`,
        ];

        console.log(`${msg_cmd.join(" ")}`);

        const userBan = await Ban.findOne({ userID: interaction.user.id });

        if (userBan && userBan.isBanned === true && interaction.user.id !== client.owner) {
            return interaction.reply({
                content: `${emoji.custom_emoji.cross} | You are banned from using ${client.user}, click the button support to appeal.`,
                components: [row],
                ephemeral: true,
            });
        }

        // DEFAULT PERMISSIONS
        const botPermissions = ["ViewChannel", "SendMessages", "EmbedLinks"];
        const botMissingPermissions = [];

        for (const perm of botPermissions) {
            if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(perm)) {
                botMissingPermissions.push(perm);
            }
        }

        if (botMissingPermissions.length > 0) {
            return interaction.reply({
                content: `${emoji.custom_emoji.cross} | I don't have one of these permissions \`ViewChannel\`, \`SendMessages\`, \`EmbedLinks\`.\nPlease double check them in your server role & channel settings.`,
                components: [row],
                ephemeral: true,
            });
        }

        const warning = new EmbedBuilder().setColor(client.color);

        // CHECK BOT COMMANDS PERMISSIONS
        if (!interaction.guild.members.cache.get(client.user.id).permissions.has(command.permissions.bot || [])) {
            warning.setDescription(`${emoji.custom_emoji.cross} | I don't have permission \`${command.permissions.bot.join(", ")}\` to execute this command.`);

            return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
        }

        // CHECK USER PERMISSIONS
        if (!interaction.member.permissions.has(command.permissions.user || [])) {
            warning.setDescription(
                `${emoji.custom_emoji.cross} | You don't have permission \`${command.permissions.user.join(", ")}\` to execute this command.`,
            );

            return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
        }

        // CHECK PLAYER & CURRENT PLAYING
        let player = client.poru.players.get(interaction.guild.id);
        //Player check
        if (command.settings.player && !player) {
            warning.setDescription(`${emoji.custom_emoji.cross} | There isn't player exists for this server.`);

            return interaction.reply({ embeds: [warning], ephemeral: true });
        }

        // CURRENT PLAYING CHECK
        if (command.settings.current && !player.currentTrack) {
            warning.setDescription(`${emoji.custom_emoji.cross} | There isn't any current playing right now.`);

            return interaction.reply({ embeds: [warning], ephemeral: true });
        }

        // CHECK IN VOICE & SAME VOICE CHANNEL
        const { channel } = interaction.member.voice;
        //In Voice Channel Check
        if (command.settings.inVc) {
            if (!channel) {
                warning.setDescription(`${emoji.custom_emoji.cross} | You must be in a voice channel to use this command.`);

                return interaction.reply({ embeds: [warning], ephemeral: true });
            }

            // BOT IN CHANNEL CHECK
            if (
                !interaction.guild.members.cache
                    .get(client.user.id)
                    .permissionsIn(channel)
                    .has(command.permissions.channel || [])
            ) {
                warning.setDescription(
                    `${emoji.custom_emoji.cross} | I don't have permission \`${command.permissions.channel.join(
                        ", ",
                    )}\` to execute this command in this channel.`,
                );

                return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
            }
        }

        // SAME VOICE CHANNEL CHECK
        if (command.settings.sameVc) {
            if (!channel || interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
                warning.setDescription(`${emoji.custom_emoji.cross} | You must be on the same voice channel as mine to use this command.`);

                return interaction.reply({ embeds: [warning], ephemeral: true });
            }

            // BOT IN CHANNEL CHECK
            if (
                !interaction.guild.members.cache
                    .get(client.user.id)
                    .permissionsIn(channel)
                    .has(command.permissions.channel || [])
            ) {
                warning.setDescription(
                    `${emoji.custom_emoji.cross} | I don't have permission \`${command.permissions.channel.join(
                        ", ",
                    )}\` to execute this command in this channel.`,
                );

                return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
            }
        }

        // PREMIUM USER CHECK
        if (command.settings.premium) {
            if (user && !user.isPremium) {
                warning.setDescription(`${emoji.custom_emoji.cross} | You're not premium user!`);

                return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
            }
        }

        // CHECK OWNER
        if (command.settings.owner && interaction.user.id !== client.owner) {
            warning.setDescription(`${emoji.custom_emoji.cross} | Only my owner can use this command!\n\nMuzio !`);

            return interaction.reply({ embeds: [warning], ephemeral: true });
        }

        // ERORR HANDLING
        try {
            command.run(client, interaction);
        } catch (error) {
            console.log(error);

            warning.setDescription(`${emoji.custom_emoji.cross} | Something went wrong.`);

            return interaction.editReply({ embeds: [warning], components: [row], ephmeral: true });
        }
    }
};
