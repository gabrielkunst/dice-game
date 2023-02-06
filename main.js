"use strict";

/* VARIABLES */

const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");
const score1El = document.querySelector("#score1");
const score2El = document.querySelector("#score2");
const current1El = document.querySelector("#current1");
const current2El = document.querySelector("#current2");
let score1 = 0;
let score2 = 0;
let current1 = 0;
let current2 = 0;
let random = Math.trunc(Math.random() * 6) + 1;
const btnNew = document.querySelector("#btnNew");
const btnPlay = document.querySelector("#btnPlay");
const btnHold = document.querySelector("#btnHold");
let win = false;

/* FUNCTIONS */

const playDice = function () {
  if (!win) {
    random = Math.trunc(Math.random() * 6) + 1;
    display("#random", random);
    if (random != 1) {
      if (player1.classList.contains("active")) {
        current1 += random;
        display("#current1", current1);
      } else {
        current2 += random;
        display("#current2", current2);
      }
    } else {
      if (player1.classList.contains("active")) {
        current1 = 0;
        display("#current1", current1);
      } else {
        current2 = 0;
        display("#current2", current2);
      }
      changeActive();
    }
  } else {
    alert("Reset the game to play again!");
  }
};

function changeActive() {
  if (player1.classList.contains("active")) {
    player1.classList.remove("active");
    player2.classList.add("active");
  } else {
    player2.classList.remove("active");
    player1.classList.add("active");
  }
}

const resetAll = function () {
  score1 = 0;
  score2 = 0;
  current1 = 0;
  current2 = 0;
  display("#score1", 0);
  display("#score2", 0);
  display("#current1", 0);
  display("#current2", 0);
  display("#random", "");
  win = false;
  if (player2.classList.contains("active")) {
    changeActive();
  }
  random = Math.trunc(Math.random() * 6) + 1;
  player1.classList.remove("winner");
  player2.classList.remove("winner");
};

const hold = function () {
  if (!win) {
    if (player1.classList.contains("active")) {
      score1 += current1;
      current1 = 0;
      display("#score1", score1);
      display("#current1", current1);
    } else {
      score2 += current2;
      current2 = 0;
      display("#score2", score2);
      display("#current2", current2);
    }
    verifyWinner();
    if (!win) changeActive();
  }
};

function verifyWinner() {
  const winnerMax = 100;
  if (score1 >= winnerMax || score2 >= winnerMax) {
    score1 >= winnerMax
      ? player1.classList.add("winner")
      : player2.classList.add("winner");
    win = true;
  }
}

function showRandom() {}

function display(element, value) {
  document.querySelector(element).textContent = value;
}
/* CALLS */

btnNew.addEventListener("click", resetAll);
btnPlay.addEventListener("click", playDice);
btnHold.addEventListener("click", hold);
