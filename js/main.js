console.log('main loaded');

const minimunTime = 800;
const maximunTime = 1300;


const startMessage = document.querySelector('.start-message')
const startBtn = document.querySelector('.start-button')
const allTiles = document.querySelectorAll('.tiles');

const resetBtn = document.querySelector('.reset-button')


const randomTileNumber = (0, allTiles.length - 1);
const selectedTile = allTiles[randomTileNumber];
selectedTile.classList.add('active');

let creditsScore = 10;

let scoreLeader = 0;


const playerPointsElement = document.querySelector('.points-score');

console.log(allTiles);

const scoreLeaderboardElement = document.querySelector('.score-leaderboard');


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) +
        min);
}
console.log(getRandomNumber(1, 50));



function activateRandomTile() {
    const currentAcitveTile = document.querySelector('.tiles.active')
    if (currentAcitveTile) {
        currentAcitveTile.classList.remove('active');
        console.log(true)
    }
    allTiles[getRandomNumber(0, allTiles.length - 1)].classList.add('active');
    setTimeout(() => { activateRandomTile() }, getRandomNumber(minimunTime, maximunTime));
}


function tileClicked(tile) {
    if (tile.classList.contains('active')) {
        creditsScore = creditsScore + 1;
        playerPointsElement.textContent = creditsScore;
        scoreLeaderboardElement.textContent = scoreLeader;
        updatePlayerData();

    } else {
        creditsScore = creditsScore - 2;
        playerPointsElement.textContent = creditsScore;
        scoreLeaderboardElement.textContent = scoreLeader;
        updatePlayerData();

        console.log(creditsScore);
        tile.classList.remove('active');
    }
}



function updatePlayerData() {
    localStorage.setItem('points-score', creditsScore, scoreLeader);
    playerPointsElement.innerHTML = localStorage.getItem("points-score");
    scoreLeaderboardElement.innerHTML = localStorage.getItem('points-score');
}

function refreshPlayerData() {
    scoreLeader = parseInt(localStorage.getItem('points-score'));
    creditsScore = parseInt(localStorage.getItem('points-score'));// zorgt ervoor dat het een nummer is en geen tekst, anders krijg je bijvoorbeeld 21 ipv 3
    playerPointsElement.innerHTML = localStorage.getItem("points-score"); //hij zet de opgeslagen wins in de html
    scoreLeaderboardElement.innerHTML = localStorage.getItem('points-score');
}



if (localStorage.length != 0) { //checkt of er uberhaupt iets is opgeslagen in de local storage
    refreshPlayerData(); // als iets is opgeslagen refresht het de data
}


allTiles.forEach(function (tile) {
    tile.addEventListener('click',
        function () {
            tileClicked(tile);
        })
});


setTimeout(() => { activateRandomTile() }, 600);




const startingMinutes = 1;
let time = startingMinutes * 60;



//----------------------------------------------------------------------


startBtn.addEventListener('click', startGame)

function startGame() {
    startMessage.style.display = "none";
    const countDownEl = document.querySelector('.timerh2');
    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        countDownEl.innerHTML = `${minutes}: ${seconds}`;
        time--;
    }
    setInterval(updateCountdown, 1000);
}

const result = prompt('Wat is je naam?'); //dit zorgt voor dat er een alert komt met een vraag
alert(`Hallo ${result}, Welkom bij het spel Whack the tile!`); //het vraagt wat jouw naam is

document.querySelector('.name').innerHTML = result;
document.querySelector('.name-leaderboard').innerHTML = result;

resetBtn.addEventListener('click', resetPoints)

function resetPoints() {
    localStorage.clear();
    location.reload(); //zorgt ervoor dat de website refreshed en de spel opnieuw restart
}







