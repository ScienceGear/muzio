const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Resume extends AvonCommand{
    get name(){
        return 'resume'
    }
    get aliases(){
        return ['chalu','res']
    }
    get player(){
        return true
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true
    }
    get sameVoice(){
        return true
    }
    async run(client,message,args,prefix,player){
        if(!player.isPaused){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Player is already resumed` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        else{
            player.pause(false);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Resumed the Player` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
    }
}
module.exports = Resume;