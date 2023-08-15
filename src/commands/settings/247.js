const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand")

class twentyfourseven extends AvonCommand{
    get name(){
        return '247';
    }
    get aliases(){
        return ['24-7','twentyfourseven','alwaysvc','24/7']
    }
    get vote(){
        return false;
    }
    get cat(){
        return 'set'
    }
    get player(){
        return true;
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix){
        if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild) && !client.config.owners.includes(message.author.id)){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| You are lacking permissions : Manage Guild` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        let data = await client.data.get(`${message.guild.id}-247`);
        if(!data) await client.data.set(`${message.guild.id}-247`,`disabled`);
        if(data === `disabled`){
            client.data.set(`${message.guild.id}-247`,`enabled`);
            client.data.set(`${message.guild.id}-text`,`${message.channel.id}`);
            client.data.set(`${message.guild.id}-voice`,`${message.member.voice.channelId}`);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled 247 Mode of ${client.user.username}` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        else if(data === `enabled`){
            client.data.set(`${message.guild.id}-247`,`disabled`);
            client.data.delete(`${message.guild.id}-text`);
            client.data.delete(`${message.guild.id}-voice`);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled 247 Mode of ${client.user.username}` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        else{
            client.data.set(`${message.guild.id}-247`,`disabled`);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Please try again running that command` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
    }
}
module.exports = twentyfourseven;