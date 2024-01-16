import { lazy, Suspense, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { getGameScore, postNewScore } from "../../../../api/score";

import styles from "./CanvasGame.module.scss";

const CanvasGame = () => {
    const params = useParams();
    const Canvas = lazy(() => import(`../../GameList/${params.link}/${params.link}.jsx`));
    const [gameData, setGameData, scoreData, setScoreData] = useOutletContext();
    const { userData } = useContext(AuthContext);

    const getScore = async () => {
        const response = await getGameScore(gameData.id);
        if (response.succes) {
            setScoreData(response.data);
        }
    } 

    const sendScore = async (score) => {
        const data = {
            score: score,
            idGame: gameData.id
        }

        if (!userData) {
            return;
        }

        let index = scoreData.findIndex((el) => el.utilisateur_id === userData.id)
        if (index < 0) {
            let response = await postNewScore(data);
            if(response.succes) {
                getScore();
            }
            return;
        }

        if (score > scoreData[index].score) {
            let response = await postNewScore(data);
            if(response.succes) {
                getScore();
            }
            return;
        }
    }



    return (
        <div>
            {gameData && (
                <div className={`${styles.description}`}>
                    <p>Description : {gameData.description}</p>
                </div>
            )}
            <div className={`${styles.gameContainer}`} id="gameContainer">
                <div className={`${styles.canvasContainer}`} id="canvasContainer">
                    <Suspense >
                        <Canvas sendScore={sendScore}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CanvasGame;