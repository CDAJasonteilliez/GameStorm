import { useEffect, useRef } from "react";
import resize from "../../resize.js"
import useWindowSize from "../../../../hooks/useWindowSize.js";
import React from 'react'

const Pong = ({sendScore}) => {
    const size = useWindowSize();
    const ref = useRef()

    useEffect(()=> {
        // Variable
        const canvas = document.getElementById("canvasGame");
        const c = canvas.getContext("2d");
        canvas.width = 1024;
        canvas.height = 1024;

        let mousePos = { x: 0, y: 0 };

        const WALL_SIZE = 13;
        const PLAYER_WIDTH = 24;
        const PLAYER_HEIGTH = 99;
        const BALL_SIZE = 25;
        const BALL_ACCELERATION_FRAME_MAX = 800;
        const PLAYER_SPEED_MULTIPLIER = 3;

        let action = "menu";
        let score = 1;
        let ball_speed = 1;
        let ball_acceleration_frame_elapse = 0;
        let lastKey_player1 = undefined;
        let mode_deux_joueurs = false;

        let image = new Image();
        image.src = "/src/Pages/Game/GameList/Pong/assets/pong.jpg";

        const keys = {
            z: { pressed: false },
            s: { pressed: false },
            Space: { pressed: false },
        };

        // Class
        class Button {
            constructor({ position, size, text, color1, color2, fontSize, lien }) {

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
            c.beginPath();
        
            // Color
            if (this.over(mousePos)) {
                c.strokeStyle = this.color2;
                c.fillStyle = this.color2;
            } else {
                c.strokeStyle = this.color1;
                c.fillStyle = this.color1;
            }
        
            // Rectangle
            c.lineWidth = 5;
            c.roundRect(
                this.position.x,
                this.position.y,
                this.size.width,
                this.size.height,
                20
            );
            c.stroke();
        
            // Text
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.font = `${this.fontSize} serif`;
            c.fillText(
                this.text,
                this.position.x + this.size.width / 2,
                this.position.y + this.size.height / 2
            );
            }
        
            update(mousePos) {
            this.draw(mousePos);
            }
        }

        class Sprite {
            constructor({ position, imageSrc, framesMax = 1 }) {
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

        // Utils
        const mousePostion = (canvas, evt, scale) => {
            let rect = canvas.getBoundingClientRect();
            return {
                x: (evt.clientX - rect.left) / scale,
                y: (evt.clientY - rect.top) / scale,
            };
        };

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
            score++;
        }

        function ball_vector_normalize_speed({ velocity, speed }) {
            let x =
              (velocity.x /
                Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)) *
              speed;
            let y =
              (velocity.y /
                Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)) *
              speed;
            return { x: x, y: y };
        }

        function fail() {
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
            score = 1;
            ball_speed = 4;
            ball_acceleration_frame_elapse = 0;
        }       

        // Création des élements
        const playButton = new Button({
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
        const playAgainButton = new Button({
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
        const background = new Sprite({
            position: {
              x: 0,
              y: 0,
            },
            imageSrc: "/src/Pages/Game/GameList/Pong/assets/background.png",
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
            imageSrc: "/src/Pages/Game/GameList/Pong/assets/floor_up.png",
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
            imageSrc: "/src/Pages/Game/GameList/Pong/assets/floor_bottom.png",
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
            imageSrc: "/src/Pages/Game/GameList/Pong/assets/ball.png",
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
          
            imageSrc: "/src/Pages/Game/GameList/Pong/assets/pong.png",
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
          
            imageSrc: "/src/Pages/Game/GameList/Pong/assets/pong.png",
            framesMax: 1,
        });
        
        // Jeu
        const menu = () => {
            c.fillStyle = "black";
            c.fillRect(0, 0, canvas.width, canvas.height);
            c.drawImage(image,0,0,1024,1024);
            playButton.update(mousePos);
            optionButton.update(mousePos);
        };
        const options = () => {
            c.fillStyle = "grey";
            c.fillRect(0, 0, canvas.width, canvas.height);
            returnButton.update(mousePos);
        }
        const game = () => {
            c.fillStyle = "black";
            c.fillRect(0, 0, canvas.width, canvas.height);
        
            player_keys_gestion({ player: player1 });
            player_keys_gestion({ player: player2 });

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
        
            if (fail()) {
                action = "death";
                sendScore(score);
                return;
            }
        
            ball_acceleration_frame_elapse++;
            if (ball_acceleration_frame_elapse >= BALL_ACCELERATION_FRAME_MAX) {
              ball_speed++;
              ball_acceleration_frame_elapse = 0;
            }
        }
        const death = () => {
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
    
        // Boucle de jeu
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
            ref.current = requestAnimationFrame(animate);
        };
        animate();
        
        // Action
        canvas.addEventListener("mousemove", (evt) => {
            let scale = Number(canvas.style.transform.match(/[+-]?\d+(\.\d+)?/)[0]);
            mousePos = mousePostion(canvas, evt, scale);
        });
        canvas.addEventListener("click", (evt) => {
            switch (action) {
                case "menu":
                    if (playButton.over(mousePos)) {
                        reset();
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
                case "death":
                    if (playAgainButton.over(mousePos)) {
                        reset();
                        score = 0;
                        action = playAgainButton.lien;
                    }
                    if (menuButton.over(mousePos)) {
                        action = menuButton.lien;
                        score = 0;
                        obstacleList = [];
                    }
                    break;
            }
        });
        const handleKeyDown = (event) => {
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
        }
        const handleKeyUp = (event) => {
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
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            cancelAnimationFrame(ref.current);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    },[]);

    useEffect(()=> {
        resize();
    },[size]);

    return (
        <React.StrictMode>
            <canvas id="canvasGame"></canvas>
        </React.StrictMode>

    )
}

export default Pong;