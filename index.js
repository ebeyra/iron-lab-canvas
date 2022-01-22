const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

// Creating the player cube

class Player {
  constructor() {
    this.x = 50;
    this.y = 100;
    this.w = 50;
    this.y = 50;
    this.color = "blue";
  }
  move(direction) {
    switch (direction) {
      case "ArrowUp":
        this.y -= 15;
        break;
      case "ArrowDown":
        this.y += 15;
        break;
      case "ArrowLeft":
        this.x -= 15;
        break;
      case "ArrowRight":
        this.x += 15;
        break;
    }
  }
}

let player = new Player();

// Creating the object box

class Obstacle {
  constructor() {
    this.x = Math.round(Math.random() * canvas.width - this.w);
    this.y = Math.round(Math.random() * canvas.height - this.w);
    this.w = 25;
    this.h = 25;
    this.color = "red";
  }
}

let object = new Obstacle();

function spawnObstacle() {
  ctx.fillStyle = object.color
  ctx.fillRect = (object.x, object.y, object.w, object.h)
}

// Bringing over event listener

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

// Add a timer to end the game -- NOT SURE WHERE TO PUT IT
// myInterval = setInterval(function() {
// timer--;
// }, 1000);
// clearInterval(myInterval);
let timer = 30;

// Detect collision formula
function detectCollision(player, obj) {
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    return true;
  } else {
    return false;
  }
}

// Make a starting screen

function startScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText("Canvas Game", canvas.width / 2, canvas.height / 2);
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText("Click to play", canvas.width / 2, canvas.height / 2 + 50);
  document.addEventListener("click", startGame);
}

// startScreen();

function startGame() {
  setInterval(function () {
    timer--;
  }, 1000);
  document.removeEventListener("click", startGame);
}
function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  ctx.fillText("Final score: ", canvas.width / 2, canvas.height / 2 + 50);
}

function animate() {
  window.requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
  spawnObstacle()
  ctx.fillStyle = "black"
  ctx.font = "20px Arial"
  ctx.textAlign = "right"
  ctx.fillText("text",x,y)
  ctx.fillText("text",x,y)
  
}
