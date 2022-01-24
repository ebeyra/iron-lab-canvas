const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
let grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
grd.addColorStop(0, "#bdc3c7");
grd.addColorStop(1, "#2c3e50");

// Creating the player box

class Player {
  constructor() {
    this.x = canvas.width / 2 - 20;
    this.y = canvas.height / 2 - 20;
    this.w = 20;
    this.h = 20;
    this.color = "white";
  }
  move(direction) {
    switch (direction) {
      case "ArrowUp":
        this.y -= 25;
        break;
      case "ArrowDown":
        this.y += 25;
        break;
      case "ArrowLeft":
        this.x -= 25;
        break;
      case "ArrowRight":
        this.x += 25;
        break;
    }
  }
}

let player = new Player();

// Creating the object box and random location function

class Treasure {
  constructor() {
    this.x = Math.round(Math.random() * (canvas.width - 100));
    this.y = Math.round(Math.random() * (canvas.height - 100));
    this.w = 15;
    this.h = 15;
    this.color = "red";
  }
}

let treasure = new Treasure();

function spawnTreasure() {
  treasure = new Treasure();
}

// Re-using event listener for movement

document.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "ArrowUp":
      player.move("ArrowUp");
      break;
    case "ArrowDown":
      player.move("ArrowDown");
      break;
    case "ArrowLeft":
      player.move("ArrowLeft");
      break;
    case "ArrowRight":
      player.move("ArrowRight");
      break;
  }
});

// Timer and score for the game
let timer = 30;
let interval;
let score = 0;

// Detect collision formula - modified to move the treasure

function detectCollision(player, obj) {
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    score += 1;
    spawnTreasure();
  }
  // } else {
  //   return false;
  // }
}

// Make a starting screen

function startScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Canvas Game", canvas.width / 2, canvas.height / 2);
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Click to play", canvas.width / 2, canvas.height / 2 + 50);
  document.addEventListener("click", startGame);
}

function startGame() {
  interval = setInterval(function () {
    timer--;
  }, 1000);
  document.removeEventListener("click", startGame);
  animate();
}
function gameOver() {
  window.cancelAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  ctx.fillText(
    `Final Score: ${score}`,
    canvas.width / 2,
    canvas.height / 2 + 50
  );
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  detectCollision(player, treasure);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.w);
  ctx.fillStyle = treasure.color;
  ctx.fillRect(treasure.x, treasure.y, treasure.w, treasure.w);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.fillText(`Timer: ${timer}`, canvas.width - 20, 30);
  ctx.fillText(`Score: ${score}`, canvas.width - 20, 50);
  if (timer <= 0) {
    gameOver();
  } else {
    window.requestAnimationFrame(animate);
  }
}

startScreen();
