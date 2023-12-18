import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>home</h1>
            <Link to="/game/GameTest1">game1</Link>
            <Link to="/game/GameTest2">game2</Link>
        </>
    )
}

export default Home;