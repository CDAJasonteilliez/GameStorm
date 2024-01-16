const canvas = document.getElementById("canvasgame");
const c = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

function drawimage() {
  c.drawImage(image, 0, 0);
}
image = new Image();
image.onload = drawimage();
image.src = "jeu/chickendrun/static/img/chickendrun.jpg";

let id = document.getElementById("passid").value;
let game_id = document.getElementById("passgameid").value;

const GRAVITY = 1.5;

let start = false;
let obstacleList = [];
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
  imageSrc: "./jeu/chickendrun/static/img/backgroundParallaxe.png",
  velocity: -1,
  slideOffsetMax: -1601,
});
const ground = new Background({
  position: {
    x: 0,
    y: 500,
  },
  size: {
    x: 0,
    y: 0,
  },
  imageSrc: "./jeu/chickendrun/static/img/ground.png",
  velocity: -8,
  slideOffsetMax: -65,
});
const player = new Player({
  position: {
    x: 50,
    y: 350,
  },
  size: {
    width: 45,
    height: 43,
  },
  imageSrc: "./jeu/chickendrun/static/img/player.png",
  framesMax: 3,
});

function animate() {
  if (start === false) {
    reset();
  }
  if (start === true) {
    window.requestAnimationFrame(animate);
    if (scores === 0) {
      inscreaseScore();
    }

    let obstacle = randomSpawn();
    if (obstacle != "rien") {
      obstacleList.unshift(generateObstacle(obstacle));
    }

    background.update();
    ground.update();
    player.update();

    obstacleList.forEach((obstacle) => {
      if (
        collision({
          r1: player,
          r2: obstacle,
        })
      ) {
        sendscore(scores, game_id, id);
        start = false;
        stopScore();
        startToggle();
      }
      obstacle.update();
    });

    obstacleList.forEach((obstacle, key) => {
      if (obstacle.position.x < -100) {
        obstacle.delete(key);
      }
    });
  }
}
animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      event.preventDefault();
      if (player.position.y + player.size.height >= canvas.height - 120 && player.jump == 2) {
        player.velocity.y = -30;
        player.jump -= 1;
      } else if (player.jump == 1) {
        player.velocity.y -= 15;
        player.jump -= 1;
      }
      break;
  }
});

const buttonStart = document.querySelector("#start");
buttonStart.addEventListener("click", () => {
  start = true;
  startToggle();
  animate();
});
