import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <div>
                <div>
                    <NavLink to='/condition-generale-d-utilisation'>Condition générale d'utilisation</NavLink>
                    <NavLink to='/politique-de-confidentialite'>Politique de confidentialité</NavLink>
                </div>
                <div>
                    <NavLink to='/mention-legale'>Mention légale</NavLink>
                    <NavLink to='/nous-contacter'>Nous contacter</NavLink>
                </div>
            </div>
            <p>Copyright &copy; GameStorm 2024</p>
        </footer>
    )
}

export default Footer;