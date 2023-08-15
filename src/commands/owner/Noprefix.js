const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Noprefix extends AvonCommand{
    get name(){
        return 'noprefix';
    }
    get aliases(){
        return ['np','nop'];
    }
    async run(client,message,args,prefix){
        try{
        let ok = ['799689495816962098','965494079989375016'];
        if(!ok.includes(message.author.id)) return;

        
        if(!args[0])
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Usage : \`${prefix}noprefix <add/remove/show> <user/user_id> <server/all>\``)]})
        }

        let op = args[0].toLowerCase();
        
        if(op === `add`)
        {
            let us = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            if(!us){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid user`)]})
            }
            let pk = args[2]
            if(pk === `all`)
            {
                let db = await client.data2.get(`noprefix_${client.user.id}`);
                if(!db || db === null) client.data.set(`noprefix_${client.user.id}`,[])
                let um = [];
                db.forEach(x => um.push(x));
                if(um.includes(us.id))
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | This user is already in my all server's no prefix`)]})
                }
                else{
                    um.push(us.id);
                    await client.data2.set(`noprefix_${client.user.id}`,um);
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Added ${us} to my all server's no prefix`)]})
                }
            }
            else{
                
                let guild = await client.guilds.fetch(args[2])
                if(!guild){
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid server`)]})
                }
                let db2 = await client.data2.get(`noprefix_${guild.id}`);
                if(!db2 || db2 === null) client.data2.set(`noprefix_${guild.id}`,[])
                let oo =[];
                db2.forEach(x => oo.push(x));
                if(oo.includes(message.author.id))
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | This user is already in ${guild.name}'s no prefix`)]})
                }
                else{
                    oo.push(us.id);
                    await client.data2.set(`noprefix_${guild.id}`,oo);
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Added ${us} to ${guild.name}'s no prefix`)]})
                }
            }
        }
        if(op === `remove`)
        {
            let us = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            if(!us){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid user`)]})
            }
            let pk = args[2]
            if(pk === `all`)
            {
                let db = await client.data2.get(`noprefix_${client.user.id}`);
                if(!db || db === null) client.data.set(`noprefix_${client.user.id}`,[])
                let um = [];
                db.forEach(x => um.push(x));
                if(!um.includes(us.id))
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | This user is not present in my all server's no prefix`)]})
                }
                else{
                    let bhai = um.filter(x => x !== us.id);
                    await client.data2.set(`noprefix_${client.user.id}`,bhai);
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Removed ${us} from my all server's no prefix`)]})
                }
            }
            else{
                let guild = await client.guilds.fetch(args[2]);
                if(!guild){
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid server`)]})
                }
                let db2 = await client.data2.get(`noprefix_${guild.id}`);
                if(!db2 || db2 === null) client.data2.set(`noprefix_${guild.id}`,[])
                let oo =[];
                db2.forEach(x => oo.push(x));
                if(!oo.includes(message.author.id))
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | This user is not present in ${guild.name}'s no prefix`)]})
                }
                else{
                    let sh = oo.filter(x => x !== us.id);
                    await client.data2.set(`noprefix_${guild.id}`,sh);
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Removed ${us} from ${guild.name}'s no prefix`)]})
                }
            }
        }
        if(op === `show` || op === `list`)
        {
            let pk = args[1]
            if(pk === `all`)
            {
                let db = await client.data2.get(`noprefix_${client.user.id}`);
                if(!db || db === null)
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | No Users.`)]})
                }
                let lol = [];
                let index = 1;
                db.forEach(x => lol.push(`\`${index++}\` <@${x}>  |  ${x}`));

                let embed = new EmbedBuilder().setColor(client.config.color).setDescription(lol.sort().join('\n')).setAuthor({name : `| All Server's No prefix List`,iconURL : message.author.displayAvatarURL({dynamic:true})});
                return message.channel.send({embeds : [embed]});
            }
            else{
                let guild = await client.guilds.fetch(args[1])
                if(!guild)
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid server`)]})
                }
                let db = await client.data.get(`noprefix_${guild.id}`);
                if(!db || db === null)
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | No Users`)]})
                }
                let lu = [];
                let index = 1;
                db.forEach(x => lu.push(`\`${index++}\` <@${x}>  |  ${x}`));

                let eme = new EmbedBuilder().setColor(client.config.color).setDescription(lu.sort().join('\n')).setAuthor({name : `| ${guild.name}'s No prefix List`,iconURL : guild.iconURL({dynamic : true})});
                return message.channel.send({embeds : [eme]});
            }
        }
     } catch(e) { console.log(e) }
}
}
module.exports = Noprefix;