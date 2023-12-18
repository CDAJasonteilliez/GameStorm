import { Button } from "./js/classes";
import { mousePostion } from "./js/utils";

const GameTest1 = () => {
  console.log("Run GameTest1");
  const canvas = document.getElementById("canvasGame");
  const c = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 1024;

  let action = "menu";
  let mousePos = { x: 0, y: 0 };
  let score = 0;

  const playButton = new Button({
    c: c,
    position: {
      x: 362,
      y: 372,
    },
    size: {
      width: 300,
      height: 120,
    },
    text: "START",
    color1: "white",
    color2: "red",
    fontSize: "60px",
    lien: "game",
  });
  const optionButton = new Button({
    c: c,
    position: {
      x: 362,
      y: 532,
    },
    size: {
      width: 300,
      height: 120,
    },
    text: "OPTIONS",
    color1: "white",
    color2: "red",
    fontSize: "60px",
    lien: "options",
  });

  const menu = () => {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    playButton.update(mousePos);
    optionButton.update(mousePos);
  };

  const animate = () => {
    switch (action) {
      case "menu":
        menu();
        break;
      case "game":
        c.fillStyle = "green";
        c.fillRect(0, 0, canvas.width, canvas.height);
        break;
      case "options":
        c.fillStyle = "red";
        c.fillRect(0, 0, canvas.width, canvas.height);
        break;
      case "death":
        break;
      default:
        c.fillStyle = "white";
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
    window.requestAnimationFrame(animate);
  };
  animate();

  canvas.addEventListener("mousemove", (evt) => {
    let scale = Number(canvas.style.transform.match(/[+-]?\d+(\.\d+)?/)[0]);
    mousePos = mousePostion(canvas, evt, scale);
  });

  canvas.addEventListener("click", (evt) => {
    switch (action) {
      case "menu":
        if (playButton.over(mousePos)) {
          action = playButton.lien;
        }
        if (optionButton.over(mousePos)) {
          action = optionButton.lien;
        }
        break;
    }
  });
};

export default GameTest1;
