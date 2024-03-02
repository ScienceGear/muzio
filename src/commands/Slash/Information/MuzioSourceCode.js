const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { inviteUrl } = require("../../../settings/config");

module.exports = {
    name: "sourcecode",
    description: "Get My Source Code.",
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
            .addComponents(
                new ButtonBuilder().setLabel("Source Code").setURL("https://github.com/ScienceGear/muzio").setStyle(ButtonStyle.Link),
                new ButtonBuilder().setLabel("Invite Me").setURL(inviteUrl).setStyle(ButtonStyle.Link)
            );

        const embed = new EmbedBuilder().setDescription(`# Download Source Code `).setImage("https://i.imgur.com/HB32QqX.png")
        .setColor(client.color);

        return interaction.editReply({ embeds: [embed], components: [row2.toJSON()] });
    },
};
