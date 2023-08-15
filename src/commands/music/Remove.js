const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class Remove extends AvonCommand{
    get name(){
        return 'remove'
    }
    get aliases(){
        return []
    }
    get player(){
        return false;
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
    async run(client,message,args,prefix){
        let player = client.poru.players.get(message.guild.id);
        if(!player){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No player is initiated` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(!args[0] || isNaN(args[0]))
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Provide me a number to remove from queue` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(args[0] === 1)
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| You cannot remove current song from queue`, iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        else{
            player.queue.remove(args[0] -1);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Removed The Track` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
    }
}
module.exports = Remove;