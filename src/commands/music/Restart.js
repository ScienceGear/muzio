const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Restart extends AvonCommand{
    get name(){
        return 'restart';
    }
    get aliases(){
        return ['replay'];
    }
    get cat(){
        return 'music'
    }
    get player(){
        return true;
    }
    get inVoice(){
        return true
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix,player){
        player.seekTo(0);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Restarted th currently playing song` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
    }
}
module.exports = Restart;