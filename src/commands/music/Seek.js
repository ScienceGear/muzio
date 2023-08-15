const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Seek extends AvonCommand{
    get name(){
        return 'seek'
    }
    get aliases(){
        return ['']
    }
    get cat(){
        return 'music'
    }
    get player(){
        return true;
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix,player){
        if(!args[0] || isNaN(args[0]))
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Provide me a valid seekable number`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(!player.currentTrack.isSeekable){
            return message.channel.send({embeds : [new EmbedBuilder().setAuthor({name : `| The track is not seekable` , iconURL : message.author.displayAvatarURL({dynamic : true})}).setColor(client.config.color)]})
        }
        player.seekTo(args[0] * 1000);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Seeked the track ${args[0]}s`})]})
    }
}
module.exports = Seek;