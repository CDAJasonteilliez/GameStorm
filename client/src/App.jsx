import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className={`${styles.app}`}>
      <Header />
      <main className={`${styles.main}`}>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default App;
