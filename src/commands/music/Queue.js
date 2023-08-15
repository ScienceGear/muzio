const { EmbedBuilder, ActionRowBuilder, ButtonBuilder , ButtonStyle } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");
const ms = require('ms');
const lodash = require(`lodash`);
class Queue extends AvonCommand{
    get name(){
        return 'queue';
    }
    get aliases(){
        return ['q','que'];
    }
    get inVoice(){
        return false;
    }
    get sameVoice(){
        return false;
    }
    get player(){
        return true;
    }
    get cat(){
        return 'music'
    }
    async run(client,message,args,prefix,player){
        try{
        if(player.queue.length)
        {
            let queuedSongs = player.queue.map((track,index) => `\`[${index + 1}]\` [${track.info.title.substring(0,45)}](${client.config.server}) ◽ ${ms(track.info.length)}`);
            const maps = lodash.chunk(queuedSongs,10);
            const pages = maps.map(x => x.join('\n'));
            let page = 0;

            if(player.queue.length < 11)
            {
                let embed = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`}).setDescription(`**Now Playing** \n > [${player.currentTrack.info.title}](${client.config.server}) ${client.emoji.arrow} ${ms(player.currentTrack.info.length)} \n \n **Coming Up** \n ${pages[page]}`).setFooter({text : `Page ${page + 1} Out of ${pages.length}`});
                return message.channel.send({embeds : [embed]});
            }
            let em = new EmbedBuilder().setColor(client.config.color).setDescription(`**Now Playing** \n > [${player.currentTrack.info.title}](${client.config.server}) ${client.emoji.arrow} ${ms(player.currentTrack.info.length)} \n \n **Coming Up** \n ${pages[page]}`).setAuthor({name : `${message.guild.name}'s Queue`});
            let but1 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`prev`).setLabel(`Previous`);
            let but2 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`nxt`).setLabel(`Next`);

            let ro = new ActionRowBuilder().addComponents(but1,but2);

            let msg = await message.channel.send({embeds : [em],components : [ro]});

            let call = await msg.createMessageComponentCollector({
                filter:(b) => {
                    if(b.user.id === message.author.id) return true;
                    else{
                        return b.reply({content : `${client.emoji.cross} | This is not your session`,ephemeral : true})
                    }
                },
                time : 60000 * 5
            });
            call.on("collect",async(b) => {
                if(b.isButton())
                {
                    if(b.customId === `nxt`)
                    {
                        await b.deferUpdate().catch(() => {});
                        page = page + 1 < pages.length ? ++page : 0;

                        const embed3 = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`}).setDescription(`**Now Playing** \n > [${player.currentTrack.info.title}](${client.config.server}) ${client.emoji.arrow} ${ms(player.currentTrack.info.length)} \n \n **Coming Up** \n ${pages[page]}`).setFooter({text : `page ${page + 1} Out of ${pages.length}`});
                        await msg.edit({embeds : [embed3],components : [new ActionRowBuilder().addComponents([but1,but2])]});
                    }
                    else if(b.customId === `prev`)
                    {
                        await b.deferUpdate().catch(() => {});
                        page = page > 0 ? --page : pages.length - 1;

                        const embed4 = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`}).setDescription(`**Now Playing** \n > [${player.currentTrack.info.title}](${client.config.server}) ${client.emoji.arrow} ${ms(player.currentTrack.info.length)} \n \n **Coming Up** \n ${pages[page]}`).setFooter({text : `page ${page + 1} Out of ${pages.length}`});
                        await msg.edit({embeds : [embed4],components : [new ActionRowBuilder().addComponents([but1,but2])]});
                    }
                }
            });
            call.on('end',async() => {
                if(!msg) return;
                else{
                    msg.edit({components : [but1.setDisabled(true),but2.setDisabled(true)]});
                }
            })
        }
        else{
            let emb = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`}).setDescription(`**Now Playing** \n > [${player.currentTrack.info.title}](${client.config.server}) ${client.emoji.arrow} ${ms(player.currentTrack.info.length)}`)
            return message.channel.send({embeds : [emb]});
        }
    } catch(e) { console.log(e) }
}
}
module.exports = Queue;