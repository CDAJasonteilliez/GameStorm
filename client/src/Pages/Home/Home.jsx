import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../Context/gameContext";
import loupe from "./assets/img/loupe.png";

import styles from "./home.module.scss";

const Home = () => {
    const [filter, setFilter] = useState("");
    const { gamesData, setGamesData } = useContext(GameContext);

    const handleInput = (e) => {
        const search = e.target.value;
        setFilter(search.trim().toLowerCase());
    }

    return (
        <>
            <h1 className={`${styles.titre}`}>Game Storm</h1>
            <div className={`${styles.search}`}>
                <div>
                    <img src={loupe} alt="search icon" />
                    <input onInput={handleInput} type="text" placeholder="Search..." />
                </div>
            </div>
            <div className={`${styles.listeContainer}`}>
                <ul>
                    {gamesData && 
                        gamesData.filter(
                            game => game.name.toLowerCase().includes(filter)
                        ).map((el, index) => {return (
                            <li key={index}>
                                <div>
                                    <Link key={el.id} to={`/game/${el.link}`}>
                                        <img src={`/src/Pages/Game/GameList/${el.link}/assets/miniature/${el.miniature}`} alt={`${el.name} miniature`} />
                                    </Link>
                                </div>
                                <p>{el.name}</p>
                            </li> 
                        )})
                    }
                </ul>
            </div>
        </>
    )
}

export default Home;