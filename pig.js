var scores, roundScore, activePlayer, gamePlaying, prevDice;

init();

// console.log(dice);
// document.querySelector("#current-" + activePlayer).textContent = dice;
document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //   1.random number
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    // 2.display the result
    document.querySelector("#dice-1").style.display = "block";
    document.querySelector("#dice-2").style.display = "block";

    document.querySelector("#dice-1").src = "dice-" + dice1 + ".png";
    document.querySelector("#dice-2").src = "dice-" + dice2 + ".png";

    if (dice1 !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
    /*
    if (dice === 6 && prevDice === 6) {
      //lose his score
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice !== 1) {
      // 3.update the round score if roll dice no is not 1
      //add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
    prevDice = dice;
    */
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI

    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winingScore;
    if (input) {
      winingScore = input;
    } else {
      winingScore = 100;
    }

    //player won the game

    if (scores[activePlayer] >= winingScore) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector("#dice-1").style.display = "none";
      document.querySelector("#dice-2").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next palyer
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";

  document.querySelector(".final-score").value = "";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "player 1";
  document.getElementById("name-1").textContent = "player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
