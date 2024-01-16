import { useEffect, useState } from "react";
import { GameContext } from "../Context/GameContext.jsx";
import { getActivesGames } from "../api/game.js";


const GameProvider = ({children}) => {
    const [gamesData, setGamesData] = useState(null);

    useEffect(() => {
        const getGames = async() => {
            const response = await getActivesGames();
            if (response.succes) {
                setGamesData(response.data)
            }
        }
        getGames();
    }, [])

    return (
        <GameContext.Provider
            value={{
                gamesData,
                setGamesData
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;