import { NavLink } from "react-router-dom";
import styles from './NavLien.module.scss';

const NavLien = ({text, lien, classe}) => {


  return (
    <li className={`${styles.navLien}
      ${classe==="red" ? (styles.classe):("")}
    `}>
        <div>
            <div>
                <NavLink to={lien} >{text}</NavLink>
            </div>
        </div>
    </li>
  )
}

export default NavLien;