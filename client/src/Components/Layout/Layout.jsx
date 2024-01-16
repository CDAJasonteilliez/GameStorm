import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PersistLogin from "../PersistLogin/PersistLogin";
import { Suspense } from "react";
import Flash from "../Flash/Flash";

import styles from './Layout.module.scss'


const Layout = () => {
    return (
      <>
        <PersistLogin />
        <Header />
        <main className={`${styles.main}`}>
            <div className={`${styles.mainOutside}`}>
                <div className={`${styles.mainInside}`}>
                  <Flash/>
                  <Suspense>
                    <Outlet />
                  </Suspense>
                </div>
            </div>
        </main>
        <Footer />
      </>
    );
  };
  
  export default Layout;