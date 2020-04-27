const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let allowJoining = true;
let leagueSize = 4;

//Update ENV for Production
//process.env.NODE_ENV = 'production'
app.allowRendererProcessReuse = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 760,
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

  mainWindow.removeMenu();
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
const client = require('discord-rich-presence')(clientId);

// only needed for discord allowing spectate, join, ask to join
const startTimestamp = new Date();
client.on('join', (secret) => {
  console.log('we should join with', secret);
});

client.on('spectate', (secret) => {
  console.log('we should spectate with', secret);
});

client.on('joinRequest', (user) => {
  if (user.discriminator === '4945') {
    client.reply(user, 'YES');
  } else {
    client.reply(user, 'IGNORE');
  }
});

async function setActivity() {
  if (!client || !mainWindow) {
    return;
  }
//Initial "demo" status shown on app load, confirms to the user that the presence can be updated
  client.updatePresence({
    state: 'Getting Ready',
    largeImageKey: 'mainlogo',
    startTimestamp: Date.now(),
  });
}

//This huge async function is neccecary (for some reason) to update the presence on all Discord clients,
//when trying to move this into seperate files, the local client refused to update, so here it stays.
async function updateActivity(matchType){
  if(matchType == "Turf"){
    if(allowJoining == true){
      client.updatePresence({
        state: 'In a Match',
        details: 'Turf War',
        startTimestamp: Date.now(),
        largeImageKey: 'mainlogo',
        largeImageText: "Splatoon 2",
        smallImageKey: 'turflogo',
        smallImageText: 'Turf War',
        partyId: 'turf',
        partySize: 1,
        partyMax: 8,
        matchSecret: 'TurfMatch',
        joinSecret: 'shhhh',
        spectateSecret: 'thisIsASecret',
      })
    } else {
      client.updatePresence({
        state: 'In a Match',
        details: 'Turf War',
        startTimestamp: Date.now(),
        largeImageKey: 'mainlogo',
        largeImageText: "Splatoon 2",
        smallImageKey: 'turflogo',
        smallImageText: 'Turf War',
      })
    }
  } else if (matchType == "Ranked"){
    client.updatePresence({
      state: 'In a Match',
      details: 'Ranked Battle',
      startTimestamp: Date.now(),
      largeImageKey: 'mainlogo',
      largeImageText: "Splatoon 2",
      smallImageKey: 'rankedlogo',
      smallImageText: 'Ranked',
    })
  } else if (matchType == "League"){
    if(leagueSize == 4){
      if(allowJoining == true){
        client.updatePresence({
          state: 'Forming a Team...',
          details: 'League Battle',
          startTimestamp: Date.now(),
          largeImageKey: 'mainlogo',
          largeImageText: "Splatoon 2",
          smallImageKey: 'leaguelogo',
          smallImageText: 'League',
          partyId: 'league',
          partySize: 1,
          partyMax: 4,
          matchSecret: 'LeagueMatch',
          joinSecret: 'shhhh',
          spectateSecret: 'thisIsASecret',
        })
      } else {
        client.updatePresence({
          state: 'In a Match',
          details: 'League Battle',
          startTimestamp: Date.now(),
          largeImageKey: 'mainlogo',
          largeImageText: "Splatoon 2",
          smallImageKey: 'leaguelogo',
          smallImageText: 'League',
        })
      }
    } else if (leagueSize == 2){
      if(allowJoining == true){
        client.updatePresence({
          state: 'Forming a Team...',
          details: 'League Battle',
          startTimestamp: Date.now(),
          largeImageKey: 'mainlogo',
          largeImageText: "Splatoon 2",
          smallImageKey: 'leaguelogo',
          smallImageText: 'League',
          partyId: 'league',
          partySize: 1,
          partyMax: 2,
          matchSecret: 'LeagueMatch',
          joinSecret: 'shhhh',
          spectateSecret: 'thisIsASecret',
        })
      } else {
        client.updatePresence({
          state: 'In a Match',
          details: 'League Battle',
          startTimestamp: Date.now(),
          largeImageKey: 'mainlogo',
          largeImageText: "Splatoon 2",
          smallImageKey: 'leaguelogo',
          smallImageText: 'League',
        })
      }
    }
  }  else{
    console.log(`Something went wrong.`)
  }
}

//When ready, set an initial status
app.on('ready', () => {
  console.log(`connected`);
  setActivity();
});

//IPCMain to handle updates to presence
ipcMain.on('updateStatus', function(event, data) {
  console.log(`Recieved ${data}`)
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
//IPCMain to handle updates to options
ipcMain.on('updateOptions', function(event, data) {
  console.log(`Recieved ${data}`)
  if(data == "joinAllowed"){
    console.log(`Allowing Joins`);
    allowJoining = true;
  }
  else if(data == "joinDisallowed"){
    console.log(`Disallowing Joins`);
    allowJoining = false;
  } else if(data == "size2"){
    console.log(`Setting League size to 2`);
    leagueSize = 2;
  } else if(data == "size4"){
    console.log(`Setting League size to 4`);
    leagueSize = 4;
  }
});
