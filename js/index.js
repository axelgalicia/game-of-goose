const maxPlayers = 20;

function prepareDropdown() {
    for (let i = 0; i < maxPlayers; i++) {
        const optionsHtml = `<a class="dropdown-item" href="#" onclick="start(${i + 1})">${i + 1}</a>`;
        const dropdown = document.getElementById('number-players-dropdown');
        dropdown.innerHTML += optionsHtml;

    }

}


function start(numPlayers) {
    window.location.href = '/play.html';
    window.localStorage.setItem('numPlayers', numPlayers);
}

prepareDropdown();