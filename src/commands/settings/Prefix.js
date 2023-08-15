const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Prefix extends AvonCommand{
    get name(){
        return 'setprefix'
    }
    get cat(){
        return 'set'
    }
    get vote(){
        return false;
    }
    get aliases(){
        return ['prefix','set-prefix']
    }
    async run(client,message,args,prefix){
        if(!args[0]){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| My Current prefix is ${prefix}` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild) && !client.config.owners.includes(message.author.id)){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| You are lacking permissions : Manage Guild` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(args[0].length > 3)
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Can't set a prefix having more than 3 args` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(args[1])
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| You can't take space between args` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        if(args[0] === client.config.prefix){
            client.data.delete(`${message.guild.id}-prefix`);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Just restted the guild prefix` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        client.data.set(`${message.guild.id}-prefix`,args[0]);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Guild's Prefix has been set to ${args[0]}` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
    }
}
module.exports = Prefix;