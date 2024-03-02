const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");
const Code = require("../../../settings/models/Code.js");
const User = require("../../../settings/models/User.js");
const emoji = require("../../../settings/emoji.js");

module.exports = {
    name: "redeem",
    description: "Redeem your premium code.",
    category: "Premium",
    options: [
        {
            name: "code",
            description: "Provide valid code.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
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

        const input = interaction.options.getString("code");
        const user = await User.findOne({ Id: interaction.user.id });
        const code = await Code.findOne({ code: input.toUpperCase() });

        if (user && user.isPremium) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | You already a premium user.`);

            return interaction.editReply({ embeds: [embed] });
        }

        if (code) {
            if (code.plan === "minutely") {
                user.isPremium = true;
                user.premium.redeemedBy.push(interaction.user);
                user.premium.redeemedAt = Date.now();
                user.premium.expiresAt = Date.now() + 300000;
                user.premium.plan = code.plan;

                const newUser = await user.save();
                client.premium.set(interaction.user.id, newUser);
                await code.delete();
            }

            if (code.plan === "daily") {
                user.isPremium = true;
                user.premium.redeemedBy.push(interaction.user);
                user.premium.redeemedAt = Date.now();
                user.premium.expiresAt = Date.now() + 86400000;
                user.premium.plan = code.plan;

                const newUser = await user.save();
                client.premium.set(interaction.user.id, newUser);
                await code.delete();
            }

            if (code.plan === "weekly") {
                user.isPremium = true;
                user.premium.redeemedBy.push(interaction.user);
                user.premium.redeemedAt = Date.now();
                user.premium.expiresAt = Date.now() + 86400000 * 7;
                user.premium.plan = code.plan;

                const newUser = await user.save();
                client.premium.set(interaction.user.id, newUser);
                await code.delete();
            }

            if (code.plan === "monthly") {
                user.isPremium = true;
                user.premium.redeemedBy.push(interaction.user);
                user.premium.redeemedAt = Date.now();
                user.premium.expiresAt = Date.now() + 86400000 * 30;
                user.premium.plan = code.plan;

                const newUser = await user.save();
                client.premium.set(interaction.user.id, newUser);
                await code.delete();
            }

            if (code.plan === "yearly") {
                user.isPremium = true;
                user.premium.redeemedBy.push(interaction.user);
                user.premium.redeemedAt = Date.now();
                user.premium.expiresAt = Date.now() + 86400000 * 365;
                user.premium.plan = code.plan;

                const newUser = await user.save();
                client.premium.set(interaction.user.id, newUser);
                await code.delete();
            }

            if (code.plan === "lifetime") {
                user.isPremium = true;
                user.premium.redeemedBy.push(interaction.user);
                user.premium.redeemedAt = Date.now();
                user.premium.expiresAt = Date.now() + 86400000 * 365 * 100;
                user.premium.plan = code.plan;

                const newUser = await user.save();
                client.premium.set(interaction.user.id, newUser);
                await code.delete();
            }

            const expires = moment(user.premium.expiresAt).format("dddd, MMMM Do YYYY HH:mm:ss");

            const embed = new EmbedBuilder()
                .setAuthor({ name: `Premium Redeemed!`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`Conratulations ${emoji.custom_emoji.supporter} ${interaction.member}. You've successfully redeem premium code with the following details.`)
                .setThumbnail(interaction.user.displayAvatarURL())
                .setColor(client.color)
                .setTimestamp();

            if (user.premium.plan === "lifetime") {
                embed.addFields([
                    { name: `${emoji.custom_emoji.premium} | Redeemed By`, value: `\`\`\`${interaction.member.displayName}\`\`\``, inline: true },
                    { name: `${emoji.custom_emoji.vip} | Plan Type`, value: `\`\`\`${user.premium.plan}\`\`\``, inline: true },
                    { name: `${emoji.custom_emoji.supporter} | Expired Time`, value: `\`\`\`Never\`\`\``, inline: false },
                ]);
            } else {
                embed.addFields([
                    { name: `${emoji.custom_emoji.premium} | Redeemed By`, value: `\`\`\`${interaction.member.displayName}\`\`\``, inline: true },
                    { name: `${emoji.custom_emoji.vip} | Plan Type`, value: `\`\`\`${user.premium.plan}\`\`\``, inline: true },
                    { name: `${emoji.custom_emoji.supporter} | Expired Time`, value: `\`\`\`${expires}\`\`\``, inline: false },
                ]);
            }

            return interaction.editReply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | The provided code was invalid, please use a valid one.`);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
