import React, {useEffect, useState} from "react";
import {Navigate} from 'react-router-dom';
export const RequireVote = ({ role, children }) => {
    const [loading, setLoading] = useState(true);
    const access = JSON.parse(localStorage.getItem('voter-info'));


    useEffect(() => {
        const checkAuthentication = () => {
            setLoading(false);
        }

        checkAuthentication();
    }, []);

    if (loading) {
        return(
        <div className={"h-screen w-screen bg-blue-50 flex flex-col justify-center items-center"}>
            <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon"/>
        </div>)
    }

    if (!access) {
        return <Navigate to='/access-denied'/>;
    }

    return children;
}
