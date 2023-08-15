const { EmbedBuilder } = require("discord.js");
const  delay  = require(`delay`);
const AvonClientEvent = require("../../structures/Eventhandler");

class AvonVoiceStateUpdate extends AvonClientEvent{
    get name(){
        return 'voiceStateUpdate';
    }
    async run(os,ns){
        let player = this.client.poru.players.get(ns.guild.id);
        if(!player) return;
        if(os.id === this.client.user.id) return;
        if(!ns.guild.members.cache.get(this.client.user.id).voice.channelId || !os.guild.members.cache.get(this.client.user.id).voice.channelId) return;
        if(!ns.guild.members.me.voice.channel){
            player.destroy();
        }
        if(ns.id === this.client.user.id && ns.serverMute) ns.setMute(false);

        let db = await this.client.data.get(`${ns.guild.id}-247`);
        if(!db || db === null) this.client.data.set(`${ns.guild.id}-247`,`disabled`);
        if(db === `enabled`) return;
        else{
            if(os.guild.members.me.voice.channelId === os.channelId)
            {
                if(os.guild.members.me.voice.channel){
                    await delay(180000);

                    if(os.guild.members.me.voice.channel.members.size === 1){
                        player.destroy();
                        let channel = this.client.channels.cache.get(player.textChannel);
                        if(channel){
                            channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | Enable 247 mode in order to make me stay in vc`)]})
                        }
                    }
                }
            }
        }
    }
}
module.exports = AvonVoiceStateUpdate;