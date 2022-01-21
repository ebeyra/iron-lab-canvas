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
        this.y -= 15;
        break;
      case "ArrowRight":
        this.y += 15;
        break;
    }
  }
}

let player = new Player();

// Creating the object box

class Obstacle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 25;
    this.h = 25;
    this.color = "red";
  }
}

let object = new Obstacle();

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

// Add a timer to end the game

let timer = 

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

startScreen();

function startGame() {

  document.removeEventListener("click", startGame);
}
