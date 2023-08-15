const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Loop extends AvonCommand{
    get name(){
        return 'loop'
    }
    get aliases(){
        return ['repeat','lop']
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
        try{
            let mode = '';
            if(player.loop === `NONE`) mode = 'Off';
            if(player.loop === `TRACK`) mode = `Track`;
            if(player.loop === `QUEUE`) mode = 'Queue';
        if(!args[0])
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Loop mode set to ${mode} Use : ${prefix}loop <off/track/queue>` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        let op = args[0].toLowerCase();
        if(op === `off`)
        {
            player.setLoop('NONE');
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Loop Mode has been set to Off` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(op === `track`)
        {
            player.setLoop('TRACK');
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Loop mode has been set to Track` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(op === `queue`)
        {
            player.setLoop("QUEUE");
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Loop Mode has been set to Queue` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        else{
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Use ${prefix}loop <off/track/queue>` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
    } catch(e) {console.log(e)}
    }
}
module.exports = Loop;