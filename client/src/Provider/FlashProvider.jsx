import { useState } from "react";
import { FlashContext } from "../Context/FlashContext.jsx";

const FlashProvider = ({children}) => {
    const [flashMessage, setFlashMessage] = useState(null);
    const [timer, setTimer] = useState(null);

    return (
        <FlashContext.Provider
            value={{
                flashMessage, 
                setFlashMessage,
                setTimer
            }}
        >
            {children}
        </FlashContext.Provider>
    )
}

export default FlashProvider;