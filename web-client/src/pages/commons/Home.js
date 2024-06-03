import React, {useEffect, useState} from "react";
import {Types} from "../../constants/Types";
import {useAuthStateContext} from "../../context/AuthContextProvider";
import {Navigate} from "react-router-dom";

const Home = () => {
    const auth = useAuthStateContext();
    const [loading, setLoading] = useState(true);


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
    if (auth?.user !== null){
        if ( Types.ADMIN === auth.user?.role){
            return <Navigate to='/admin'/>
        }
        else if (Types.EDITOR === auth.user?.role){
            return <Navigate to='/editor'/>
        }
        else if ( Types.BASIC === auth.user?.role){
            return <Navigate to='/student'/>
        }
    }else{
        return <Navigate to='/signin'/>
    }
}

export default Home;