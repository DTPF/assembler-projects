let parseHistoryGameLocalStorage = JSON.parse(historyGameLS);

class Game {
    constructor() {
        this.gameHistory = parseHistoryGameLocalStorage ? parseHistoryGameLocalStorage : [];
        this.user = user;
        this.maxWrong = 6;
        this.mistakes = 0;
        this.guessed = [];
        this.wordStatus = null;
        this.words = [
            'apple',
            'pear',
            'cucumber',
            'almond',
            'banana',
            'carrot',
            'cashew',
            'cherry',
            'citron',
            'lichee',
            'orange',
            'papaya',
            'peanut',
            'tomato',
            'walnut'];
        this.answer = this.randomWord();
        this.startPlay = Date.now();
        this.endPlay = 0;
        this.totalGameplay = undefined;
    }

    randomWord() {
        let word = this.words[Math.floor(Math.random() * this.words.length)];
        console.log(word);
        return word;
    }

    guessedWord() {
        this.wordStatus = this.answer.split('').map(letter => (this.guessed.indexOf(letter) >= 0 ? letter : "_")).join('');
        wordSpotlight.innerHTML = this.wordStatus;
    }

    handleGuess(chosenLetter) {
        this.guessed.indexOf(chosenLetter) === -1 ? this.guessed.push(chosenLetter) : null;
        document.getElementById(chosenLetter).setAttribute('disabled', true);

        if (this.answer.indexOf(chosenLetter) >= 0) {
            this.guessedWord();
            this.checkIfGameWon();
        } else if (this.answer.indexOf(chosenLetter) === -1) {
            this.mistakes++;
            this.checkIfGameLost();
            this.updateHangmanPicture();
        }
    }

    updateHangmanPicture() {
        hangmanPic.src = 'assets/images/' + this.mistakes + '.jpg';
    }

    resultGame() {
        // Timming
        this.endPlay = Date.now();
        this.totalGameplay = Math.round((this.endPlay - this.startPlay) / 1000);
        // DOM print
        finishMessageAnswer.textContent = this.answer;
        finishMessageResult.textContent = `${this.user.name} ${this.user.result} in ${this.totalGameplay} seconds!!!`;
        userScores.classList.remove('hide-content');
        document.getElementById('currentPlay').style.display = 'none';
        changeDomToNextForm('gameDiv', 'finishDiv');

        this.saveInLocalStorage();
        this.printUserScores();
    }

    checkIfGameWon() {
        if (this.wordStatus === this.answer) {
            this.user.result = 'Won';
            this.user.isPlaying = false;
            this.user.timeRecord = this.totalGameplay;
            this.printUserScores();
            this.resultGame();

            finishDivTotal.textContent = `Wrong Guesses: ${this.mistakes} of ${this.maxWrong}`;
        }
    }

    checkIfGameLost() {
        if (game.mistakes === game.maxWrong) {
            this.user.result = 'Lost';
            this.user.isPlaying = false;
            this.printUserScores();
            this.resultGame();
        }
    }

    saveInLocalStorage() {
        let currentPlay = {
            user: this.user.name,
            gameTime: this.totalGameplay,
            timeRecord: this.user.timeRecord ? this.user.timeRecord : this.totalGameplay,
            timesPlayed: this.user.timesPlayed
        }

        if (!parseHistoryGameLocalStorage) {
            currentPlay.timesPlayed++;
            this.gameHistory.push(currentPlay);
            localStorage.setItem('game-history', JSON.stringify(this.gameHistory));
            userScoreTime.innerHTML = currentPlay.gameTime;
            this.printUserScores();
        } else {
            let div = document.getElementById('score' + currentPlay.user);
            if (!div) {
                currentPlay.timesPlayed++;
                this.gameHistory.push(currentPlay);
                localStorage.setItem('game-history', JSON.stringify(this.gameHistory));
                this.printUserScores();
            } else {
                this.gameHistory.find((e, key) => {
                    if (e.user === div.name) {
                        e.timesPlayed++;
                        if (currentPlay.gameTime < e.gameTime) {
                            e.timeRecord = currentPlay.gameTime;
                            this.addToLocalStorageObject('game-history', key, e);
                            div.children[1].textContent = currentPlay.gameTime + ' seconds';
                        } else {
                            this.addToLocalStorageObject('game-history', key, e);
                        }
                    }
                });
            }
        }
    }

    addToLocalStorageObject(name, key, value) {
        let existing = localStorage.getItem(name);
        existing = existing ? JSON.parse(existing) : {};
        existing[key] = value;
        localStorage.setItem(name, JSON.stringify(existing));
    };


    printUserScores() {
        const div = userScoresDiv;
        userScoresList.innerHTML = '';

        if (!parseHistoryGameLocalStorage) {
            if (this.user.isPlaying) {
                this.printCurrentUser(div);
            } else {
                if (this.gameHistory.length > 0) {
                    let cloneDiv = div.cloneNode(true);
                    cloneDiv.id = 'score' + this.user.name;
                    cloneDiv.children[0].textContent = `${this.user.name}`;
                    cloneDiv.children[1].textContent = `${(this.gameHistory[0] && this.gameHistory[0].gameTime)} seconds`;
                    userScoresList.insertAdjacentElement('beforeend', cloneDiv);
                }
            }
        } else {
            if (this.user.isPlaying) {
                this.printCurrentUser(div);
            }
            this.gameHistory.map((player) => {
                let cloneDiv = div.cloneNode(true);
                cloneDiv.id = 'score' + player.user;
                cloneDiv.name = player.user;
                cloneDiv.children[0].textContent = `${player.user}`;
                cloneDiv.children[1].textContent = `${player.timeRecord} seconds`;
                userScoresList.insertAdjacentElement('beforeend', cloneDiv);
            });
        }
    }


    printCurrentUser(div) {
        let cloneDiv = div.cloneNode(true);
        cloneDiv.id = 'currentPlay';
        cloneDiv.children[0].textContent = this.user.name;
        cloneDiv.children[1].textContent = 'Currently playing...';
        userScoresList.insertAdjacentElement('beforebegin', cloneDiv);
        userScores.classList.remove('hide-content');
    }

    printUsersSavedButtons() {
        if (this.gameHistory.length > 0) {
            JSON.parse(historyGameLS).map((e) => {
                let newPlayer = document.createElement('input');
                newPlayer.type = 'button';
                newPlayer.value = `${e.user}`;
                newPlayer.id = e.user;
                newPlayer.addEventListener('click', (e) => {
                    user.playAgain(e);
                });
                players.insertAdjacentElement('beforeend', newPlayer);
            });
        }
    }

    playAgain() {
        window.location.reload();
    }

    resetScores() {
        localStorage.removeItem('game-history');
        userScores.classList.add('hide-content');
        players.innerHTML = '';
        window.location.reload();
    }
}
