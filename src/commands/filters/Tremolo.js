const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class Tremolo extends AvonCommand{
    get name(){
        return 'tremolo'
    }
    get aliases(){
        return null;
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get cat(){
        return 'filters'
    }
    get vote(){
        return false;
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        if(!player.filters.tremolo){player.filters.setTremolo({
            "frequency" : 4.0,
            "depth" : 0.75
        });}
        else{
            player.filters.clearFilters();
        }
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| ${player.filters.tremolo ? `Enabled` : `Disabled`} Tremolo mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
    }
}
module.exports = Tremolo;