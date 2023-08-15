const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
class Play extends AvonCommand{
    get name(){
        return 'play'
    }
    get aliases(){
        return ['p','play']
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix){
        try{
            if(!args[0]){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`__**Command Usage**__ \n \`\`\`js\n${prefix}play <song name/url>\`\`\``)]})
            }
            let channel = message.member.voice.channel;
            var player = client.poru.players.get(message.guild.id);
            if(!player){
                player = await client.poru.createConnection({
                    guildId : message.guild.id,
                    textChannel : message.channel.id,
                    voiceChannel : channel.id,
                    selfDeaf : true,
                    selfMute : false
                });
            }
            player.setTextChannel(message.channel.id);
            let search = args.join(" ");
            if(search.startsWith('https://')){
                let resolve = await client.poru.resolve(search);
                        const { playlistInfo , tracks , loadType } = resolve;

                        if(loadType === `PLAYLIST_LOADED`){
                            for (let track of tracks){
                                track.info.requester = message.author;
                                player.queue.add(track);
                            }
                            if(player.queue.length > 0){
                                if(!player.isPaused && !player.isPlaying) player.play();
                                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} **Added** \`${resolve.tracks.length}\` **Songs From** *${playlistInfo.name}* \n **Requester** : ${message.author}`).setAuthor({name : `| Added Playlist To Queue` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
                            }
                        }
                        else if(loadType === `SEARCH_RESULT` || loadType === `TRACK_LOADED`)
                        {
                            let track = tracks.shift();
                            track.info.requester = message.author;
                            player.queue.add(track);
                            if(!player.isPaused && !player.isPlaying) player.play();
                            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} [${track.info.title}](${track.info.uri}) \n **Requester** : ${message.author}`).setAuthor({name : `| Added Song to Queue` , iconURL : message.author.displayAvatarURL({dynamic : true})})],components : []}) 
                        }
                        else{
                            let no = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Results found for the given query`,iconURL : message.guild.iconURL({dynamic : true})});
                            return message.channel.send({embeds : [no]});
                        }
            }
            let b1 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`def`).setEmoji(`<:YoutubeMusic:1140929320680955904>`);
            let b2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId(`spoti`).setEmoji(`<:Spotify:1140929408400625684>`);
            let b3 = new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`deezer`).setEmoji(`<:deezer:1140929484749545554>`);
            let b4 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`sc`).setEmoji(`<:Soundcloud:1140929578941022291>`);
            let ro = new ActionRowBuilder().addComponents(b1,b2,b3,b4);
            let embed = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Choose The search engine you want to use` , iconURL : message.author.displayAvatarURL({dynamic : true})});
            let msg = await message.channel.send({embeds : [embed] , components : [ro]});
            let call = await msg.createMessageComponentCollector({
                filter : (interaction) => {
                    if(interaction.user.id === message.author.id) return true;
                    else{
                        return interaction.reply({content : `${client.emoji.cross} | This is not your session`,ephemeral : true});
                    }
                }
            });
            call.on('collect',async(interaction) => {
                if(interaction.isButton())
                {
                    if(interaction.customId === `def`)
                    {
                        let resolve = await client.poru.resolve(search);
                        const { playlistInfo , tracks , loadType } = resolve;

                        if(loadType === `PLAYLIST_LOADED`){
                            for (let track of tracks){
                                track.info.requester = message.author;
                                player.queue.add(track);
                            }
                            if(player.queue.length > 0){
                                return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} **Added** \`${resolve.tracks.length}\` **Songs From** *${playlistInfo.name}* \n **Requester** : ${message.author}`).setAuthor({name : `| Added Playlist To Queue` , iconURL : message.guild.iconURL({dynamic : true})})],components : []})
                            }
                            if(!player.isPaused && !player.isPlaying) return player.play();
                        }
                        else if(loadType === `SEARCH_RESULT` || loadType === `TRACK_LOADED`)
                        {
                            let track = tracks.shift();
                            track.info.requester = message.author;
                            player.queue.add(track);
                            if(!player.isPaused && !player.isPlaying) player.play();
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} [${track.info.title}](${track.info.uri}) \n **Requester** : ${message.author}`).setAuthor({name : `| Added Song to Queue` , iconURL : message.guild.iconURL({dynamic : true})})],components : []}) 
                        }
                        else{
                            let no = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Results found for the given query`,iconURL : message.guild.iconURL({dynamic : true})});
                            return interaction.update({embeds : [no],components : []});
                        }
                
                    }
                    if(interaction.customId === `spoti`)
                    {
                        let resolve = await client.poru.spotify.fetch(search);
                        const { playlistInfo , tracks , loadType } = resolve;

                        if(loadType === `PLAYLIST_LOADED`){
                            for (let track of tracks){
                                track.info.requester = message.author;
                                player.queue.add(track);
                            }
                            if(player.queue.length > 0){
                                return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} **Added** \`${resolve.tracks.length}\` **Songs From** *${playlistInfo.name}* \n **Requester** : ${message.author}`).setAuthor({name : `| Added Playlist To Queue` , iconURL : message.guild.iconURL({dynamic : true})})],components : []})
                            }
                            if(!player.isPaused && !player.isPlaying) return player.play();
                        }
                        else if(loadType === `SEARCH_RESULT` || loadType === `TRACK_LOADED`)
                        {
                            let track = tracks.shift();
                            track.info.requester = message.author;
                            player.queue.add(track);
                            if(!player.isPaused && !player.isPlaying) player.play();
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} [${track.info.title}](${track.info.uri}) \n **Requester** : ${message.author}`).setAuthor({name : `| Added Song to Queue` , iconURL : message.guild.iconURL({dynamic : true})})],components : []}) 
                        }
                        else{
                            let no = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Results found for the given query`,iconURL : message.guild.iconURL({dynamic : true})});
                            return interaction.update({embeds : [no],components : []});
                        }
                    }
                    if(interaction.customId === `sc`)
                    {
                       try{ let resolve = await client.poru.soundcloud.fetch(search) } catch(e) { return interaction.update({components : [] ,embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Failed , try other sources please` ,iconURL : message.author.displayAvatarURL({dynamic : true})})]})}
                        const { playlistInfo , tracks , loadType } = resolve;

                        if(loadType === `PLAYLIST_LOADED`){
                            for (let track of tracks){
                                track.info.requester = message.author;
                                player.queue.add(track);
                            }
                            if(player.queue.length > 0){
                                return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} **Added** \`${resolve.tracks.length}\` **Songs From** *${playlistInfo.name}* \n **Requester** : ${message.author}`).setAuthor({name : `| Added Playlist To Queue` , iconURL : message.guild.iconURL({dynamic : true})})],components : []})
                            }
                            if(!player.isPaused && !player.isPlaying) return player.play();
                        }
                        else if(loadType === `SEARCH_RESULT` || loadType === `TRACK_LOADED`)
                        {
                            let track = tracks.shift();
                            track.info.requester = message.author;
                            player.queue.add(track);
                            if(!player.isPaused && !player.isPlaying) player.play();
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} [${track.info.title}](${track.info.uri}) \n **Requester** : ${message.author}`).setAuthor({name : `| Added Song to Queue` , iconURL : message.guild.iconURL({dynamic : true})})],components : []}) 
                        }
                        else{
                            let no = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Results found for the given query`,iconURL : message.guild.iconURL({dynamic : true})});
                            return interaction.update({embeds : [no],components : []});
                        }
                    }
                    if(interaction.customId === `deezer`)
                    {
                        let resolve = await client.poru.deezer.fetch(search);
                        const { playlistInfo , tracks , loadType } = resolve;

                        if(loadType === `PLAYLIST_LOADED`){
                            for (let track of tracks){
                                track.info.requester = message.author;
                                player.queue.add(track);
                            }
                            if(player.queue.length > 0){
                                return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} **Added** \`${resolve.tracks.length}\` **Songs From** *${playlistInfo.name}* \n **Requester** : ${message.author}`).setAuthor({name : `| Added Playlist To Queue` , iconURL : message.guild.iconURL({dynamic : true})})],components : []})
                            }
                            if(!player.isPaused && !player.isPlaying) return player.play();
                        }
                        else if(loadType === `SEARCH_RESULT` || loadType === `TRACK_LOADED`)
                        {
                            let track = tracks.shift();
                            track.info.requester = message.author;
                            player.queue.add(track);
                            if(!player.isPaused && !player.isPlaying) player.play();
                            return interaction.update({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} [${track.info.title}](${track.info.uri}) \n **Requester** : ${message.author}`).setAuthor({name : `| Added Song to Queue` , iconURL : message.guild.iconURL({dynamic : true})})],components : []}) 
                        }
                        else{
                            let no = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Results found for the given query`,iconURL : message.guild.iconURL({dynamic : true})});
                            return interaction.update({embeds : [no],components : []});
                        }
                    }
                }
            });
            call.on('end',async() => {
                if(!msg) return;
                msg.delete().catch(e => null);
            })
        } catch(e) { message.channel.send({content : `${client.emoji.cross} | Found some error please try other source`});console.error(e) }
    }
}
module.exports = Play;