# Muzio - Discord Music Bot

Muzio is a versatile and user-friendly Discord music bot that allows you to play songs from various sources and customize your audio experience with built-in filters.

## Screenshots

## Screenshots

![Screenshot 1](https://cdn.discordapp.com/attachments/1131235535273328650/1140952237997297704/image.png)
![Screenshot 2](https://cdn.discordapp.com/attachments/1131235535273328650/1140952238219612211/image.png)
![Screenshot 3](https://cdn.discordapp.com/attachments/1131235535273328650/1140952238492221440/image.png)


## Features

- Play songs from YouTube, Spotify, and SoundCloud.
- Customize audio with built-in filters.
- Easy-to-use commands for control and management.
- Support for playlist management and queuing.

## Getting Started

1. **Fork This Code**
    [![Muzio DIscord Bot](https://replit.com/badge)](https://replit.com/github/ScienceGear/muzio)

2. **Configuration**
   - edit `config.json` file in the root directory with your bot token and other settings:

   ```json
   {
    "repl_user": false,
    "token" : "",
    "prefix" : "$",
    "color" : "#c50632",
    "owners" : ["900708551805268019"],
    "mongourl" : "",

    "errors" : "",
    "spotifyId" : "",
    "mongourl2" : "",
    "spotifySecret" : "",
    "topggapi" : "",
    "server" : "https://dsc.gg/sciencegear",
    "vote" : "https://dsc.gg/sciencegear",
    "invite" : "https://discord.com/api/oauth2/authorize?client_id=1122883732303511583&permissions=8&scope=applications.commands%20bot",
    "nodes" : [{
       "name" : "LavaLink",
        "host" : "192.168.1.250",
        "port" : 25568,
        "password" : "gearjindabad",
        "secure" : false
    }]
}
   

3. **Installation**
   - Clone this repository:

   ```sh
   git clone https://github.com/ScienceGear/muzio.git
   ```

   - Install the required packages:

   ```sh
   npm install
   ```

4. **Usage**
   - Start the bot:

   ```sh
   node src/index.js
   ```

5. **Commands**
   - `!play <song_name>`: Play a song from YouTube.
   - `!skip`: Skip the current song.
   - `!pause` and `!resume`: Pause and resume playback.
   - `!voice <value>`, `!sound <value>`, `!bass <value>`: Apply audio filters.
   - `!playlist <playlist_link>`: Play songs from supported platforms.
   - `!queue <song_name>`: Add a song to the queue.

## Support

For assistance or questions, join our [support server](https://dsc.gg/sciencegear).

## Contributors

Muzio is developed and maintained by Science Gear

## Disclaimer

Please use Muzio in compliance with Discord's [Terms of Service](https://discord.com/terms) and [Developer Terms of Service](https://discord.com/developers/docs/legal).
