const { EmbedBuilder } = require("discord.js");
const User = require("../../../settings/models/User.js");
const moment = require("moment");

module.exports = {
    name: "list",
    description: "Get list of all premium user",
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
        const users = await User.find();

        let usersData = users.filter((user) => user.isPremium === true);
        let premium = usersData.map(
            (x, index) =>
                `\`\`\`${index + 1}. ${x.Id} | Plan: ${x.premium.plan} | Expire At: ${moment(x.premium.expiresAt).format(
                    "dddd, MMMM Do YYYY",
                )}\`\`\``,
        );

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Premium Users List`, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setColor(client.color)
            .setDescription(premium.join("\n") || "```No Premium User Found```");

        return message.reply({ embeds: [embed] });
    },
};
