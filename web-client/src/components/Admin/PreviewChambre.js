import React from "react";
import {IoReloadOutline} from "react-icons/io5";
import getNiveauEtage from "../../utils/getNiveauEtage";

const PreviewChambre = ({className, chambreData, setPreview})=>{

    const GENRE = {
        'M' : "Masculin",
        'F' : "Féminin"
    }
    return(
        <div className={className}>
            <div className="mb-5">
                <label htmlFor="numero" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Numero chambre</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{chambreData.numero}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="max_place" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Capacité chambre (places)</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{chambreData.max_place}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="nb_place_titulaire" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Place Titulaire</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{chambreData.nb_place_titulaire}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="pavillon" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Pavillon</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{chambreData.pavillon}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="etage" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Niveau Etage</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{getNiveauEtage(chambreData.etage)}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="sexe" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Type de couloir</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{GENRE[chambreData.sexe]}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="vue" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Vue</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{chambreData.vue}</span>
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

export default PreviewChambre;