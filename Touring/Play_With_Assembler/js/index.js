let user = new User();
let game;

const changeDomToNextForm = (previous, next) => {
    if (previous === 'userDiv' && next === 'gameDiv') {
        newGame();
        userDiv.classList.remove('game-window-active');
        gameDiv.classList.add('game-window-active');
        return;
    }
    if (previous === 'gameDiv' && next === 'finishDiv') {
        gameDiv.classList.remove('game-window-active');
        finishDiv.classList.add('game-window-active');
        return;
    }
}

function newGame() {
    game = new Game();
    game.guessedWord();
    game.printUserScores();
}

historyGameLS && userScores.classList.remove('hide-content');

newGame();
game.printUserScores();
addEventListenerToButtons();
game.printUsersSavedButtons();
