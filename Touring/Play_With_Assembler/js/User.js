class User {
    constructor() {
        this.name = '';
        this.result = '';
        this.isPlaying = false;
        this.timeRecord = null;
        this.timesPlayed = 0;
    }

    setUser(e) {
        e.preventDefault();
        this.name = e.target[0].value;
        this.isPlaying = true;
        changeDomToNextForm('userDiv', 'gameDiv');
    }

    playAgain(e) {
        this.name = e.target.value;
        this.isPlaying = true;
        changeDomToNextForm('userDiv', 'gameDiv');
    }
}