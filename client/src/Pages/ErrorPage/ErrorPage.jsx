import { NavLink } from "react-router-dom"
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
    return (
    <>
        <Header />
            <main className={`${styles.main}`}>
                <div className={`${styles.mainOutside}`}>
                    <div className={`${styles.mainInside}`}>
                        <div className={`${styles.errorpage}`}>
                            <h1>Page 404</h1>
                            <p>Nous ne trouvons pas votre page.</p>
                            <NavLink to='/' >Retourner à l'accueil</NavLink>
                        </div>
                    </div>
                </div>
            </main>
        <Footer />
    </>
    )
}

export default ErrorPage