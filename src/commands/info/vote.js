const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Vote extends AvonCommand{
    get name(){
        return 'vote'
    }
    get aliases(){
        return ['vot']
    }
    get vote(){
        return true;
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        let em = new EmbedBuilder().setColor(client.config.color).setDescription(`{}
        ${client.emoji.voter} | Click [here](${client.config.vote}) to [vote](${client.config.vote}) me.`);
        let row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`${client.config.vote}`).setLabel(`Vote`),
        );
        return message.channel.send({embeds : [em] , components : [row]});
    }
}
module.exports = Vote;