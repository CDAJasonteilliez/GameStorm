import { useContext, useEffect, useRef } from "react";
import resize from "../../resize.js"
import useWindowSize from "../../../../hooks/useWindowSize.js";
import { AuthContext } from "../../../../Context/AuthContext.jsx";
import React from "react";

const GameTest5 = ({sendScore}) => {
    const size = useWindowSize();
    const ref = useRef();
    let wait = false;

    useEffect(() => {
        // Variable
        const canvas = document.getElementById("canvasGame");
        const c = canvas.getContext("2d");
        canvas.width = 1024;
        canvas.height = 1024;

        let mousePos = { x: 0, y: 0 };

        let action = "menu";
        let score = 1;

        //class
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

        // Utils
        const mousePostion = (canvas, evt, scale) => {
            let rect = canvas.getBoundingClientRect();
            return {
                x: (evt.clientX - rect.left) / scale,
                y: (evt.clientY - rect.top) / scale,
            };
        };

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

        // Jeu
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
        };
    
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
        };
    
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
        };

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
              case "game":
                if (scoreButton.over(mousePos)) {
                  score++;
                }
                if (deathButton.over(mousePos)) {
                  action = deathButton.lien;
                  if (!wait) {
                    sendScore(score);
                    wait = true;
                    setTimeout(() => {
                        wait = false
                    },1000);
                  }
                  
                }
                break;
              case "death":
                if (playAgainButton.over(mousePos)) {
                  action = playAgainButton.lien;
                  score = 1;
                }
                if (menuButton.over(mousePos)) {
                  action = menuButton.lien;
                  score = 1;
                }
            }      

        });

        return () => {
            cancelAnimationFrame(ref.current);
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

export default GameTest5;