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


function start_ball_random_direction() {
  return Math.random() * 2 - 1;
}


function random_rebond(x,y) {
  if (x > 0 && y > 0) {
    return  {x: -(Math.random() + 0.3), y : Math.random()}; 
  }
  if (x > 0 && y < 0) {
    return  {x: -(Math.random() + 0.3), y : -Math.random()}; 
  }
  if (x < 0 && y > 0) {
    return  {x: (Math.random() + 0.3), y : Math.random()}; 
  }
  if (x < 0 && y < 0) {
    return  {x: (Math.random() + 0.3), y : -Math.random()}; 
  }
}


function collission_ball_wall({ ball, wall }) {
  return (
    ball.position.y + ball.size.y + ball.velocity.y > wall.position.y &&
    ball.position.y + ball.velocity.y < wall.position.y + wall.size.y
  );
}


function collision_ball_player({ball, player}) {
  return (ball.position.x + ball.velocity.x < player.position.x + player.size.x &&
          ball.position.x + ball.size.x + ball.velocity.x > player.position.x &&
          ball.position.y + ball.size.y + ball.velocity.y > player.position.y &&
          ball.position.y + ball.velocity.y < player.position.y + player.size.y)
}


function player_walls_collision({player,wall1,wall2}) {
  if((player.position.y + player.velocity < wall1.size.y) || (player.position.y + player.size.y + player.velocity > wall2.position.y)){
    player.velocity=0;
  }
}


function gestion_collision_ball_player1({ ball, player }) {
  if (
    ball.position.x + ball.velocity.x <
    player.position.x + player.size.x + ball.velocity.x
  ) {
    if (ball.position.y < player.position.y) {
      ball.position.y = player.position.y - ball.size.y;
      ball.velocity.y = -Math.abs(ball.velocity.y);
    } else {
      ball.position.y = player.position.y + player.size.y;
      ball.velocity.y = Math.abs(ball.velocity.y);
    }
  } else {
    ball.position.x = player.position.x + player.size.x;
    ball.velocity = random_rebond(ball.velocity.x, ball.velocity.y);
    if(!mode_deux_joueurs){inscreaseScore();}
  }
}


function gestion_collision_ball_player2({ ball, player }) {
  if (
    ball.position.x + ball.velocity.x + ball.size.x >
    player.position.x + ball.velocity.x
  ) {
    if (ball.position.y < player.position.y) {
      ball.position.y = player.position.y - ball.size.y;
      ball.velocity.y = -Math.abs(ball.velocity.y);
    } else {
      ball.position.y = player.position.y + player.size.y;
      ball.velocity.y = Math.abs(ball.velocity.y);
    }
  } else {
    ball.position.x = player.position.x - ball.size.x;
    ball.velocity = random_rebond(ball.velocity.x, ball.velocity.y);
    if(!mode_deux_joueurs){inscreaseScore();}
    
  }
}

function inscreaseScore() {
  scores++;
  document.querySelector("#score").innerHTML = "Score : " + scores;
}

function ball_vector_normalize_speed({ velocity, speed }) {
  x =
    (velocity.x /
      Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)) *
    speed;
  y =
    (velocity.y /
      Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)) *
    speed;
  return { x: x, y: y };
}

function death() {
  return (ball.position.x + ball.size.x < 0 || ball.position.x > canvas.width);
}


function player_keys_gestion({player}) {
  player.velocity = 0;
  if (
    (keys.z.pressed && lastKey_player1 === "z") ||
    (keys.z.pressed && lastKey_player1 === " ")
  ) {
    player.velocity = -5;
    if(keys.Space.pressed){
      player.velocity *= PLAYER_SPEED_MULTIPLIER;
    }
  } else if (
    (keys.s.pressed && lastKey_player1 === "s") ||
    (keys.s.pressed && lastKey_player1 === " ")
  ) {
    player.velocity = 5;
    if(keys.Space.pressed){
      player.velocity *= PLAYER_SPEED_MULTIPLIER;
    }
  }
}

function player_keys_gestion2({player}) {
  player.velocity = 0;
  if (
    (keys2.ArrowUp.pressed && lastKey_player2 === "ArrowUp") ||
    (keys2.ArrowUp.pressed && lastKey_player2 === " ")
  ) {
    player.velocity = -5;
    if(keys2.Enter.pressed){
      player.velocity *= PLAYER_SPEED_MULTIPLIER;
    }
  } else if (
    (keys2.ArrowDown.pressed && lastKey_player2 === "ArrowDown") ||
    (keys2.ArrowDown.pressed && lastKey_player2 === " ")
  ) {
    player.velocity = 5;
    if(keys2.Enter.pressed){
      player.velocity *= PLAYER_SPEED_MULTIPLIER;
    }
  }
}


function reset() {
  c.drawImage(image,0,0);
  player1.position.y = (canvas.height - PLAYER_HEIGTH) /2;
  player2.position.y = (canvas.height - PLAYER_HEIGTH) /2;
  ball.position = {
    x: (canvas.width - BALL_SIZE) / 2,
    y: (canvas.height - BALL_SIZE) / 2,
  }
  ball.velocity = {
    x: -1,
    y: start_ball_random_direction(),
  },
  scores = 0;
  ball_speed = 4;
  ball_acceleration_frame_elapse = 0;
}


function nbrswitch(){
  const joueuraffichage = document.getElementById('nbrjoueuraffiche');
  start = false;
  startToggle();
  if(mode_deux_joueurs) {
    mode_deux_joueurs = false;
    joueuraffichage.innerHTML = "Un joueur";
  } else {
    mode_deux_joueurs = true;
    joueuraffichage.innerHTML = "Deux joueurs";
  }
}