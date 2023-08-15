const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Sources extends AvonCommand{
    get name(){
        return 'sources'
    }
    get aliases(){
        return ['source']
    }
    get vote(){
        return false;
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        let em = new EmbedBuilder().setColor(client.config.color).addFields({name : `__Supported Sources__` , value : `\`Spotify\`, \`Youtube Music\`, \`Apple Music\`, \`SoundCloud\`, \`Deezer\``});
        return message.channel.send({embeds : [em]});
    }
}
module.exports = Sources;