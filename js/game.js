const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 630;
canvas.height = 600;

let player = new Player();
let target = new Butterfly();
let bonus = [];
let timer = 30;
let score = 0;
let countdown;
let bonusInterval;

// Start screen with instructions

function startScreen() {
  clearCanvas();
  howToPlayIntro();
  document.addEventListener("click", startGame);
}
function startGame() {
  countdown = setInterval(function () {
    timer--;
  }, 1000);
  bonusInterval = setInterval(function () {
    bonus.push(new Bonus());
  }, 15000);
  document.removeEventListener("click", startGame);
  animate();
}

// Main game loop

function animate() {
  clearCanvas();
  player.drawPlayer();
  player.move();
  target.drawButterfly();
  detectCollision(player, target);
  canvasBoundaryCheck();
  bonusEvent();
  timerAndScore();
}

// Game over screen with score results

function gameOver() {
  window.cancelAnimationFrame(animate);
  clearCanvas();
  postResults();
}

startScreen();
