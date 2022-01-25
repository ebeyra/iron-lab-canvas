const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 630;
canvas.height = 600;

// Player class creation and image assignment

class Player {
  constructor() {
    this.x = canvas.width / 2 - 20;
    this.y = canvas.height / 2 - 20;
    this.w = 70;
    this.h = 50;
  }
}

let player = new Player();
let playerImage = new Image();
playerImage.src = "/net.png";

// Butterfly class creation and image assignment
// Randomization of butterfly location

class Butterfly {
  constructor() {
    this.x = Math.round(Math.random() * (canvas.width - 100));
    this.y = Math.round(Math.random() * (canvas.height - 100));
    this.w = 40;
    this.h = 40;
    this.color = "red";
  }
}

let butterfly = new Butterfly();
let butterflyImage = new Image();
butterflyImage.src = "/butterfly.png";

function spawnButterfly() {
  butterfly = new Butterfly();
}

// Bonus class creation and image assignment

class Bonus {
  constructor() {
    this.x = Math.round(Math.random() * (canvas.width - 50));
    this.y = 625;
    this.w = 70;
    this.h = 70;
  }
  moveDown() {
    this.y = this.y - 3;
  }
}

let bonus = [];
let bonusImage = new Image();
bonusImage.src = "/gold.png";

// Event listeners for smooth movement

let up = false;
let down = false;
let left = false;
let right = false;

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      up = true;
      break;
    case "ArrowDown":
      down = true;
      break;
    case "ArrowLeft":
      left = true;
      break;
    case "ArrowRight":
      right = true;
      break;
  }
});
document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowUp":
      up = false;
      break;
    case "ArrowDown":
      down = false;
      break;
    case "ArrowLeft":
      left = false;
      break;
    case "ArrowRight":
      right = false;
      break;
  }
});
function movement() {
  if (up) {
    player.y -= 3;
  }
  if (down) {
    player.y += 3;
  }
  if (left) {
    player.x -= 3;
  }
  if (right) {
    player.x += 3;
  }
}

// Score, timer, and bonus interval for the game

let timer = 30;
let interval;
let score = 0;
let bonusInterval;

// Detect collision formula - modified to relocate the butterfly
// Canvas boundary walls function

function detectCollision(player, obj) {
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    score += 1;
    spawnButterfly();
  }
  // } else {
  //   return false;
  // }
}
function boundaries() {
  if (player.y + player.w > canvas.height) {
    player.y = canvas.height - player.w;
  }
  if (player.y < 0) {
    player.y = 0;
  }
  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  }
  if (player.x < 0) {
    player.x = 0;
  }
}

// Start screen with title and game instructions
// Event listener on mouse click

function startScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Collect the Butterflies", canvas.width / 2, canvas.height / 2);
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Click to play", canvas.width / 2, canvas.height / 2 + 30);
  ctx.fillText(
    "Use arrow keys to move the net",
    canvas.width / 2,
    canvas.height / 2 + 75
  );
  ctx.fillStyle = "yellow";
  ctx.fillText(
    "Golden butterflies add bonus time",
    canvas.width / 2,
    canvas.height / 2 + 100
  );
  document.addEventListener("click", startGame);
}

// Pre-animate function for intervals

function startGame() {
  interval = setInterval(function () {
    timer--;
  }, 1000);
  bonusInterval = setInterval(function () {
    bonus.push(new Bonus());
  }, 15000);
  document.removeEventListener("click", startGame);
  animate();
}

// The main game animate function

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movement();
  boundaries();

  // Bonus item loop
  for (let i = 0; i < bonus.length; i++) {
    ctx.fillStyle = bonus[i].color;
    bonus[i].moveDown();
    ctx.drawImage(bonusImage, bonus[i].x, bonus[i].y, bonus[i].w, bonus[i].h);
    if (
      player.x < bonus[i].x + bonus[i].w &&
      player.x + player.w > bonus[i].x &&
      player.y < bonus[i].y + bonus[i].h &&
      player.y + player.h > bonus[i].y
    ) {
      timer += 5;
      bonus.splice(bonus[i]);
    }
  }

  // Collision function from outside animate
  detectCollision(player, butterfly);

  // Drawing player and butterflies to canvas
  ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
  ctx.drawImage(
    butterflyImage,
    butterfly.x,
    butterfly.y,
    butterfly.w,
    butterfly.h
  );

  // Drawing timer and score at the top right
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.fillText(`Timer: ${timer}`, canvas.width - 35, 55);
  ctx.fillText(`Score: ${score}`, canvas.width - 35, 75);

  // Condition to end game or continue
  if (timer <= 0) {
    gameOver();
  } else {
    window.requestAnimationFrame(animate);
  }
}

// Game over screen with score results

function gameOver() {
  window.cancelAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  ctx.fillText(
    `You caught ${score} butterflies`,
    canvas.width / 2,
    canvas.height / 2 + 50
  );
}

startScreen();
