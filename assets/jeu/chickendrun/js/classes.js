class Sprite {
  constructor({ position, imageSrc, framesMax = 1 }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.framesMax,
      this.image.height
    );
    this.animateFrames();
  }

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
}

class Obstacle extends Sprite {
  constructor({ position, size, imageSrc, velocity, framesMax }) {
    super({
      position,
      imageSrc,
      framesMax,
    });
    this.velocity = velocity;
    this.size = size;
  }

  delete(key) {
    obstacleList.splice(key, 1);
  }

  update() {
    this.draw();
    this.position.x += this.velocity;
  }
}

class Player extends Sprite {
  constructor({ position, size, imageSrc, framesMax }) {
    super({
      position,
      imageSrc,
      framesMax,
    });
    this.velocity = { x: 0, y: 0 };
    this.size = size;
    this.jump = 2;
  }

  update() {
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.size.height + this.velocity.y >=
      canvas.height - 100
    ) {
      this.velocity.y = 0;
      this.jump = 2;
    } else {
      this.velocity.y += GRAVITY;
    }
    this.draw();
  }
}

class Background extends Sprite {
  constructor({
    position,
    velocity,
    size,
    imageSrc,
    framesMax,
    slideOffsetMax,
  }) {
    super({
      position,
      imageSrc,
      framesMax,
    });
    this.velocity = velocity;
    this.size = size;
    this.slideOffsetMax = slideOffsetMax;
  }

  update() {
    this.draw();
    this.position.x += this.velocity;
    if (this.position.x + this.velocity <= this.slideOffsetMax) {
      this.position.x = 0;
    }
  }
}
