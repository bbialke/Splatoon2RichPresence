var open = require("open");

document.querySelector('#gitLink').addEventListener('click', function() {
  event.preventDefault();
  open("https://github.com/bbialke/Splatoon2RichPresence");
});
document.querySelector('#splatLink').addEventListener('click', function() {
  event.preventDefault();
  open("https://splatoon2.ink");
});
document.querySelector('#twitLink').addEventListener('click', function() {
  event.preventDefault();
  open("https://twitter.com/AI_Krypto");
});
