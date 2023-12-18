import { useEffect } from "react";
import runGame from "./index.js";

const GameTest2 = () => {

    useEffect(()=> {
        runGame();
    },[]);

    return (
        <>
            <canvas id="canvasGame"></canvas>
        </>
    )
}

export default GameTest2;