import React from 'react';
import {useStateContext} from "../context/ContexProvider";


const Notification = ({message, user}) => {

    const {setIsNotificationValidate, setShowNotification, setIsAdminNotificationValidate} = useStateContext();


    return (
        <div className="fixed  z-50 top-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="p-10 text-xl relative bg-white top-0 rounded-xl">
                <p className="text-[#0A226B] text-center">{message}</p>
                <div className="text-center space-x-4 mt-4">
                    <button onClick={() => {
                        if (user !== 'editor')
                            setIsNotificationValidate(true)
                        else
                            setIsAdminNotificationValidate(true);
                    }} className="rounded-xl border font-bold px-2 text-green-500 border-green-400 ">Oui</button>
                    <button onClick={() => {
                        if (user !== 'editor')
                            setIsNotificationValidate(false)
                        else
                            setIsAdminNotificationValidate(false);
                        setShowNotification(false);
                    }} className="rounded-xl border font-bold px-2 bg-[#0A226B] border-[#0A226B]">Non</button>
                </div>
            </div>
        </div>
    )
}


export default Notification;