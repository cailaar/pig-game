"use strict";

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); //faster than query selector generally when selecting lots
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
  scores = [0, 0]; //storing scores of players in an array hence active player being 0
  currentScore = 0; /*cannot be inside the function or
    it'd be set to 0 on each click*/
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate a random dice roll
    const roll = Math.trunc(Math.random() * 6 + 1);
    console.log(roll);

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${roll}.png`;

    //3. Check for rolled 1:
    if (roll !== 1) {
      // Add roll to current score
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Hold functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores [1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Else switch to the next player
      switchPlayer();
    }
  }
});

//Reset the game
btnNew.addEventListener("click", init);
