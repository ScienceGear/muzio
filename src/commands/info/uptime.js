const AvonCommand = require("../../structures/avonCommand");
const moment = require(`moment`);
require(`moment-duration-format`);
class Uptime extends AvonCommand{
    get name(){
        return 'uptime';
    }
    get aliases(){
        return ['upt']
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        let uptime = moment.duration(message.client.uptime).format(`D[days], H[hrs], m[mins], s[secs]`);
        return message.channel.send({content : `${client.emoji.uptime} | My Uptime \`${uptime}\``});
    }
}
module.exports = Uptime;