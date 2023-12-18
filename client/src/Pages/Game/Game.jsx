import { Link, useParams } from "react-router-dom";
import styles from "./Game.module.scss";
import { lazy, Suspense, useEffect } from "react";

const Game = () => {
    const params = useParams();
    console.log(params)
    const Canvas = lazy(() => import(`./GameList/${params.gameName}/${params.gameName}.jsx`));

    return (
        <div className={`${styles.game}`}>
            <h2>aaa</h2>
            <a href="#canvasGame" > game</a>
            <div className={`${styles.gameContainer}`} id="gameContainer">
                <Suspense >
                    <Canvas />
                </Suspense>
            </div>
            <p>blablabal</p>
        </div>
    )
};

export default Game;