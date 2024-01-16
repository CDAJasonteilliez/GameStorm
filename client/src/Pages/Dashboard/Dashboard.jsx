import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
    return (
      <section className={`${styles.dashboard}`}>
          <h1>Dashboard</h1>

          <ul>
            <li>
              <NavLink to='utilisateurs'>Utilisateurs</NavLink>
              <NavLink to='jeux'>Jeux</NavLink>
              <NavLink to='scores'>Scores</NavLink>
            </li>
          </ul>

          <div>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
      </section>
    )
}
  
export default Dashboard