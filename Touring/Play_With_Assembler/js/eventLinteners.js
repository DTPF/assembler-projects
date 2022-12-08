userForm.addEventListener('submit', (e) => user.setUser(e));
resetScores.addEventListener('click', () => game.resetScores());
playAgainButton.addEventListener('click', () => game.playAgain());

const addEventListenerToButtons = () => {
    alphabet.forEach((input) => {
        input.id = input.value;
        input.addEventListener('click', () => game.handleGuess(input.id));
    })
};