const { EmbedBuilder } = require("discord.js");
const emoji = require("../../../settings/emoji");

module.exports = {
    name: "restart",
    description: "Restart The System.",
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
    run: async (client, message) => {
        const embed = new EmbedBuilder().setDescription(`${emoji.custom_emoji.admin} | Bot is: \`Restarting\``).setColor(client.color);

        await message.reply({ embeds: [embed] });

        process.exit();
    },
};
