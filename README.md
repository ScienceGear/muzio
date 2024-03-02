# Muzio - Your Discord Music Bot

<p align="center">
  <img src="https://i.ibb.co/zmMnfQn/Muzio-Main.png" width="400" alt="Muzio Bot">
</p>


Muzio is a sleek and powerful Discord music bot designed to bring music to your server with ease. With a range of features and a user-friendly interface, Muzio is your go-to bot for all your musical needs on Discord.

## Features

- **Music Playback**: Play your favorite tracks from YouTube, Spotify, and more.
- **Playlists**: Coming Soon.
- **Control Commands**: Easily control playback, volume, and more with simple commands.
- **Lyrics**: Fetch lyrics for the currently playing song.
- **Customizable Prefix**: Set a prefix that suits your server's style.
- **Easy Setup**: Get Muzio up and running in just a few steps.


# YouTube Tutorial

[![Thumbnail](https://i.ibb.co/SysTypY/Thumnial.jpg)](https://www.youtube.com/watch?v=SOON)

Click on the image above to watch the tutorial on YouTube.


### Hosting Your Own Instance

To host your own instance of Muzio, follow these steps:

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/ScienceGear/muzio.git
   ```

2. **Install Dependencies**: 
   ```bash
   cd muzio
   npm install
   ```

3. **Set Up Configuration**:
   - Add Your Token and other variables in `src\settings\config.js` or in `.env` (Secrets For Replit Users) file.
   - `.env` should look like this (only for who is using .env)
```plaintext
TOKEN=your_token_here
PREFIX=your_prefix_here
EMBED_COLOR=#c50632
OWNER_ID=your_owner_id_here
GUILD_LOGS=your_guild_logs_channel_id_here
LEAVE_TIMEOUT=20000
DISABLE_YOUTUBE=false
PLAY_SOURCE=ytsearch
DEFAULT_SOURCE=ytsearch
SPOTIFY_ID=your_spotify_client_id_here
SPOTIFY_SECRET=your_spotify_client_secret_here
NODE_NAME1=Node 1
NODE_HOST1=lavalink.mlserv.xyz
NODE_PORT1=32669
NODE_PASSWORD1=dsc.gg/sciencegear
NODE_SECURE1=false
NODE_REGIONS1=singapore
NODE_NAME2=Node 2
NODE_HOST2=lava.link
NODE_PORT2=80
NODE_PASSWORD2=kronix
NODE_SECURE2=false
NODE_REGIONS2=singapore
MONGO_URI=your_mongodb_uri_here
SUPPORT_URL=https://discord.gg/TjtXnYD9SP
VOTE_URL=https://www.gearhost.my.id/
INVITE_URL=https://dsc.gg/muzio
IMAGE_URL=https://i.imgur.com/HB32QqX.png
```
   - Open `config.js` and fill in your Discord bot token and other necessary details.

4. **Start the Bot**:
   ```bash
   node src/sharder.js
   ```

5. **Invite Your Bot to Your Server**: 
   - Generate an invite link for your bot with the necessary permissions.
   - Paste the invite link into your browser and select the server you want to add the bot to.

6. **Set Up Prefix**:
   - Once the bot is in your server, you can use bot by `@pinging` the bot or `/help`.

7. **Enjoy Your Music**:
   - Start playing music by using the `/play <song_name>` command.

## Change Emojis

For Chaingin emojis go to `src/settings/emojis.js` and chnage emojis 
```plaintext
module.exports = {
    button: {
        pause: "⏸️",
        resume: "▶️",
        stop: "◻️",
        skip: "⏭️",
        previous: "⏮️",
        replay: "🔄",
        voldown: "<:volume_down:1209067410968027148>",
        volup: "<:Volume_up:1209067299194146858>",
        shuffle: "🔀",
        info: "<:icons_info:1123546062263681054>",
        loop: {
            none: "🔁",
            track: "🔂",
            queue: "<:muzio_queue:1124936366116065341>",
        },
    },

    queue: {
        back: "<:back7:1209067515204993077>",
        next: "<:music_next:1209067702379872286>",
        cancel: "◻️",
    },

    custom_emoji: {
        tick: "<:muzio_tick:1124936298545807493>",
        premium: "<:premium:1209019542446018592>",
        cross: "<:muzio_cross:1124936294557032590>",
        owner: "<:muzio_owner:1124936290379497563>",
        arrow: "<:muzio_arrow:1124936288001327286>",
        admin: "<:muzio_admin:1124936283991593050>",
        ping: "<:muzio_ping:1124936279591755836>",
        uptime: "<:muzio_uptime:1124936385720234095>",
        time: "<:muzio_time:1124936381282656286>",
        author: "<:muzio_author:1124936375867801630>",
        users: "<:muzio_users:1124936371405082624>",
        queue: "<:muzio_queue:1124936366116065341>",
        dev: "<:muzio_dev:1124936361892384898>",
        codev: "<:muzio_codev:1124936357396107324>",
        staff: "<:muzio_staff:1124936353092751381>",
        mod: "<:muzio_mod:1124936343852683315>",
        friend: "<:muzio_friend:1124936338685296700>",
        vip: "<:muzio_vip:1124936333777965066>",
        home: "<:muzio_home:1124936328925171712>",
        bug: "<:muzio_bug:1124936322499498068>",
        voter: "<:muzio_voter:1124936315729870848>",
        avon: "<:muzio_muzio:1124936311573323837>",
        supporter: "<:muzio_supporter:1124936307219628112>",
        music: "<:icons_headphone:1123546129129275514>",
        filters: "<:icons_audioenable:1123545966335762462>",
        playlist: "<:icons_linked:1123546272842907779>",
        moderation: "<:icons_stagemoderator:1123546376677117992>",
        info: "<:icons_info:1123546062263681054>",
        settings: "<:icons_settings:1123546294036742205>",
        djs: "<:djs:1135172314061885501>",
        node: "<:node_js:1135172213931262012>",
        allCommands: "<:muzio_cmds:1124936303256027216>"
    }
};
```

Downlod emojis form here [Emojis.zip](https://cdn.discordapp.com/attachments/1213118298892279838/1213118329565224970/Muzio_Emojis.zip?ex=65f44f7c&is=65e1da7c&hm=7a3285c722788e41a5f512a05ef49886725d9e78f34a27391439ff97db802631&)

## Screenshots

![Muzio Commands](https://i.ibb.co/MNHW12X/Muzio.png)
![Muzio Playing Cmds](https://i.ibb.co/VmQnJdG/image.png)

## Support

If you encounter any issues or have any questions about Muzio, feel free to join our support server: [Support Server Invite](https://dsc.gg/sciencegear).

## Contributing

If you'd like to contribute to Muzio, feel free to fork this repository and submit a pull request with your changes. We welcome contributions from the community!

## License

Muzio is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
