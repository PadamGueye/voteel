import React, { createContext, useContext, useState } from "react";

export const SignupContext = createContext(undefined);

export const useSignupContext = () => {
    const context = useContext(SignupContext);
    if (!context) {
        throw new Error("Error on using signup context...");
    }
    return context;
};

export const SignupContextProvider = ({ children }) => {
    const [signupData, setSignupData] = useState({});

    return (
        <SignupContext.Provider value={{ signupData, setSignupData }}>
            {children}
        </SignupContext.Provider>
    );
};