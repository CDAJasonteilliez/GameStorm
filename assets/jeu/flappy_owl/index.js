const canvas = document.getElementById("canvasgame");
const c = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

function drawimage() {
  c.drawImage(image, 0, 0);
}
image = new Image();
image.load = drawimage();
image.src = "jeu/flappy_owl/Static/IMG/flappy_owl.jpg";

let id = document.getElementById("passid").value;
let game_id = document.getElementById("passgameid").value;

const COLLISION_MAGRE = 10;
const gravity = 0.2;
let start = false;
let obstacleList = [];
const obstacleWait = 70;
let framesCompteur = 0;
let scores = 0;

const background = new Background({
  position: {
    x: 0,
    y: 0,
  },
  size: {
    x: 0,
    y: 0,
  },
  imageSrc: "./jeu/flappy_owl/Static/IMG/wallpaper.png",
  velocity: -1,
  slideOffsetMax: -1601,
});

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  size: {
    width: 39,
    height: 41,
  },
  imageSrc: "./jeu/flappy_owl/Static/IMG/player_owl.png",
  framesMax: 4,
});

function animate() {
  if (start === false) {
    reset();
  }
  if (start === true) {
    window.requestAnimationFrame(animate);

    if (framesCompteur === obstacleWait) {
      create_obstacles();
      framesCompteur = 0;
    }

    obstacleList.forEach((obstacle) => {
      if (
        collision({
          player: player,
          wall: obstacle,
        })
      ) {
        sendscore(scores, game_id, id);
        start = false;
        startToggle();
      }
    });

    if (
      player.position.y <= 0 ||
      player.position.y + player.size.height >= canvas.height
    ) {
      sendscore(scores, game_id, id);
      start = false;
      startToggle();
    }

    background.update();
    player.update();

    obstacleList.forEach((obstacle) => {
      if (
        obstacle.position.x + obstacle.size.width - obstacle.velocity >
          player.position.x &&
        obstacle.position.x + obstacle.size.width < player.position.x &&
        obstacle.position.y < 0
      ) {
        inscreaseScore();
      }
      obstacle.update();
      if (obstacle.position.x < -obstacle.size.width) {
        obstacle.delete();
      }
    });
    framesCompteur++;
  }
}
animate();

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault();
    player.velocity = -7;
  }
});

const buttonStart = document.querySelector("#start");
buttonStart.addEventListener("click", () => {
  start = true;
  startToggle();
  animate();
});
