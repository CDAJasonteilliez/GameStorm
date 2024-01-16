class Sprite {
    constructor({position, imageSrc, framesMax = 1}) {
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


class Ball extends Sprite {

    constructor({position, size, imageSrc, framesMax , velocity}) {
        super ({
            position,
            imageSrc,
            framesMax,
        });
        this.size = size;
        this.velocity = velocity;
    }

    update() { 
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }
}


class Wall extends Sprite {
    constructor({position, size, imageSrc, framesMax}) {
        super ({
            position,
            imageSrc,
            framesMax,
        });
        this.size = size;
    }

    update() { 
        this.draw();
    }
}


class Player extends Sprite {
    constructor({position, size, imageSrc, framesMax}) {
        super ({
            position,
            imageSrc,
            framesMax,
        });
        this.size = size;
        this.velocity = 0;
    }

    update() {
        this.position.y += this.velocity;
        this.draw();
    }
}

