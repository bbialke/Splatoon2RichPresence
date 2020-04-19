// Selectors for game mode
document.querySelector('#turfLink').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: Turf War`)
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateStatus', "Turf");
    disableLinks();
  }
});
document.querySelector('#rankedLink').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: Ranked Battle`)
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateStatus', "Ranked");
    disableLinks();
  }
});
document.querySelector('#leagueLink').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: League Battle`)
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateStatus', "League");
    disableLinks();
  }
});
// Selectors for other options
document.querySelector('#joinYes').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: Allow Joining`)
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateOptions', "joinAllowed");
    disableLinks();
  }
});
document.querySelector('#joinNo').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: League Battle`)
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateOptions', "joinDisallowed");
    disableLinks();
  }
});
// Disable/Re-enable links after a 10 second delay to avoid hitting a ratelimit

var timer = null;

function disableLinks() {
  timer = setInterval(function(){enableLinks()},10000);
  //10 second delay
}

function enableLinks(){
  clearInterval(timer);
  timer = null;
}
