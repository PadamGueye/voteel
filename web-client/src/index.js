import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './output.css'
import App from './App';
import {ContextProvider} from "./context/ContexProvider";
import {AuthContextProvider} from "./context/AuthContextProvider";
import {SignupContextProvider} from "./context/SignupContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ContextProvider>
            <SignupContextProvider>
                <App />
            </SignupContextProvider>
        </ContextProvider>
    </AuthContextProvider>
);