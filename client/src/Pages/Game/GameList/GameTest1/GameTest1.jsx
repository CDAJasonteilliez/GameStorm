import { useEffect } from "react";
import runGame from "./index.js";
import './js/classes.js'
import resize from "../../resize.js"
import useWindowSize from "../../../../hooks/useWindowSize.js";

const GameTest1 = () => {
    const size = useWindowSize();

    useEffect(()=> {
        runGame();
    },[]);

    useEffect(()=> {
        resize();
    },[size]);

    return (
        <>
            <canvas id="canvasGame"></canvas>
        </>
    )
}

export default GameTest1;