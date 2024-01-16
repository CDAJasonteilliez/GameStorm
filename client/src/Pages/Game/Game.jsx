import { useParams, Outlet, NavLink } from "react-router-dom";
import styles from "./Game.module.scss";
import { Suspense, useContext, useEffect, useState } from "react";
import { GameContext } from "../../Context/gameContext";
import { getGameScore } from "../../api/score";

const Game = () => {
    const { link } = useParams();
    const { gamesData } = useContext(GameContext);
    const [gameData, setGameData] = useState(null);
    const [scoreData, setScoreData] = useState(null);

    useEffect(() => {
        if(gamesData) {
            setGameData(gamesData.filter((el) => el.link === link)[0])
        }
    },[gamesData])

    const getScore = async () => {
        const response = await getGameScore(gameData.id);
        if (response.succes) {
            setScoreData(response.data);
        }
    } 

    useEffect(() => {
        if (gameData != null) {
            getScore();
        }
    },[gameData])

    return (
        <>
            {gameData && (
                <div className={`${styles.titre}`}>
                    <h2>{gameData.name}</h2>
                </div>
            )}

            <ul  className={`${styles.ul}`}>
                <li>
                    <div>
                        <div>
                            <NavLink to='' >Game</NavLink>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <NavLink to='leaderboard' >Leaderboard</NavLink>
                        </div>
                    </div>
                </li>
            </ul>
            
            {scoreData && 
                <Suspense>
                    <Outlet context={[gameData, setGameData, scoreData, setScoreData]}/>
                </Suspense>
            }
        </>
    )
};

export default Game;