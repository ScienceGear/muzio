const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "generate",
    description: "Generate premium user code.",
    category: "Developer",
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
        owner: true,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const embed = new EmbedBuilder().setDescription(`Use ${prefix}generate to Generate Premium Codes`).setColor(client.color);

        return interaction.editReply({ embeds: [embed] });
    },
};
