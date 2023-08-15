const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const AvonClientEvent = require("../../structures/Eventhandler");

class PlayerDestroy extends AvonClientEvent{
    get name(){
        return 'playerDestroy'
    }
    async run(player){
        try{ player.message.delete() } catch(e) { }
        let guild = this.client.guilds.cache.get(player.guildId);
        if(!guild) return;
        let db = await this.client.data.get(`${guild.id}-247`);
        if(!db) return;
        if(db === `disabled`)
        {
            return;
        }
        if(db === `enabled`)
        {
            let channel = guild.channels.cache.get(await this.client.data.get(`${guild.id}-voice`))
            if(!channel){
                this.client.data.delete(`${guild.id}-text`);
                this.client.data.delete(`${guild.id}-voice`);
                return
            }
            if(guild.members.me.permissions.has([PermissionsBitField.Flags.Connect,PermissionsBitField.Flags.Speak]))
            {
                try{
                    let text = guild.channels.cache.get(await this.client.data.get(`${guild.id}-text`));
                this.client.poru.createConnection({
                    guildId : guild.id,
                    textChannel : text.id,
                    voiceChannel : channel.id,
                    selfMute : false,
                    selfDeaf : true
                });
                return text.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| 247 player recreated`,iconURL : this.client.user.displayAvatarURL()})]})
            } catch(e) { this.client.data.set(`${guild.id}-247`,`disabled`); this.client.data.delete(`${guild.id}-text`); this.client.data.delete(`${guild.id}-voice`); return}
            }
            else{
                this.client.data.delete(`${guild.id}-text`);
                this.client.data.delete(`${guild.id}-voice`);
            }
        }
    }
}
module.exports = PlayerDestroy;