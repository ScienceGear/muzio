const { Collection , ButtonBuilder , ActionRowBuilder , ButtonStyle , EmbedBuilder, PermissionsBitField } = require('discord.js');
const EventEmitter = require('events');
const { readdirSync } = require('fs');
const ascii = require(`ascii-table`);
const config = require(`../../config.json`);
const table = new ascii().setHeading('Avon Commands','Status');
const top = require(`@top-gg/sdk`);
const vote = new top.Api(config.topggapi);
class AvonCommands extends EventEmitter {
    constructor(client){
        super();
        this.client = client;
        this.commands = new Collection();
        this.load = false;
        this.on("error",async(err) => {console.error(err)});
        this.client.on('messageCreate',(message) => this.run(message));
    }
    loadCommands(){
        if(this.load) return this;
        readdirSync(`./src/commands/`).forEach(d => {
            const commands = readdirSync(`./src/commands/${d}/`).filter(f => f.endsWith('.js'));
            for(const cmd of commands){
                const AvonCommand = require(`${process.cwd()}/src/commands/${d}/${cmd}`);
                const command = new AvonCommand(this.client);
                this.commands.set(command.name,command);
                table.addRow(command.name,'✅');
            }
        });
        console.log(table.toString());
        this.load = true;
        return this;
    }

    async run(message){
        if(!message.guild || message.author.bot || message.attachments.size || message.stickers.size) return;
        let prefix;
        let data = await this.client.data.get(`${message.guild.id}-prefix`);
        if(data) prefix = data; else prefix = this.client.config.prefix;

        if(message.content === `<@${this.client.user.id}>`)
        {
            let b1 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Invite`).setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=415602886720&scope=bot%20applications.commands`);
            let b2 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Support`).setURL(this.client.config.server);
            let b3 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://dsc.gg/sciencegear`);
            let ro = new ActionRowBuilder().addComponents(b1,b2,b3);
            let embed = new EmbedBuilder().setColor(this.client.config.color).setFooter({text : `Made By ScienceGear ❤️` , iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(
                `__**Settings For ${message.guild.name}**__
                Server Id : \`${message.guild.id}\`
                Voice Channel : ${message.guild.members.me.voice.channel ? message.guild.members.me.voice.channel : "`Null`"}
                Voice Channel Id : ${message.guild.members.me.voice.channel ? `\`${message.guild.members.me.voice.channelId}\`` : "`Null`"}
                My prefix here : \`${prefix}\`
                
                Try me with this command - \`${prefix}help\` or \`${prefix}play\``
            ).addFields({name : `__Links__` , value : `[Support](${this.client.config.server}) | [Invite](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=415602886720&scope=bot%20applications.commands)`}).setAuthor({name : `Hey I am ${this.client.user.username}` , iconURL : this.client.user.displayAvatarURL({dynamic : true})}).setThumbnail(message.author.displayAvatarURL({dynamic : true}))
            return message.channel.send({embeds : [embed],components : [ro]}).catch((e) => { message.author.send({content : `Error while sending message there : ${e.message}`}).catch(() => {}) })
        }
        
        try{
        let np = ['1124919167917752390','1124920284638613626'];
        let regex = RegExp(`^<@!?${this.client.user.id}>`);
        let pre = message.content.match(regex) ? message.content.match(regex)[0] : prefix;
        let db = await this.client.data2.get(`noprefix_${message.guild.id}`);
        let db2 = await this.client.data2.get(`noprefix_${this.client.user.id}`);
        if(!db2 || db2 === null) await this.client.data2.set(`noprefix_${this.client.user.id}`,[]);
        let pun = [];
        db2.forEach(x => pun.push(x));
        pun.forEach(punit => np.push(punit));
        if(!db || db === null) await this.client.data2.set(`noprefix_${message.guild.id}`,[]);
        let ooo = []
        db.forEach(x => ooo.push(x));
        ooo.forEach(x => np.push(x));
        if(!np.includes(message.author.id)){ if(!message.content.startsWith(pre)) return;}
        const args = np.includes(message.author.id) == false ? message.content.slice(pre.length).trim().split(/ +/) :  message.content.startsWith(pre) == true ? message.content.slice(pre.length).trim().split(/ +/) : message.content.trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const avonCommand = this.commands.get(commandName) || this.commands.find((c) => c.aliases && c.aliases.includes(commandName));
        if(!avonCommand) return;
        
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.ViewChannel)) return;
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) return message.author.send({content : `I dont have **Send Messages** Permissions in that channel`}).catch(e => null);
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.ReadMessageHistory)) return message.channel.send({content : `I don't have **Read Message History Permissions** here`});
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.UseExternalEmojis)) return message.channel.send({content : `I don't have **Use External Emojis** Permissions here`})
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.EmbedLinks)) return message.channel.send({content : `I don't have **Embed Links** Permissions here`})
        let client = this.client;
        if(avonCommand.inVoice){
            if(message.guild.members.me.voice.channel && !message.member.voice.channel){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You must be connected to a voice channel.`)]})
            }
        }
        if(avonCommand.sameVoice){
            if(message.guild.members.me.voice.channelId !== message.member.voice.channelId && message.guild.members.me.voice.channel){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You must be connected to ${message.guild.members.me.voice.channel}`)]})
            }
        }
        if(avonCommand.vote)
        {
            let voted = await vote.hasVoted(message.author.id);
            if(!voted && !this.client.config.owners.includes(message.author.id)){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(config.color).setDescription(`${this.client.emoji.tick} | [Vote](https://dsc.gg/sciencegear) Required Click [here](https://dsc.gg/sciencegear)`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://dsc.gg/sciencegear`))]})
            }
        }
        let player = client.poru.players.get(message.guild.id);
        if(avonCommand.player){
            if(!player || !player.currentTrack){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| I am not playing Anything` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            }
        }
        
        avonCommand.run(client,message,args,prefix,player).catch(() => { });
        } catch(e) { console.error(e) } 
    }
}
module.exports = AvonCommands;