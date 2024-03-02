const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "node",
    description: "Check node of bot!.",
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
        const nodes = client.poru.leastUsedNodes;

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${client.user.username} Node Premium Information!`,
                iconURL: message.guild.iconURL({ dynamic: false }),
            })
            .setColor(client.color)
            .setTimestamp(Date.now());

        for (const node of nodes) {
            const stats = node.stats;
            const fields = [
                {
                    name: `**Node ${node.name} Connected **`,
                    value: `\`\`\`Connected: ${node.stats.players}\nPlaying: ${node.stats.playingPlayers}\nUptime: ${new Date(
                        node.stats.uptime,
                    )
                        .toISOString()
                        .slice(11, 19)}\`\`\``,
                    inline: false,
                },
                {
                    name: "CPU Information",
                    value: `\`\`\`Cores: ${node.stats.cpu.cores}\nSystem Load: ${(
                        Math.round(node.stats.cpu.systemLoad * 100) / 100
                    ).toFixed(2)}%\nLavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%\`\`\``,
                    inline: false,
                },
                {
                    name: "Memory Information",
                    value: `\`\`\`Reservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}MB\nUsed Memory: ${Math.round(
                        node.stats.memory.used / 1024 / 1024,
                    )}MB\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}MB\nAllocated Memory: ${Math.round(
                        node.stats.memory.allocated / 1024 / 1024,
                    )}MB\`\`\``,
                    inline: false,
                },
            ];

            embed.addFields(fields);
        }

        return message.channel.send({ embeds: [embed] });
    },
};
