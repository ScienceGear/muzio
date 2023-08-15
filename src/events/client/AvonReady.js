const { ActivityType } = require("discord.js");
const AvonClientEvent = require("../../structures/Eventhandler");
class AvonReady extends AvonClientEvent{
    get name(){
        return 'ready';
    }
    async run(){
        console.log(`${this.client.user.username} is Online!`);
        this.client.poru.init(this.client);
        let statuses = [`${this.client.config.prefix}help`,`${this.client.config.prefix}play`,`Music`]
        setInterval(() => {
            let status = statuses[Math.floor(Math.random()*statuses.length)];		
              this.client.user.setPresence({
                  activities: [
                      {
                          name: status,
                          type: ActivityType.Listening
                      }
                  ],
                  status: "online"
              });
          }, 1000);

        const guilds = this.client.guilds.cache.map(x => x.id);
        guilds.forEach(async g => {
            let guild = await this.client.guilds.fetch(g);
            if(!guild) return;

            let db = await this.client.data.get(`${guild.id}-247`);
            if(!db || db === null)
            {
                this.client.data.set(`${guild.id}-247`,`disabled`)
            }
            else if(db === `disabled`)
            {
                this.client.data.delete(`${guild.id}-voice`);
                this.client.data.delete(`${guild.id}-text`);
            }
            else if(db === `enabled`)
            {
                let voiceChannel = guild.channels.cache.get(await this.client.data.get(`${guild.id}-voice`));
                if(!voiceChannel){
                    this.client.data.delete(`${guild.id}-voice`);
                    this.client.data.delete(`${guild.id}-text`);
                    this.client.data.set(`${guild.id}-247`,`disabled`);
                }

               try{ this.client.poru.createConnection({
                    guildId : guild.id,
                    textChannel : await this.client.data.get(`${guild.id}-text`),
                    voiceChannel : await this.client.data.get(`${guild.id}-voice`),
                    selfMute : false,
                    selfDeaf : true
                });
            } catch(e) { this.client.data.delete(`${guild.id}-text`); this.client.data.delete(`${guild.id}-voice`); this.client.data.set(`${guild.id}-247`,`disabled`) }
            }
        })
    }
}
module.exports = AvonReady;