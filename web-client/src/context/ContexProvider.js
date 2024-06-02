
import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const ContextProvider = ({ children}) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false)
    const [roomReserved, setRoomReserved] = useState(null)
    const [codifier, setCodifier] = useState(false)
    const [showNotification, setShowNotification] = useState(false);
    const [isNotificationValidate, setIsNotificationValidate] = useState(null);
    const [isAdminNotificationValidate, setIsAdminNotificationValidate] = useState(null);


    return (
        <StateContext.Provider value={{
            isAdminNotificationValidate, setIsAdminNotificationValidate,
            isNotificationValidate, setIsNotificationValidate,
            showNotification, setShowNotification,
            screenSize, setScreenSize,
            isLoading, setIsLoading,
            roomReserved, setRoomReserved,
            codifier, setCodifier,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)