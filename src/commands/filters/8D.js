const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Rotation extends AvonCommand{
    get name(){
        return '8d'
    }
    get aliases(){
        return []
    }
    get player(){
        return true
    }
    get vote(){
        return false;
    }
    get cat(){
        return 'filters'
    }
    get inVoice(){
        return true
    }
    get sameVoice(){
        return true
    }
    async run(client,message,args,prefix,player){
        try{
        player.filters.set8D(!player.filters._8d);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| ${player.filters._8d ? `Enabled` : `Disabled`} 8d mode of the player` , iconURL : message.author.displayAvatarURL({dynamic : true})})]});
    } catch(e) { console.log(e) }
}
}
module.exports = Rotation;