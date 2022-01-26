// Butterfly collision check, moves butterfly to a new spawn point
function detectCollision(player, obj) {
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    score += 1;
    target.newButterfly();
  }
}
// Canvas edge collision check
function canvasBoundaryCheck() {
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
function bonusEvent() {
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
function howToPlayIntro() {
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
// Countdown timer and score on canvas
function timerAndScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.fillText(`Timer: ${timer}`, canvas.width - 35, 55);
  ctx.fillText(`Score: ${score}`, canvas.width - 35, 75);
  if (timer <= 0) {
    gameOver();
  } else {
    window.requestAnimationFrame(animate);
  }
}
// Game over screen with results
function postResults() {
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
// Wipe canvas clean
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
