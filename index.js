const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

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

  client.updatePresence({
    state: 'In a Match',
    details: 'Turf War',
    startTimestamp: Date.now(),
    endTimestamp: Date.now() + 180000,
    largeImageKey: 'mainlogo',
    smallImageKey: 'turflogo',
    instance: true,
  });
}

//When ready, start the update loop.
app.on('ready', () => {
  setActivity();

  // activity can be set 4 times every 20 seconds, but we update every 3 min to properly account for match time.
  //This will be changed in the future to a strict update button instead of auto-updating.
  setInterval(() => {
    setActivity();
  }, 180e3);
});
