'use strict';
//elements selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

const diceElement = document.querySelector('.dice');

const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

//getElementById работает только с айди, как понятно из названия
// не надо писать точку или решетку что бы указать это айди или класс как в querySelector();

const scoresTextContentZero = function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
};

//start elements values

scoresTextContentZero();
diceElement.classList.add('hidden');

let currentScore = 0; //не постоянные очки игрока
let scores = [0, 0]; //постоянные очки игрока
let activePlayer = 0; // игрок X (сначала левый игрок )

let isGameDone = false;

let activePlayerCurrentScore = document.getElementById(
  `current--${activePlayer}`, // не постоянные очки текущего игрока
);

let activePlayerScore = document.getElementById(
  `score--${activePlayer}`, //постоянные очки текущего игрока
);

const switchPlayer = function () {
  currentScore = 0;
  activePlayerCurrentScore.textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerCurrentScore = document.getElementById(
    `current--${activePlayer}`,
  );

  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//pressed button roll************************************************
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (!isGameDone) {
    //generate random number for dice
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${randomNumber}.png`; // src свойство для пути к файлу

    //if randomNumber === 1 select next player
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      activePlayerCurrentScore.textContent = currentScore;
    } else {
      switchPlayer();
    }
    activePlayerScore = document.getElementById(
      `score--${activePlayer}`, //постоянные очки текущего игрока
    );
  }
});
//******************************************************************

//pressed button hold************************************************
btnHold.addEventListener('click', function () {
  if (!isGameDone) {
    scores[activePlayer] = Number(
      document.getElementById(`score--${activePlayer}`).textContent,
    );

    scores[activePlayer] += currentScore;
    activePlayerScore.textContent = scores[activePlayer];
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      isGameDone = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceElement.classList.add('hidden');
      btnNew.style.backgroundColor = 'rgb(255, 255, 255)';
      btnNew.style.top = '25rem';
    } else {
      switchPlayer();
    }
  }
});
//******************************************************************

btnNew.addEventListener('click', function () {
  isGameDone = false;
  btnNew.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
  btnNew.style.top = '3rem';
  scoresTextContentZero();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  if (activePlayer === 1) {
    switchPlayer();
  }
  currentScore = 0;
});
