import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className={`${styles.header}`}>
            <nav>
                <ul>
                    <li><Link to="/"> Home</Link></li>
                    <li>bbb</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;



