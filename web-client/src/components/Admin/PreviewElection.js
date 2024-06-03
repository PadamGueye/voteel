import React from "react";
import {IoReloadOutline} from "react-icons/io5";

const PreviewUser = ({className, userData, setPreview})=>{
    return(
        <div className={className}>
            <div className="mb-5">
                <label htmlFor="num_carte" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Nom Election</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.name}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Status</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.status}</span>
            </div>
            <div className={"mb-5 w-full"}>
                <div className={"flex flex-col justify-center items-center"}>
                    <div onClick={()=> {setPreview(false)}} className={"p-2 bg-red-50 hover:bg-red-100 hover:animate-spin rounded-[50%] cursor-pointer"}>
                        <IoReloadOutline className={"text-red-400 text-xl"}/>
                    </div>
                    <p className={"text-sm text-gray-400"}>Retry</p>
                </div>
            </div>
        </div>
    )
}

export default PreviewUser;