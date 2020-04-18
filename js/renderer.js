document.querySelector('#turfLink').addEventListener('click', function() {
  event.preventDefault();
  console.log(`Selected: Turf War`)
  let ipcRenderer = require('electron').ipcRenderer;
  ipcRenderer.send('updateStatus', "Turf");
});
document.querySelector('#rankedLink').addEventListener('click', function() {
  event.preventDefault();
  console.log(`Selected: Ranked Battle`)
  let ipcRenderer = require('electron').ipcRenderer;
  ipcRenderer.send('updateStatus', "Ranked");
});
document.querySelector('#leagueLink').addEventListener('click', function() {
  event.preventDefault();
  console.log(`Selected: League Battle`)
  let ipcRenderer = require('electron').ipcRenderer;
  ipcRenderer.send('updateStatus', "League");
});
// TODO - Disable/Re-enable links after a 10 second delay to avoid hitting a ratelimit
