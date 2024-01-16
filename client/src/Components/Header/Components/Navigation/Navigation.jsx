import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import NavLien from "./Components/NavLien/NavLien"
import { FlashContext } from "../../../../Context/FlashContext";
import { useNavigate } from "react-router-dom";
import { deconnexion } from "../../../../api/auth";

import styles from "./Navigation.module.scss";

const Navigation = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const { setFlashMessage, setTimer } = useContext(FlashContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await deconnexion();
      if(response.succes) {
        setUserData(null);
        setFlashMessage({
          message: "Déconnexion réussie !",
          type: "succes"
        });
        setTimer(clearTimeout)
        setTimer(
            setTimeout(() => {setFlashMessage(null);},5000)
        )
        navigate("/");
      return;
      }
    } catch (err) {
      setFlashMessage({
        message: "Une erreur est survenue, veuillez réessayer ulterieurement.",
        type: "error"
      });
      setTimer(clearTimeout)
      setTimer(
          setTimeout(() => {setFlashMessage(null);},5000)
      );
    }
  }

  return (
    <nav className={`${styles.navigation}`}>
        <ul>
            { userData && userData.role === "administrateur" ? (
              <>
                <NavLien text="Accueil" lien="/" classe=""/>
                <NavLien text="DashBoard" lien="/administration" classe=""/>
                <span></span>
                <li className={`${styles.li}`}>
                  <div>
                    <div>
                      <p onClick={handleLogout}>Déconnexion</p>
                    </div>
                  </div>
                </li>
                
              </>
            ) : ("")}

            { userData && userData.role === "utilisateur" ? (
              <>
                <NavLien text="Accueil" lien="/" classe=""/>
                <NavLien text="Profile" lien="/profile" classe=""/>
                <span></span>
                <li className={`${styles.li}`}>
                  <div>
                    <div>
                      <p onClick={handleLogout}>Déconnexion</p>
                    </div>
                  </div>  
                </li>
              </>
            ) : ("")}

            { userData === null ? (
              <>
                <NavLien text="Accueil" lien="/" classe=""/>
                <span></span>
                <NavLien text="Connexion" lien="/connexion" classe=""/>
                <NavLien text="Inscription" lien="/inscription" classe=""/>
              </>
            ) : ("")}
        </ul>
    </nav>
  )
}

export default Navigation
