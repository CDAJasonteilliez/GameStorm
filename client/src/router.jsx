import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Home from "./Pages/Home/Home";
import Game from "./Pages/Game/Game";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path:'/',
                element: <Home />
            },
            {
                path:'/game/:gameName',
                element: <Game />
            }
        ]
    }
])

export { router };