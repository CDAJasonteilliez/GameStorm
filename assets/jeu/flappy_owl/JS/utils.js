function randomHeight() {
  return Math.floor(Math.random() * 250 + 100);
}
function randomGap() {
  return Math.floor(Math.random() * 70 + 120);
}

function collision({ player, wall }) {
  return (
    wall.position.x + COLLISION_MAGRE < player.position.x + player.size.width &&
    wall.position.x + wall.size.width - COLLISION_MAGRE > player.position.x &&
    wall.position.y + COLLISION_MAGRE <
      player.position.y + player.size.height &&
    wall.position.y + wall.size.height - COLLISION_MAGRE > player.position.y
  );
}

function startToggle() {
  const buttonStart = document.querySelector("#start");
  if (start === true) {
    buttonStart.classList.remove("active");
  }
  if (start === false) {
    buttonStart.classList.add("active");
    scores = 0;
    document.querySelector("#score").innerHTML = "Score : " + scores;
  }
}

function create_obstacles() {
  let height = randomHeight();
  let gap = randomGap();
  obstacleList.unshift(
    new Obstacle({
      size: {
        width: 75,
        height: 500,
      },
      position: {
        x: canvas.width,
        y: height - 500,
      },
      imageSrc: "jeu/flappy_owl/Static/IMG/colonne_top.png",
    })
  );
  obstacleList.unshift(
    new Obstacle({
      size: {
        width: 75,
        height: 500,
      },
      position: {
        x: canvas.width,
        y: height + gap,
      },
      imageSrc: "jeu/flappy_owl/Static/IMG/colonne_bottom.png",
    })
  );
}

function inscreaseScore() {
  scores++;
  document.querySelector("#score").innerHTML = "Score : " + scores;
}

function reset() {
  c.drawImage(image,0,0);
  obstacleList = [];
  player.position = {
    x: 100,
    y: 300,
  };
  player.velocity = 0;
}
