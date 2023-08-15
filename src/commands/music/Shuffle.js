const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Shuffle extends AvonCommand{
    get name(){
        return 'shuffle';
    }
    get aliases(){
        return ['shuff'];
    }
    get player(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix,player){
        if(!player.queue.length){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Queue available to shuffle` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        else{
            player.queue.shuffle();
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Shuffled the queue of the player` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
    }
}
module.exports = Shuffle;