const { EmbedBuilder, ActionRowBuilder , ButtonBuilder , ButtonStyle } = require("discord.js");
const AvonClientEvents = require(`../../structures/Eventhandler`);

class AvonInteractions extends AvonClientEvents{
    get name(){
        return 'interactionCreate';
    }
    async run(interaction){
    
        if(interaction.isButton())
        {
            try{
            let player = this.client.poru.players.get(interaction.guild.id);
            let botch = interaction.guild.members.me.voice.channel;
            let ch = interaction.member.voice.channel;
            if(interaction.customId === `pl1`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    player.destroy();
                    return;
                }
            }
            if(interaction.customId === `pl2`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    let but1 = new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel(`Stop`).setCustomId(`pl1`);
                    let but2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel(!player.isPaused ? `Resume` : `Pause`).setCustomId(`pl2`);
                    let but3 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(`Loop`).setCustomId(`pl3`);
                    let but4 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Previous`).setCustomId(`pl4`);
                    let but5 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Skip`).setCustomId(`pl5`);
                    let but6 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Vol-`).setCustomId(`pl6`);
                    let but7 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Shuffle`).setCustomId(`pl7`);
                    let but8 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(this.client.emoji.avon).setCustomId(`pl8`).setDisabled(true);
                    let but9 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Repeat`).setCustomId(`pl9`);
                    let but10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Vol+`).setCustomId(`pl10`);
                    let ro = new ActionRowBuilder().addComponents(but1,but2,but3,but4,but5);
                    let ro2 = new ActionRowBuilder().addComponents(but6,but7,but8,but9,but10);
                    player.pause(!player.isPaused);
                    return interaction.update({components : [ro,ro2]});
                }
            }
            if(interaction.customId === `pl3`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    if(player.loop === `QUEUE`)
                    {
                        player.setLoop(`NONE`);
                        return interaction.reply({embeds : [new EmbedBuilder().setDescription(`${this.client.emoji.cross} | **Disabled** Looping`)],ephemeral : true});
                    }
                    else{
                        player.setLoop(`QUEUE`);
                        return interaction.reply({embeds : [new EmbedBuilder().setDescription(`${this.client.emoji.tick} | **Enabled** Looping`)],ephemeral : true});
                    }
                }
            }
            if(interaction.customId === `pl4`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    if(!player.previousTrack)
                    {
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | No Previous song available.`)],ephemeral : true})
                    }
                    else{
                        player.queue.unshift(player.previousTrack);
                        player.stop();
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | Playing previous track`)],ephemeral : true})
                    }
                }
            }
            if(interaction.customId === `pl5`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    player.stop();
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **Skipped** the track`)],ephemeral : true})
                }
            }
            if(interaction.customId === `pl6`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    let vol = player.volume - 20;
                    if(player.volume === 0){
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | Can't lower volume anymore.`)],ephemeral : true})
                    }
                    else{
                        player.setVolume(vol);
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | Players volume set to - \`${vol}%\``)],ephemeral : true})
                    }
                }
            }
            if(interaction.customId === `pl10`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    let vol = player.volume + 20;
                    if(player.volume === 1000){
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | Can't increase volume anymore.`)],ephemeral : true})
                    }
                    else{
                        player.setVolume(vol);
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | Players volume set to - \`${vol}%\``)],ephemeral : true})
                    }
                }
            }
            if(interaction.customId === `pl7`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    player.queue.shuffle();
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | Players queue has been shauffled`)],ephemeral : true})
                }
            }
            if(interaction.customId === `pl8`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    let db = await this.client.data.get(`favs_${interaction.user.id}`);
                    if(!db || db === null){ await this.client.data.get(`favs_${interaction.user.id}`,[]) }
                    let favs = [];
                    db.forEach(x => favs.push(x));
                    favs.push(player.currentTrack);
                    this.client.data.set(`favs_${interaction.user.id}`,favs);
                    let but1 = new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel(`Stop`).setCustomId(`pl1`);
                    let but2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel(!player.isPaused ? `Resume` : `Pause`).setCustomId(`pl2`);
                    let but3 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(`Loop`).setCustomId(`pl3`);
                    let but4 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Previous`).setCustomId(`pl4`);
                    let but5 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Skip`).setCustomId(`pl5`);
                    let but6 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Vol-`).setCustomId(`pl6`);
                    let but7 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Shuffle`).setCustomId(`pl7`);
                    let but8 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(this.client.emoji.avon).setCustomId(`pl8`).setDisabled(true);
                    let but9 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Repeat`).setCustomId(`pl9`);
                    let but10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(`Vol+`).setCustomId(`pl10`);
                    if(favs.includes(player.currentTrack)) { but8.setEmoji(`${this.client.emoji.filledHeart}`) }
                    else { but8.setEmoji(`${this.client.emoji.emptyHeart}`) }
                    let ro = new ActionRowBuilder().addComponents(but1,but2,but3,but4,but5);
                    let ro2 = new ActionRowBuilder().addComponents(but5,but6,but7,but8,but9,but10);
                    return interaction.update({components : [ro,ro2]});
                }
            }
            if(interaction.customId === `pl9`)
            {
                if(interaction.message.id !== player.message.id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    player.seekTo(0);
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | Restarted the currently playing track.`)],ephemeral : true})
                }
            }
        }
        catch(e) { console.log(e) }
    }
    }
}
module.exports = AvonInteractions;