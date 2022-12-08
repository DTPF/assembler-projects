/***************** Choose user *****************/
const userDiv = document.getElementById('userDiv');
const userForm = document.getElementById('chooseNameForm');
const players = document.getElementById('players');

/***************** Game *****************/
const gameDiv = document.getElementById('gameDiv');
const wordSpotlight = document.getElementById('wordSpotlight');
const hangmanPic = document.getElementById('hangmanPic');
const keyboard = document.getElementById('keyboard');
const alphabet = document.querySelectorAll('[data-target="alphabet"]');

/***************** Finish *****************/
const finishMessage = document.getElementById('finishMessage');
const finishMessageAnswer = document.getElementById('finishMessageAnswer');
const finishMessageResult = document.getElementById('finishMessageResult');
const finishDivTotal = document.getElementById('finishDivTotal');
const playAgainButton = document.getElementById('playAgainButton');

/***************** User scores*****************/
const userScores = document.getElementById('userScores');
const userScoresList = document.getElementById('userScoresList');
const userScoresDiv = document.getElementById('userScoresDiv');
const resetScores = document.getElementById('resetScores');
const userScoreName = document.getElementById('userScoreName');
const userScoreTime = document.getElementById('userScoreTime');


/***************** LocalStorage ***************/
let historyGameLS = localStorage.getItem('game-history');