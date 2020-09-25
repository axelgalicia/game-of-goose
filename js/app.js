const audioElement = document.getElementById("rolling-dice-audio");
const urlParams = new URLSearchParams(window.location.search);
const numPlayers = urlParams.get('jugadores');

console.log('Num of players:', numPlayers);
function playAudio() {
    audioElement.play();
}

