import { useContext, useEffect } from "react";
import usePersist from "../../hooks/usePersist";
import { refresh } from "../../api/auth";
import { AuthContext } from "../../Context/AuthContext.jsx";

const PersistLogin = () => {
    const [persist, setPersist] = usePersist();
    const { setUserData } = useContext(AuthContext);

    useEffect(() => {
        const refreshIfPersist = async () => {
            const response = await refresh();
            if (response?.succes) {
                setUserData(response.data);
                return;
            }
            setUserData(null);
        }
        if(persist) {
            refreshIfPersist();
        }
    }, [])

    return (
        <></>
    )
};

export default PersistLogin;