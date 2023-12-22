import { Link, useParams } from "react-router-dom";
import styles from "./Game.module.scss";
import { lazy, Suspense, useEffect } from "react";

const Game = () => {
    const params = useParams();
    console.log(params)
    const Canvas = lazy(() => import(`./GameList/${params.gameName}/${params.gameName}.jsx`));

    return (
        <>
            <h2>aaa</h2>
            <a href="#canvasContainer" > game</a>
            <div>
                <div className={`${styles.gameContainer}`} id="gameContainer">
                    <div className={`${styles.canvasContainer}`} id="canvasContainer">
                        <Suspense >
                            <Canvas />
                        </Suspense>
                    </div>
                </div>
            </div>
            <p>blablabal</p>
        </>
    )
};

export default Game;