const audioElement = document.getElementById("rolling-dice-audio");
const numPlayers = window.localStorage.getItem('numPlayers');

const colors = ['red', 'blue', 'green', 'black', 'purple',
    'orange', 'chocolate', 'darkgrey', 'lawngreen', 'magenta', 'mediumslateblue',
    'mediumspringgreen', 'navy', 'orangered', 'peru', 'yellow'];


function rollDice() {
    playAudio();
}

function playAudio() {
    audioElement.play();
}

function newGame() {
    window.location.href = '/';
}

function createTokens() {

    const playersHtmlDiv = document.getElementById('players');

    for (let i = 0; i < numPlayers; i++) {
        const tokenHtml = `<div id="token-${i}"  class="token" style="left: calc(${i * 50}px + 290px)">
            <svg class="${colors[i < 16 ? i : (16 /i)]}" height="60" viewBox="0 0 512 512" width="60"
                xmlns="http://www.w3.org/2000/svg">
                <style>
                .small { font: italic 190px sans-serif; fill: white;}
              </style>
                <g>
                    <path
                        d="m396.621 482-57.54-256.829c27.436-23.464 44.849-58.308 44.849-97.24 0-70.654-57.276-127.931-127.93-127.931s-127.93 57.277-127.93 127.93c0 38.932 17.413 73.776 44.849 97.24l-57.54 256.83h-52.907v30h387.057v-30zm-140.621-435.133c44.698 0 81.063 36.365 81.063 81.063h-30c0-28.156-22.907-51.063-51.063-51.063z" />
                        <text x="130" y="430" class="small">${i + 1}</text>
                </g>
            </svg>
        </div>
    `;
        playersHtmlDiv.innerHTML += tokenHtml;
    }
}

createTokens()
registerDragging();

function registerDragging() {
    for (let i = 0; i < numPlayers; i++) {
        dragElement(document.getElementById(`token-${i}`));
    }

}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}