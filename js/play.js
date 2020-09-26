/*
Resources:
https://www.kirupa.com/html5/drag.htm
*/

const audioElement = document.getElementById("rolling-dice-audio");
const numPlayers = window.localStorage.getItem('numPlayers');
let currentTurn = -1;

const colors = ['red', 'blue', 'green', 'black', 'purple',
    'orange', 'chocolate', 'darkgrey', 'lawngreen', 'magenta', 'mediumslateblue',
    'mediumspringgreen', 'navy', 'orangered', 'peru', 'yellow'];

const diceNumberClasses = ['one', 'two', 'three', 'four', 'five', 'six'];
const diceAnimationClasses = ['roll-1', 'roll-2'];

const boards = ['board1.png', 'board2.png', 'board3.jpeg'];
const currentBoard = window.localStorage.getItem('currentBoard');
window.localStorage.setItem('currentBoard', !!currentBoard ? currentBoard : 0);



function rollDice() {
    playAudio();
    const die1Element = document.getElementById('die1');
    const die2Element = document.getElementById('die2');
    const btnRollDice = document.getElementById('btn-roll-dice');

    animateDice(die1Element, die2Element);
    btnRollDice.disabled = true;
    removeAllNumberClassToDie(die1Element);
    removeAllNumberClassToDie(die2Element);

    assignateNumberToDice(die1Element, random(0, 6));
    assignateNumberToDice(die2Element, random(0, 6));


    setTimeout(() => {
        removeAnimationDice(die1Element, die2Element);
        btnRollDice.disabled = false;
        nextTurn();
    }, 2000);

}
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function removeAllNumberClassToDie(element) {
    for (let z = 0; z < diceNumberClasses.length; z++) {
        element.classList.remove(diceNumberClasses[z]);
    }
}

function animateDice(die1, die2) {
    die1.classList.add(diceAnimationClasses[0]);
    die2.classList.add(diceAnimationClasses[1]);
}

function removeAnimationDice(die1, die2) {
    die1.classList.remove(diceAnimationClasses[0]);
    die2.classList.remove(diceAnimationClasses[1]);
}


function assignateNumberToDice(die, num) {
    die.classList.add(diceNumberClasses[num]);
}

function playAudio() {
    audioElement.play();
}

function nextTurn() {
    // First roll
    if (currentTurn === -1) {
        currentTurn = 0;
        document.getElementById(`token-${currentTurn}`).classList.add('turn');
        return;
    }
    // Returning to player 1
    if (currentTurn + 1 >= numPlayers) {
        removeClass(`token-${currentTurn}`, 'turn');
        currentTurn = 0;
        addClass(`token-${currentTurn}`, 'turn');
        return;
    }
    removeClass(`token-${currentTurn}`, 'turn');
    currentTurn += 1;
    addClass(`token-${currentTurn}`, 'turn');

}
function addClass(elementId, className) {
    document.getElementById(elementId).classList.add(className);
}

function removeClass(elementId, className) {
    document.getElementById(elementId).classList.remove(className);
}

function newGame() {
    window.location.href = '/';
}

function changeBoard() {
    const board = document.getElementById('board');
    let current = parseInt(window.localStorage.getItem('currentBoard'), 10);
    current += 1;
    if (current > boards.length - 1) {
        current = 0;
    }
    window.localStorage.setItem('currentBoard', current);
    board.src = `/images/${boards[current]}`;
}

function createTokens() {

    const playersHtmlDiv = document.getElementById('players');

    for (let i = 0; i < numPlayers; i++) {

        if (i < 17) {
            const playersHtmlDiv = document.getElementById('players');
            const tokenHtmlFirstRow = `<div id="token-${i}"  class="token" style="left: calc(${i * 50}px + 290px)">
            <svg class="${colors[i < 16 ? i : (i - 16 + 1)]}" height="60" viewBox="0 0 512 512" width="60"
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

            playersHtmlDiv.innerHTML += tokenHtmlFirstRow;
        }

        if (i >= 17) {

            const tokenHtmlSecondRow = `<div id="token-${i}"  class="token" style="left: calc(-560px + ${i * 50}px); top:600px">
        <svg class="${colors[i < 16 ? i : (i - 19 + 1)]}" height="60" viewBox="0 0 512 512" width="60"
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

            playersHtmlDiv.innerHTML += tokenHtmlSecondRow;
        }

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
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;

    elmnt.onmousedown = dragStart;
    elmnt.ontouchstart = dragStart;

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();

        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            document.addEventListener('touchend', closeDragElement, { passive: false })
            document.addEventListener('touchmove', elementDrag, { passive: false })

        } else {
            // get the mouse cursor position at startup:
            initialX = e.clientX;
            initiaY = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        if (e.type === 'touchmove') {
            currentX = initialX - e.touches[0].clientX;
            currentY = initialY - e.touches[0].clientY;
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        } else {
            // calculate the new cursor position:
            currentX = initialX - e.clientX;
            currentY = initialY - e.clientY;
            initialX = e.clientX;
            initialY = e.clientY;
        }

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - currentY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - currentX) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // Mobile
        document.removeEventListener('touchend', closeDragElement, { passive: false })
        document.removeEventListener('touchmove', elementDrag, { passive: false })
    }
}