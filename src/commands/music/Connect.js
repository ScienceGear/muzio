const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Connect extends AvonCommand{
    get name(){
        return 'connect'
    }
    get aliases(){
        return ['join','conn']
    }
    get player(){
        return false;
    }
    get inVoice(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get sameVoice(){
        return false;
    }
    async run(client,message,args,prefix){
        let player = client.poru.players.get(message.guild.id);
        if(player){
            if(message.guild.members.me.voice.channel){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| I am already connected Somewhere else` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            } else {
                player.destroy();
                client.poru.createConnection({
                    guildId : message.guild.id,
                    voiceChannel : message.member.voice.channelId,
                    textChannel : message.channel.id,
                    selfMute : false,
                    selfDeaf : true
                });
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Connected to your voice channel` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            }
        }
        else{
            client.poru.createConnection({
                guildId : message.guild.id,
                voiceChannel : message.member.voice.channelId,
                textChannel : message.channel.id,
                selfMute : false,
                selfDeaf : true
            });
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Connected to your voice channel`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
    }
}
module.exports = Connect;