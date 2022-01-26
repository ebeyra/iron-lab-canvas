// Controlled player class
class Player {
  constructor() {
    this.x = canvas.width / 2 - 20;
    this.y = canvas.height / 2 - 20;
    this.w = 70;
    this.h = 50;
  }
  move() {
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
  drawPlayer() {
    let playerImage = new Image();
    playerImage.src = "/images/net.png";
    ctx.drawImage(playerImage, this.x, this.y, this.w, this.h);
  }
}
// Target butterfly class
class Butterfly {
  constructor() {
    this.x = Math.round(Math.random() * (canvas.width - 100));
    this.y = Math.round(Math.random() * (canvas.height - 100));
    this.w = 40;
    this.h = 40;
  }
  drawButterfly() {
    let butterflyImage = new Image();
    butterflyImage.src = "/images/butterfly.png";
    ctx.drawImage(butterflyImage, this.x, this.y, this.w, this.h);
  }
  newButterfly() {
    target = new Butterfly();
  }
}
// Bonus golden butterfly class
class Bonus {
    constructor() {
      this.x = Math.round(Math.random() * (canvas.width - 50));
      this.y = canvas.height + 25;
      this.w = 70;
      this.h = 70;
    }
    flyAcross() {
      this.y = this.y - 3;
    }
    drawGoldenButterfly() {
      let bonusImage = new Image();
      bonusImage.src = "/images/gold.png";
      ctx.drawImage(bonusImage, this.x, this.y, this.w, this.h);
    }
  }
