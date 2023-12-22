import styles from "./UserHeader.module.scss";
import avatar from "./img/avatar.webp";


const UserHeader = () => {
  return (
    <div className={`${styles.userHeader}`}>
        <div className={`${styles.avatarRing}`}>
            <div className={`${styles.avatarInside}`}>
                <img src={avatar} alt="Avatar" />
            </div>
        </div>
        <p className={`${styles.userHeader}`}>JESUISUNFAKEE</p>
    </div>
  )
}

export default UserHeader