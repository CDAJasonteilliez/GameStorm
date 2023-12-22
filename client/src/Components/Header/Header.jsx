import styles from './Header.module.scss';
import UserHeader from './Components/UserHeader/UserHeader';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';

const Header = () => {
    return (
        <header className={`${styles.header}`}>
            {/* <UserHeader /> */}
            <Logo />
            <Navigation />
        </header>
    )
}

export default Header;



