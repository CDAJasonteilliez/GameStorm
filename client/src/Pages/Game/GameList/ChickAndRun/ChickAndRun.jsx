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
        let score = 0;
        let scoreTimer = null;
        let obstacle = null;
        let obstacleList = [];

        const GRAVITY = 1.5;
        const COLLISION_MAGRE = 10;

        let image = new Image();
        image.src = "/src/Pages/Game/GameList/ChickAndRun/assets/ChickAndRun.png";

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

        class Obstacle extends Sprite {
            constructor({ position, size, imageSrc, velocity, framesMax }) {
                super({
                    position,
                    imageSrc,
                    framesMax,
                });
                this.velocity = velocity;
                this.size = size;
            }
          
            delete(key) {
                obstacleList.splice(key, 1);
            }
          
            update() {
                this.draw();
                this.position.x += this.velocity;
            }
        }

        class Player extends Sprite {
            constructor({ position, size, imageSrc, framesMax }) {
                super({
                    position,
                    imageSrc,
                    framesMax,
                });
                this.velocity = { x: 0, y: 0 };
                this.size = size;
                this.jump = 2;
            }
          
            update() {
                this.position.y += this.velocity.y;
            
                if (
                    this.position.y + this.size.height + this.velocity.y >=
                    canvas.height - 153
                ) {
                    this.velocity.y = 0;
                    this.jump = 2;
                } else {
                    this.velocity.y += GRAVITY;
                }
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

        // Utils
        const mousePostion = (canvas, evt, scale) => {
            let rect = canvas.getBoundingClientRect();
            return {
                x: (evt.clientX - rect.left) / scale,
                y: (evt.clientY - rect.top) / scale,
            };
        };

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

        function inscreaseScore() {
            score++;
            scoreTimer = setTimeout(inscreaseScore, 1000);
        }

        function stopScore() {
            clearTimeout(scoreTimer);
        }

        function generateObstacle(obstacleType) {
            switch (obstacleType) {
                case "bloc1":
                    return new Obstacle({
                    position: {
                        x: 1075,
                        y: 820,
                    },
                    size: {
                        width: 85,
                        height: 50,
                    },
                    imageSrc: "/src/Pages/Game/GameList/ChickAndRun/assets/stone.png",
                    velocity: -8,
                    });
            
                    break;
                case "bloc2":
                    return new Obstacle({
                    position: {
                        x: 1075,
                        y: 770,
                    },
                    size: {
                        width: 40,
                        height: 100,
                    },
                    imageSrc: "/src/Pages/Game/GameList/ChickAndRun/assets/cactus.png",
                    velocity: -8,
                    });
                    break;
                case "bloc3":
                    return new Obstacle({
                    position: {
                        x: 1075,
                        y: 450,
                    },
                    size: {
                        width: 48,
                        height: 46,
                    },
                    imageSrc: "/src/Pages/Game/GameList/ChickAndRun/assets/spriteOiseau.png",
                    velocity: -12,
                    framesMax: 4,
                    });
                    break;
            }
        }

        function collision({ r1, r2 }) {
            return (
              r1.position.x < r2.position.x + r2.size.width - COLLISION_MAGRE &&
              r1.position.x + r1.size.width > r2.position.x + COLLISION_MAGRE &&
              r1.position.y + r1.size.height > r2.position.y + COLLISION_MAGRE &&
              r1.position.y < r2.position.y + r2.size.height - COLLISION_MAGRE
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
        const player = new Player({
            position: {
                x:100,
                y:350,
            },
            size: {
                width: 45,
                height: 43,
            },
            imageSrc: "/src/Pages/Game/GameList/ChickAndRun/assets/player.png",
            framesMax: 3,
        })
        const background = new Background({
            position: {
                x: 0,
                y: 0,
            },
            size: {
                x: 0,
                y: 0,
            },
            imageSrc: "/src/Pages/Game/GameList/ChickAndRun/assets/backgroundParallaxe.png",
            velocity: -1,
            slideOffsetMax: -2740,
        });
        const ground = new Background({
            position: {
              x: 0,
              y: 870,
            },
            size: {
              x: 0,
              y: 0,
            },
            imageSrc: "/src/Pages/Game/GameList/ChickAndRun/assets/ground.png",
            velocity: -8,
            slideOffsetMax: -65,
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

            if (score === 0) {
                inscreaseScore();
            }

            obstacle = randomSpawn()
            if (obstacle != "rien") {
                obstacleList.unshift(generateObstacle(obstacle));
            }

            background.update();
            ground.update();
            player.update();

            obstacleList.forEach((obstacle) => {
                obstacle.update();
                if (
                    collision({
                      r1: player,
                      r2: obstacle,
                    })
                ) {
                    action = "death";
                    sendScore(score);
                    return;
                }
            });

            obstacleList.forEach((obstacle, key) => {
                if (obstacle.position.x < -100) {
                  obstacle.delete(key);
                }
            });

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

            stopScore();
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
            switch (event.key) {
                case " ":
                    event.preventDefault();
                    if (player.position.y + player.size.height >= canvas.height - 153 && player.jump == 2) {
                        player.velocity.y = -35;
                        player.jump -= 1;
                    } else if (player.jump == 1) {
                        player.velocity.y -= 20;
                        player.jump -= 1;
                    }
                    break;
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