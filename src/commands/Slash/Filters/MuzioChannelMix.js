const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "channelmix",
    description: "Set the current player filter to ChannelMix.",
    category: "Filters",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: false,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = client.poru.players.get(interaction.guild.id);

        await player.filters.setChannelMix(true);

        const embed = new EmbedBuilder().setDescription(`\`🔩\` | Filter has been set to: \`ChannelMix\``).setColor(client.color);

        return interaction.editReply({ embeds: [embed] });
    },
};
