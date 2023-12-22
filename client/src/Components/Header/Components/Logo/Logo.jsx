import styles from './Logo.module.scss';
import logo from './img/logoGameStormWhite.webp'

const Logo = () => {
  return (
    <div className={`${styles.logo}`}>
        <div>
            <img src={logo} alt="Logo GameStorm" />
        </div>
    </div>
  )
}

export default Logo