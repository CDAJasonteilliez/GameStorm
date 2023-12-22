export class Button {
  constructor({ c, position, size, text, color1, color2, fontSize, lien }) {
    this.c = c;
    this.position = position;
    this.size = size;
    this.text = text;
    this.color1 = color1;
    this.color2 = color2;
    this.fontSize = fontSize;
    this.lien = lien;
  }

  over(mousePos) {
    if (
      mousePos.x > this.position.x &&
      mousePos.x < this.position.x + this.size.width &&
      mousePos.y > this.position.y &&
      mousePos.y < this.position.y + this.size.height
    ) {
      return true;
    }
    return false;
  }

  draw(mousePos) {
    // Reset
    this.c.beginPath();

    // Color
    if (this.over(mousePos)) {
      this.c.strokeStyle = this.color2;
      this.c.fillStyle = this.color2;
    } else {
      this.c.strokeStyle = this.color1;
      this.c.fillStyle = this.color1;
    }

    // Rectangle
    this.c.lineWidth = 5;
    this.c.roundRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
      20
    );
    this.c.stroke();

    // Text
    this.c.textAlign = "center";
    this.c.textBaseline = "middle";
    this.c.font = `${this.fontSize} serif`;
    this.c.fillText(
      this.text,
      this.position.x + this.size.width / 2,
      this.position.y + this.size.height / 2
    );
  }

  update(mousePos) {
    this.draw(mousePos);
  }
}
