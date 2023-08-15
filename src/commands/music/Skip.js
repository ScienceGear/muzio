const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Skip extends AvonCommand{
    get name(){
        return 'skip'
    }
    get aliases(){
        return ['s','sk','next']
    }
    get inVoice(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get sameVoice(){
        return true;
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        player.stop();
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Skipped the current track` , iconURL : message.author.displayAvatarURL({dynamic : true})})]});
    }
}
module.exports = Skip;