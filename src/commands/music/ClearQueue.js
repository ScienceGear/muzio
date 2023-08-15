const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class ClearQueue extends AvonCommand{
    get name(){
        return 'clearqueue'
    }
    get aliases(){
        return ['clear','cq']
    }
    get player(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix,player){
        let { length } = player.queue;
        player.queue.clear();
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| SuccessFully Cleared ${length} Songs from Queue` , iconURL : message.author.displayAvatarURL({dynamic : true})})]});
    }
}
module.exports = ClearQueue;