import NavLien from "./Components/NavLien/NavLien"

import styles from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <nav className={`${styles.navigation}`}>
        <ul>
            <NavLien text="Accueil" lien="/" classe=""/>
            <NavLien text="Classement" lien="/ranks" classe=""/>
            <span></span>
            <NavLien text="Connexion" lien="/connexion" classe=""/>
            <NavLien text="Inscription" lien="/inscription" classe=""/>

            {/* <NavLien text="Profile" lien="/connexion" classe=""/> */}
            {/* <NavLien text="Déconnexion" lien="/connexion" classe="red"/> */}
        </ul>
    </nav>
  )
}

export default Navigation
