const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 630;
canvas.height = 600;

let player = new Player();
let target = new Butterfly();
let bonus = [];
let timer = 30;
let score = 0;

// Starting screen with instructions

function startScreen() {
  clearCanvas();
  howToPlay();
  document.addEventListener("click", startGame);
}
function startGame() {
  timerCountdown();
  timerBonusButterfly();
  document.removeEventListener("click", startGame);
  animate();
}

// Main game loop

function animate() {
  clearCanvas();
  player.drawPlayer();
  player.movement();
  target.drawButterfly();
  detectCollision(player, target);
  canvasBoundaryCheck();
  bonusButterflyEvent();
  displayTimerAndScore();
}

// Game over screen with score results

function gameOver() {
  window.cancelAnimationFrame(animate);
  clearCanvas();
  displayResults();
}

startScreen();
