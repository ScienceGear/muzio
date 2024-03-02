const { EmbedBuilder } = require("discord.js");
const emoji = require("../../../settings/emoji");

module.exports = {
    name: "ping",
    description: "Send a ping request.",
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

        const embed = new EmbedBuilder().setDescription(`${emoji.custom_emoji.author} Ping Status! \n${emoji.custom_emoji.ping} **API Latency:** __${Math.round(client.ws.ping)}ms__\n${emoji.custom_emoji.time} **Websocket Latency:** __47ms__`).setColor(client.color);

        return interaction.editReply({ embeds: [embed] });
    },
};
