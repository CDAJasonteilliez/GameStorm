import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const Jeux = () => {
  return (
    <>
        <Suspense>
            <Outlet />
        </Suspense>
    </>
  )
}

export default Jeux