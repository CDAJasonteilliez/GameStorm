import { useState } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";

const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    
    return (
        <AuthContext.Provider
            value={{
                userData,
                setUserData
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;