import { Button } from "./js/classes";
import { mousePostion } from "./js/utils";

const GameTest1 = () => {
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
  const returnButton = new Button({
    c: c,
    position: {
      x: 800,
      y: 930,
    },
    size: {
      width: 200,
      height: 70,
    },
    text: "RETOUR",
    color1: "white",
    color2: "red",
    fontSize: "30px",
    lien: "menu",
  });
  const scoreButton = new Button({
    c: c,
    position: {
      x: 362,
      y: 372,
    },
    size: {
      width: 300,
      height: 120,
    },
    text: "SCORE +",
    color1: "white",
    color2: "red",
    fontSize: "60px",
    lien: null,
  }); 
  const deathButton = new Button({
    c: c,
    position: {
      x: 362,
      y: 532,
    },
    size: {
      width: 300,
      height: 120,
    },
    text: "DEATH",
    color1: "white",
    color2: "red",
    fontSize: "60px",
    lien: "death",
  }); 
  const playAgainButton = new Button({
    c: c,
    position: {
      x: 362,
      y: 372,
    },
    size: {
      width: 300,
      height: 120,
    },
    text: "RESTART",
    color1: "white",
    color2: "red",
    fontSize: "60px",
    lien: "game",
  }); 
  const menuButton = new Button({
    c: c,
    position: {
      x: 362,
      y: 532,
    },
    size: {
      width: 300,
      height: 120,
    },
    text: "MENU",
    color1: "white",
    color2: "red",
    fontSize: "60px",
    lien: "menu",
  });



  const menu = () => {
    c.fillStyle = "green";
    c.fillRect(0, 0, canvas.width, canvas.height);
    playButton.update(mousePos);
    optionButton.update(mousePos);
  };

  const options = () => {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    returnButton.update(mousePos);
  }

  const game = () => {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "white";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = `30px serif`;
    c.fillText(
      `SCORE : ${score}`,
      512, 200
    );

    scoreButton.update(mousePos);
    deathButton.update(mousePos);
  }

  const death = () => {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "white";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = `30px serif`;
    c.fillText(
      `Votre score est de ${score}.`,
      512, 200
    );

    playAgainButton.update(mousePos);
    menuButton.update(mousePos);
  }

  const animate = () => {
    switch (action) {
      case "menu":
        menu();
        break;
      case "game":
        game();
        break;
      case "options":
        options();
        break;
      case "death":
        death();
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
      case "options":
        if (returnButton.over(mousePos)) {
          action = returnButton.lien;
        }
        break;
      case "game":
        if (scoreButton.over(mousePos)) {
          score++;
        }
        if (deathButton.over(mousePos)) {
          action = deathButton.lien;
        }
        break;
      case "death":
        if (playAgainButton.over(mousePos)) {
          action = playAgainButton.lien;
          score = 0;
        }
        if (menuButton.over(mousePos)) {
          action = menuButton.lien;
          score = 0;
        }
    }
  });
};

export default GameTest1;
