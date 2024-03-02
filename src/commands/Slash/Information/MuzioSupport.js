const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { supportUrl, inviteUrl } = require("../../../settings/config");

module.exports = {
    name: "support",
    description: "Join The Support Server.",
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


        const embed = new EmbedBuilder().setDescription(`### You can join our support discord by clicking [here](${supportUrl})`).setColor(client.color);

        return interaction.editReply({ embeds: [embed] });
    },
};
