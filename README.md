# Splatoon 2 Rich Presence

Splatoon 2 Rich Presence is... well, it's self explanatory. It's a simple ElectronJS application to update your status to fellow friends or server members when you're playing Splatoon 2. It has selectors for your current game mode, and if you want to allow other server members to join your lobby.

## Installation

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org) (which comes with [npm](https://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/bbialke/Splatoon2RichPresence.git
# Go into the repository
cd Splatoon2RichPresence
# Install dependencies
npm install
# Run the app
npm start
```
## Usage

As soon as the program starts, you'll be able to see your status on Discord updated to "Getting Ready". You can select any game mode to update your status to reflect your choice. In the "other options" section, you can choose if you'd like to allow server members to join you in-game.

Please keep in mind that the Discord API has a rate-limit in place of 5 updates per 20 seconds, or 1 update per 4 seconds. The program has a built-in timer that will prevent you from triggering this ratelimit, you are required to wait 5 seconds in between each update of your presence. If you don't see your status update on click, try again in a few seconds.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
