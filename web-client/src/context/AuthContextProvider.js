import React, {createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const AuthContextProvider = ({ children}) => {

    const [user, setUser] = useState("");
    const [userInfo, setUserInfo] = useState("");


    const login = (data) => {
        localStorage.setItem('access-key', JSON.stringify(data));
        setUser(data.user);
    }

    const logout = () => {
        localStorage.removeItem('access-key');
        setUser(null);
    }

    return (
        <StateContext.Provider value={{
            user, login, logout, userInfo, setUserInfo
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useAuthStateContext = () => useContext(StateContext)