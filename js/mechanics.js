// Wipe canvas clean
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Butterfly collision check, moves butterfly to a new spawn point
function detectCollision(net, butterfly) {
  if (
    net.x < butterfly.x + butterfly.w &&
    net.x + net.w > butterfly.x &&
    net.y < butterfly.y + butterfly.h &&
    net.y + net.h > butterfly.y
  ) {
    score += 1;
    butterfly.respawnButterfly();
  }
}
// Canvas edge collision check
function canvasBoundaryCheck() {
  if (player.y + player.h > canvas.height) {
    player.y = canvas.height - player.h;
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
// Directional conditions and event listeners for smooth movement
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
// Bonus butterfly event, adds extra time if caught
function bonusButterflyEvent() {
  for (let i = 0; i < bonus.length; i++) {
    bonus[i].drawGoldenButterfly();
    bonus[i].flyAcross();
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
}
// Intro screen with instructions
function howToPlay() {
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
}
// Timekeep and scorekeep on upper right corner
function displayTimerAndScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.fillText(`Timer: ${timer}`, canvas.width - 35, 55);
  ctx.fillText(`Collected: ${score}`, canvas.width - 35, 75);
  if (timer <= 0) {
    gameOver();
  } else {
    window.requestAnimationFrame(animate);
  }
}
// Countdown and bonus butterfly intervals
function timerCountdown() {
  setInterval(function () {
    timer--;
  }, 1000);
}
function timerBonusButterfly() {
  setInterval(function () {
    bonus.push(new Bonus());
  }, 15000);
}
// Game over screen with results
function displayResults() {
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
