function randomSpawn() {
  let r = Math.floor(Math.random() * 250 + 1);
  switch (r) {
    case 1:
      return "bloc1";
      break;
    case 2:
      return "bloc2";
      break;
    case 3:
      return "bloc3";
      break;
  }
  return "rien";
}

function generateObstacle(obstacleType) {
  switch (obstacleType) {
    case "bloc1":
      return new Obstacle({
        position: {
          x: 800,
          y: 450,
        },
        size: {
          width: 85,
          height: 50,
        },
        imageSrc: "jeu/chickendrun/static/img/stone.png",
        velocity: -8,
      });

      break;
    case "bloc2":
      return new Obstacle({
        position: {
          x: 800,
          y: 400,
        },
        size: {
          width: 40,
          height: 100,
        },
        imageSrc: "jeu/chickendrun/static/img/cactus.png",
        velocity: -8,
      });
      break;
    case "bloc3":
      return new Obstacle({
        position: {
          x: 800,
          y: 150,
        },
        size: {
          width: 48,
          height: 46,
        },
        imageSrc: "jeu/chickendrun/static/img/spriteOiseau.png",
        velocity: -12,
        framesMax: 4,
      });
      break;
  }
}

const COLLISION_MAGRE = 10;
function collision({ r1, r2 }) {
  return (
    r1.position.x < r2.position.x + r2.size.width - COLLISION_MAGRE &&
    r1.position.x + r1.size.width > r2.position.x + COLLISION_MAGRE &&
    r1.position.y + r1.size.height > r2.position.y + COLLISION_MAGRE &&
    r1.position.y < r2.position.y + r2.size.height - COLLISION_MAGRE
  );
}


let scoreId;
function inscreaseScore() {
  scoreId = setTimeout(inscreaseScore, 1000);
  scores++;
  document.querySelector("#score").innerHTML = "Score : " + scores;
}

function stopScore() {
  clearTimeout(scoreId);
}

function startToggle() {
  const buttonStart = document.querySelector("#start");
  if (start === true) {
    buttonStart.classList.remove("active");
  }
  if (start === false) {
    buttonStart.classList.add("active");
    scores = 0;
  }
}

function reset() {
  c.drawImage(image,0,0);
  obstacleList = [];
  scores = 0;
  player.jump = 2;
}
