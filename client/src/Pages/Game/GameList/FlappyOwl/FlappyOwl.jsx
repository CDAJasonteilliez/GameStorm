import { useEffect, useRef } from "react";
import resize from "../../resize.js"
import useWindowSize from "../../../../hooks/useWindowSize.js";
import React from 'react'

const FlappyOwl = ({sendScore}) => {
    const size = useWindowSize();
    const ref = useRef()

    useEffect(()=> {
        // Variable
        const canvas = document.getElementById("canvasGame");
        const c = canvas.getContext("2d");
        canvas.width = 1024;
        canvas.height = 1024;

        let mousePos = { x: 0, y: 0 };

        let action = "menu";
        let score = 1;
        let obstacle = null;
        let obstacleList = [];
        const obstacleWait = 70;
        let framesCompteur = 0;

        const GRAVITY = 0.2;
        const COLLISION_MAGRE = 10;

        let image = new Image();
        image.src = "/src/Pages/Game/GameList/FlappyOwl/assets/flappy_owl.jpg";

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

        class Player extends Sprite{
            constructor({position, size, imageSrc, framesMax})
            {
                super({
                    position,
                    imageSrc,
                    framesMax,
                });
                this.size = size;
                this.velocity = 0;
            }
        
            update(){
                this.velocity += GRAVITY;
                this.position.y += this.velocity;
                this.draw();
            }
        }

        class Background extends Sprite {
            constructor({
                position,
                velocity,
                size,
                imageSrc,
                framesMax,
                slideOffsetMax,
            }) {
                super({
                    position,
                    imageSrc,
                    framesMax,
                });
                this.velocity = velocity;
                this.size = size;
                this.slideOffsetMax = slideOffsetMax;
            }
          
            update() {
                this.draw();
                this.position.x += this.velocity;
                if (this.position.x + this.velocity <= this.slideOffsetMax) {
                    this.position.x = 0;
                }
            }
        }

        class Obstacle extends Sprite{
            constructor({position, size, imageSrc, framesMax})
            {
                super({
                    position,
                    imageSrc,
                    framesMax,
                });
                    this.size = size;
                    this.velocity = -10;
            }
        
            update(){
                this.position.x += this.velocity;
                this.draw();
            }
        
            delete(){
                obstacleList.pop();
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

        function inscreaseScore() {
            score++;
        }

        function randomHeight() {
            return Math.floor(Math.random() * 450 + 200);
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

        function create_obstacles() {
            let height = randomHeight();
            let gap = randomGap();
            obstacleList.unshift(
              new Obstacle({
                size: {
                  width: 75,
                  height: 921,
                },
                position: {
                  x: canvas.width,
                  y: height - 921,
                },
                imageSrc: "/src/Pages/Game/GameList/FlappyOwl/assets/colonne_top.png",
              })
            );
            obstacleList.unshift(
              new Obstacle({
                size: {
                  width: 75,
                  height: 921,
                },
                position: {
                  x: canvas.width,
                  y: height + gap,
                },
                imageSrc: "/src/Pages/Game/GameList/FlappyOwl/assets/colonne_bottom.png",
              })
            );
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
        const background = new Background({
            position: {
              x: 0,
              y: 0,
            },
            size: {
              x: 0,
              y: 0,
            },
            imageSrc: "/src/Pages/Game/GameList/FlappyOwl/assets/wallpaper.png",
            velocity: -1,
            slideOffsetMax: -2740,
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
            imageSrc: "/src/Pages/Game/GameList/FlappyOwl/assets/player_owl.png",
            framesMax: 4,
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
                    action = "death";
                    sendScore(score);
                    return;
                }
            });
          
            if (
                player.position.y <= 0 ||
                player.position.y + player.size.height >= canvas.height
            ) {
                action = "death";
                sendScore(score);
                return;
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

            c.fillStyle = "white";
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.font = `30px serif`;
            c.fillText(
                `SCORE : ${score}`,
                80, 20
            );
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
                        action = playAgainButton.lien;
                        score = 0;
                        obstacleList = [];
                    }
                    if (menuButton.over(mousePos)) {
                        action = menuButton.lien;
                        score = 0;
                        obstacleList = [];
                    }
                    break;
            }
        });

        const handleClick = (event) => {
            if (event.key === " ") {
                event.preventDefault();
                player.velocity = -7;
            }
        }
        window.addEventListener("keydown", handleClick);

        return () => {
            cancelAnimationFrame(ref.current);
            window.removeEventListener("keydown", handleClick);
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

export default FlappyOwl;