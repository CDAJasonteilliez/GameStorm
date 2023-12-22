import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from './Components/Layout/Layout';
import Connexion from "./Pages/Connexion/Connexion.jsx";

const Home = lazy(() => import('./Pages/Home/Home.jsx'));
const Game = lazy(() => import('./Pages/Game/Game.jsx'));
// const Connexion = lazy(() => import('./Pages/Connexion/Connexion.jsx'));
const Inscription = lazy(() => import('./Pages/Inscription/Inscription.jsx'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path:'/',
                element: <Home />
            },
            {
                path:'/game/:gameName',
                element: <Game />
            },
            {
                path:'/connexion',
                element: <Connexion />
            },
            {
                path:'/inscription',
                element: <Inscription />
            }
        ]
    }
])

export { router };