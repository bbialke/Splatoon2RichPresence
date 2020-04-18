const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

//Update ENV for Production
//process.env.NODE_ENV = 'production'

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Client ID for connection
const clientId = '700151046034423878';

// only needed for discord allowing spectate, join, ask to join
// DiscordRPC.register(clientId);

const client = require('discord-rich-presence')(clientId);
const startTimestamp = new Date();

async function setActivity() {
  if (!client || !mainWindow) {
    return;
  }
//Initial "demo" status shown on app load, confirms to the user that the presence can be updated
  client.updatePresence({
    state: 'Getting Ready',
    largeImageKey: 'mainlogo',
    endTimestamp: Date.now() + 180000,
    instance: true,
  });
}

async function updateActivity(matchType){
    if(matchType == "Turf"){
      client.updatePresence({
        state: 'In a Match',
        details: 'Turf War',
        startTimestamp: Date.now(),
        endTimestamp: Date.now() + 180000,
        largeImageKey: 'mainlogo',
        largeImageText: "Splatoon 2",
        smallImageKey: 'turflogo',
        smallImageText: 'Turf War',
        instance: true,
      })
    } else if (matchType == "Ranked"){
      client.updatePresence({
        state: 'In a Match',
        details: 'Ranked Battle',
        startTimestamp: Date.now(),
        endTimestamp: Date.now() + 180000,
        largeImageKey: 'mainlogo',
        largeImageText: "Splatoon 2",
        smallImageKey: 'rankedlogo',
        smallImageText: 'Ranked',
        instance: true,
      })
    } else if (matchType == "League"){
      client.updatePresence({
        state: 'Forming a Team...',
        details: 'League Battle',
        startTimestamp: Date.now(),
        largeImageKey: 'mainlogo',
        largeImageText: "Splatoon 2",
        smallImageKey: 'leaguelogo',
        smallImageText: 'League',
        partySize: 3,
        partyMax: 4,
        instance: true,
      })
    } else{
      console.log(`Something went wrong.`)
    }
}

//When ready, set an initial status
app.on('ready', () => {
  setActivity();

  //Activity can be set 4 times every 20 seconds, but we update every 3 min to properly account for match time.
  //Removed 4/17/20 in favor of update on click
  // setInterval(() => {
  //   setActivity();
  // }, 10e3);
});

//IPCMain to handle updates to presence

// Note - I have no idea what kind of BS this is, but discord only will update
// presence for some reason if I do it through an async function...
// if anyone out there knows what to do to fix this please let me know!
ipcMain.on('updateStatus', function(event, data) {
  console.log(`Recieved ${data}`)
  const client = require('discord-rich-presence')(clientId);
  if(data == "Turf"){
    console.log(`Updating Status to Turf War`);
    updateActivity("Turf");
  } else if (data == "Ranked"){
    console.log(`Updating Status to Ranked Battle`);
    updateActivity("Ranked");
  } else if (data == "League"){
    console.log(`Updating Status to League Battle`);
    updateActivity("League");
  }
});
