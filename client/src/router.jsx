import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from './Components/Layout/Layout';

const Home = lazy(() => import('./Pages/Home/Home.jsx'));
const Game = lazy(() => import('./Pages/Game/Game.jsx'));
const Connexion = lazy(() => import('./Pages/Connexion/Connexion.jsx'));
const Inscription = lazy(() => import('./Pages/Inscription/Inscription.jsx'));
const About = lazy(() => import('./Pages/About/About.jsx'));
const CGU = lazy(() => import('./Pages/CGU/CGU.jsx'));
const Contact = lazy(() => import('./Pages/Contact/Contact.jsx'));
const ForgottenPassword = lazy(() => import('./Pages/ForgottenPassword/ForgottenPassword.jsx'));
const Legal = lazy(() => import('./Pages/Legal/Legal.jsx'));
const PDC = lazy(() => import('./Pages/PDC/PDC.jsx'));
const Profil = lazy(() => import('./Pages/Profil/Profil.jsx'));
const Ranking = lazy(() => import('./Pages/Ranking/Ranking.jsx'));
const Rankings = lazy(() => import('./Pages/Rankings/Rankings.jsx'));
const RecupPassword = lazy(() => import('./Pages/RecupPassword/RecupPassword.jsx'));
const ValidEmail = lazy(() => import('./Pages/ValidEmail/ValidEmail.jsx'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard.jsx'));

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
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/condition-generale-d-utilisation',
                element: <CGU />
            },
            {
                path: '/nous-contacter',
                element: <Contact />
            },
            {
                path: '/mot-de-passe-oublie',
                element: <ForgottenPassword />
            },
            {
                path: '/mention-legal',
                element: <Legal />
            },
            { 
                path: '/politique-de-confidentialite',
                element: <PDC />
            },
            {
                path: '/profile',
                element: <Profil />
            }, 
            {
                path: '/classement/:gameName',
                element: <Ranking />
            },
            {
                path: '/classement',
                element: <Rankings />
            },
            {
                path: '/recuperation',
                element: <RecupPassword />
            },
            {
                path: '/validation-email',
                element: <ValidEmail />
            },
            {
                path: '/administration',
                element: <Dashboard />
            }
        ]
    }
])

export { router };