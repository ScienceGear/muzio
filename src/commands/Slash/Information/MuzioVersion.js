const { EmbedBuilder } = require("discord.js");
const emoji = require("../../../settings/emoji");

module.exports = {
    name: "version",
    description: "Gives you the version of bot.",
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

        const embed = new EmbedBuilder()
        .setTitle("Version Information")
        .setDescription(`\n\n> ${emoji.custom_emoji.arrow} **Bot Name:** ${client.user.username}\n\n> ${emoji.custom_emoji.arrow} **Bot Version:** 2.0.8\n\n\> ${emoji.custom_emoji.arrow} **Discord.js Version:** __14.11.0__\n\n\> ${emoji.custom_emoji.arrow} **Node.js Version:** __18.16.0__\n`).setColor(client.color);

        return interaction.editReply({ embeds: [embed] });
    },
};
