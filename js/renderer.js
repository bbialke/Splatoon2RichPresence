// Selectors for game mode
document.querySelector('#turfLink').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: Turf War`)
    displayCheckmarks('turf');
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateStatus', "Turf");
    disableLinks();
  }
});
document.querySelector('#rankedLink').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: Ranked Battle`)
    displayCheckmarks('ranked');
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateStatus', "Ranked");
    disableLinks();
  }
});
document.querySelector('#leagueLink').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: League Battle`)
    displayCheckmarks('league');
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
    displayCheckmarks('joinYes');
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateOptions', "joinAllowed");
    disableLinks();
  }
});
document.querySelector('#joinNo').addEventListener('click', function() {
  event.preventDefault();
  if(timer == null){
    console.log(`Selected: League Battle`)
    displayCheckmarks('joinNo');
    let ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('updateOptions', "joinDisallowed");
    disableLinks();
  }
});
// Disable/Re-enable links after a 5 second delay to avoid hitting a ratelimit

var timer = null;

function disableLinks() {
  timer = setInterval(function(){enableLinks()},5000);
  //5 second delay
}

function enableLinks(){
  clearInterval(timer);
  timer = null;
}

function displayCheckmarks(type){
  if(type == 'turf'){
    document.getElementById("turfCheck").style.display= '';
    document.getElementById("rankedCheck").style.display= 'none';
    document.getElementById("leagueCheck").style.display= 'none';
  } else if(type == 'ranked'){
    document.getElementById("turfCheck").style.display= 'none';
    document.getElementById("rankedCheck").style.display= '';
    document.getElementById("leagueCheck").style.display= 'none';
  } else if(type == 'league'){
    document.getElementById("turfCheck").style.display= 'none';
    document.getElementById("rankedCheck").style.display= 'none';
    document.getElementById("leagueCheck").style.display= '';
  } else if(type == 'joinYes'){
    document.getElementById("joinYes").innerHTML = '(Yes)';
    document.getElementById("joinNo").innerHTML = 'No';
  } else if(type == 'joinNo'){
    document.getElementById("joinYes").innerHTML = 'Yes';
    document.getElementById("joinNo").innerHTML = '(No)';
  }
}
