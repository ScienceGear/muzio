const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class BassBoost extends AvonCommand{
    get name(){
        return 'bassboost'
    }
    get aliases(){
        return ['bass'];
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get vote(){
        return false;
    }
    get cat(){
        return 'filters'
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        player.filters.setBassboost(!player.filters.bassboost);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| ${player.filters.bassboost ? `Enabled` : `Disabled`} Bassboost mode of the player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
    }
}
module.exports = BassBoost;