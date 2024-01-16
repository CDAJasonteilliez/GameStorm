const canvas = document.getElementById("canvasgame");
const c = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

function drawimage() {
  c.drawImage(image, 0, 0);
}
image = new Image();
image.onload = drawimage();
image.src = "jeu/Pong/static/img/pong.jpg";

let id = document.getElementById("passid").value;
let game_id = document.getElementById("passgameid").value;

const WALL_SIZE = 13;
const PLAYER_WIDTH = 24;
const PLAYER_HEIGTH = 99;
const BALL_SIZE = 25;
const BALL_ACCELERATION_FRAME_MAX = 800;
const PLAYER_SPEED_MULTIPLIER = 3;

let start = false;
let ball_speed = 0;
let ball_acceleration_frame_elapse = 0;
let lastKey_player1 = undefined;
let lastKey_player2 = undefined;
let score = 0;
let mode_deux_joueurs = false;
let scores = 0;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./jeu/Pong/static/img/background.png",
  framesMax: 1,
});
const wall1 = new Wall({
  position: {
    x: 0,
    y: 0,
  },
  size: {
    x: canvas.width,
    y: WALL_SIZE,
  },
  imageSrc: "./jeu/Pong/static/img/floor_up.png",
  framesMax: 1,
});
const wall2 = new Wall({
  position: {
    x: 0,
    y: canvas.height - WALL_SIZE,
  },
  size: {
    x: canvas.width,
    y: 10,
  },
  imageSrc: "./jeu/Pong/static/img/floor_bottom.png",
  framesMax: 1,
});
const ball = new Ball({
  position: {
    x: (canvas.width - BALL_SIZE) / 2,
    y: (canvas.height - BALL_SIZE) / 2,
  },
  size: {
    x: 25,
    y: 25,
  },
  velocity: {
    x: -1,
    y: start_ball_random_direction(),
  },
  imageSrc: "./jeu/Pong/static/img/ball.png",
  framesMax: 1,
});
const player1 = new Player({
  size: {
    x: PLAYER_WIDTH,
    y: PLAYER_HEIGTH,
  },
  position: {
    x: PLAYER_WIDTH,
    y: (canvas.height - PLAYER_HEIGTH) / 2,
  },

  imageSrc: "./jeu/Pong/static/img/pong.png",
  framesMax: 1,
});
const player2 = new Player({
  size: {
    x: PLAYER_WIDTH,
    y: PLAYER_HEIGTH,
  },
  position: {
    x: canvas.width - PLAYER_WIDTH * 2,
    y: (canvas.height - PLAYER_HEIGTH) / 2,
  },

  imageSrc: "./jeu/Pong/static/img/pong.png",
  framesMax: 1,
});

const keys = {
  z: { pressed: false },
  s: { pressed: false },
  Space: { pressed: false },
};

const keys2 = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  Enter: { pressed: false },
};

function animate() {
  if (start === false) {
    reset();
  }
  if (start === true) {
    window.requestAnimationFrame(animate);

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (mode_deux_joueurs === false) {
      player_keys_gestion({ player: player1 });
      player_keys_gestion({ player: player2 });
    } else {
      player_keys_gestion({ player: player1 });
      player_keys_gestion2({ player: player2 });
    }

    player_walls_collision({ player: player1, wall1: wall1, wall2: wall2 });
    player_walls_collision({ player: player2, wall1: wall1, wall2: wall2 });

    if (
      collission_ball_wall({ ball: ball, wall: wall1 }) ||
      collission_ball_wall({ ball: ball, wall: wall2 })
    ) {
      ball.velocity.y = -ball.velocity.y;
    }

    if (collision_ball_player({ ball: ball, player: player1 })) {
      gestion_collision_ball_player1({ ball: ball, player: player1 });
    }
    if (collision_ball_player({ ball: ball, player: player2 })) {
      gestion_collision_ball_player2({ ball: ball, player: player2 });
    }

    ball.velocity = ball_vector_normalize_speed({
      velocity: ball.velocity,
      speed: ball_speed,
    });

    background.draw();
    wall1.update();
    wall2.update();
    player1.update();
    player2.update();
    ball.update();

    if (death()) {
      if (!mode_deux_joueurs) {
        sendscore(scores, game_id, id);
      }
      start = false;
      startToggle();
    }

    ball_acceleration_frame_elapse++;
    if (ball_acceleration_frame_elapse >= BALL_ACCELERATION_FRAME_MAX) {
      ball_speed++;
      ball_acceleration_frame_elapse = 0;
    }
  }
}
animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "z":
      event.preventDefault();
      keys.z.pressed = true;
      lastKey_player1 = "z";
      break;
    case "s":
      event.preventDefault();
      keys.s.pressed = true;
      lastKey_player1 = "s";
      break;
    case " ":
      event.preventDefault();
      keys.Space.pressed = true;
      break;
  }
  switch (event.key) {
    case "ArrowUp":
      event.preventDefault();
      keys2.ArrowUp.pressed = true;
      lastKey_player2 = "ArrowUp";
      break;
    case "ArrowDown":
      event.preventDefault();
      keys2.ArrowDown.pressed = true;
      lastKey_player2 = "ArrowDown";
      break;
    case "Enter":
      event.preventDefault();
      keys2.Enter.pressed = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "z":
      keys.z.pressed = false;
      if (lastKey_player1 == "z") {
        lastKey_player1 = " ";
      }
      break;
    case "s":
      keys.s.pressed = false;
      if (lastKey_player1 == "s") {
        lastKey_player1 = " ";
      }
      break;
    case " ":
      keys.Space.pressed = false;
      break;

    case "ArrowUp":
      keys2.ArrowUp.pressed = false;
      if (lastKey_player2 == "ArrowUp") {
        lastKey_player2 = " ";
      }
      break;
    case "ArrowDown":
      keys2.ArrowDown.pressed = false;
      if (lastKey_player2 == "ArrowDown") {
        lastKey_player2 = " ";
      }
      break;
    case "Enter":
      keys2.Enter.pressed = false;
      break;
  }
});

const buttonStart = document.querySelector("#start");
buttonStart.addEventListener("click", () => {
  start = true;
  startToggle();
  animate();
});

const buttonSwitchNbrJoueur = document.getElementById("nbrjoueurswitch");
buttonSwitchNbrJoueur.addEventListener("click", () => {
  nbrswitch();
});
