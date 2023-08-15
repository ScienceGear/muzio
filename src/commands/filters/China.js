const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class China extends AvonCommand{
    get name(){
        return 'china'
    }
    get aliases(){
        return null;
    }
    get vote(){
        return false;
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
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        if(player.filters.timescale)
        {
            player.filters.setTimescale(false);
        }
        else{
            player.filters.setTimescale({
                "speed": 0.75,
          "pitch": 1.25,
          "rate": 1.15
            });
        }
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| ${player.filters.timescale ? `Enabled` : `Disabled`} China mode of the player` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
    }
}
module.exports = China;