// Controlled player class
class Player {
  constructor() {
    this.w = 50;
    this.h = 55;
    this.x = canvas.width / 2 - this.w;
    this.y = canvas.height / 2 - this.h;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.score = 0;
  }
  movement() {
    if (this.up) {
      player.y -= 3;
    }
    if (this.down) {
      player.y += 3;
    }
    if (this.left) {
      player.x -= 3;
    }
    if (this.right) {
      player.x += 3;
    }
  }
  drawPlayer() {
    let playerImage = new Image();
    playerImage.src = "/images/net.png";
    ctx.drawImage(playerImage, this.x, this.y, this.w, this.h);
  }
}
// Target butterfly class
class Butterfly {
  constructor() {
    this.x = Math.round(Math.random() * (canvas.width - 75));
    this.y = Math.round(Math.random() * (canvas.height - 75));
    this.w = 30;
    this.h = 25;
  }
  drawButterfly() {
    let butterflyImage = new Image();
    butterflyImage.src = "/images/butterfly.png";
    ctx.drawImage(butterflyImage, this.x, this.y, this.w, this.h);
  }
  respawnButterfly() {
    target = new Butterfly();
  }
}
// Bonus golden butterfly class
class Bonus {
  constructor() {
    this.x = Math.round(Math.random() * (canvas.width - 50));
    this.y = canvas.height + 25;
    this.w = 40;
    this.h = 25;
  }
  drawGoldenButterfly() {
    let bonusImage = new Image();
    bonusImage.src = "/images/gold.png";
    ctx.drawImage(bonusImage, this.x, this.y, this.w, this.h);
  }
  flyAcross() {
    this.y = this.y - 3;
  }
}
