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
const RecupPassword = lazy(() => import('./Pages/RecupPassword/RecupPassword.jsx'));
const ValidEmail = lazy(() => import('./Pages/ValidEmail/ValidEmail.jsx'));

const CanvasGame = lazy(() => import("./Pages/Game/Components/CanvasGame/CanvasGame.jsx"));
const Leaderboard = lazy(() => import("./Pages/Game/Components/Leaderboard/Leaderboard.jsx"));

const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard.jsx'));
const Jeux = lazy(() => import('./Pages/Dashboard/Components/Jeux/Jeux.jsx'));
const ListeJeux = lazy(() => import('./Pages/Dashboard/Components/Jeux/Components/ListeJeux/ListeJeux.jsx'));
const AddJeu = lazy(() => import('./Pages/Dashboard/Components/Jeux/Components/AddJeu/AddJeu.jsx'));
const Scores = lazy(() => import('./Pages/Dashboard/Components/Scores/Scores.jsx'));
const Utilisateurs = lazy(() => import('./Pages/Dashboard/Components/Utilisateurs/Utilisateurs.jsx'));

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
                path:'/game/:link',
                element: <Game />,
                children: [
                    {
                        path:'',
                        element: <CanvasGame />
                    },
                    {
                        path:'leaderboard',
                        element: <Leaderboard />
                    }
                ]
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
                path: '/a-propos',
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
                path: '/recuperation',
                element: <RecupPassword />
            },
            {
                path: '/validation-email',
                element: <ValidEmail />
            },
            {
                path: '/administration',
                element: <Dashboard />,
                children: [
                    {
                        path: 'utilisateurs',
                        element: <Utilisateurs />
                    },
                    {
                        path: 'jeux',
                        element: <Jeux />,
                        children: [
                            {
                                path: '',
                                element: <ListeJeux />
                            },
                            {
                                path: 'ajouter',
                                element: <AddJeu />
                            }
                        ]
                    },
                    {
                        path: 'scores',
                        element: <Scores />
                    },
                ]

            }
        ]
    }
])

export { router };