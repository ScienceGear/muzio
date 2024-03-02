const { EmbedBuilder } = require("discord.js");
const os = require("os");
const pretty = require('pretty-ms');
const emoji = require("../../../settings/emoji");

module.exports = {
    name: "uptime",
    description: "Returns information about bot uptime",
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
    let uptime = await os.uptime();

        let d = Math.floor(uptime / (3600 * 24));
        let h = Math.floor((uptime % (3600 * 24)) / 3600);
        let m = Math.floor((uptime % 3600) / 60);
        let s = Math.floor(uptime % 60);
        let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
        let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
      await interaction.deferReply({ ephemeral: false });

        const embed = new EmbedBuilder()
            .setTitle(`${emoji.custom_emoji.uptime} Uptime Information!`)
            .setDescription(`\`\`\`yml\n❓ Status : Online\n⏲ Uptime : ${pretty(client.uptime)}\n📊 System Uptime : ${dDisplay + hDisplay + mDisplay + sDisplay}\n\`\`\``)
            .setColor(client.color);

        interaction.followUp({ embeds: [embed] });
    },
};
