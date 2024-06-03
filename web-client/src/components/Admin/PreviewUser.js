import React from "react";
import {IoReloadOutline} from "react-icons/io5";

const PreviewUser = ({className, userData, setPreview})=>{
    const NIVEAU = {
        '5': 'DIC3 / DESCAF3',
        '4': 'DIC2 / DESCAF2',
        '3': 'DIC1 / DESCAF1',
        '2': 'DUT2',
        '1': 'DUT1',
    }

    const GENRE = {
        'M' : "Masculin",
        'F' : "Féminin"
    }
    return(
        <div className={className}>
            <div className="mb-5">
                <label htmlFor="role" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Role</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.role}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="num_carte" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Numero Carte</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.firstName}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Prenom</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.lastName}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="nom" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Nom</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.phone}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Email</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.email}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="tel" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Téléphone</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.password}</span>
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