import React from "react";
import {GENRE} from "../../utils/format";

const EditUserForm = ({className, setChambreData, chambreData})=>{
    const handleInputChange = (fieldName, value) => {
        setChambreData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: value,
        }));
    };

    return(
        <div className={className}>
            <div className="mb-5">
                <label htmlFor="max_place" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Capacité chambre (places)</label>
                <input value={chambreData.max_place} onChange={(e)=>{handleInputChange("max_place", e.target.value)}} type="number" id="max_place" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Capacité chambre" required />
            </div>
            <div className="mb-5">
                <label htmlFor="nb_place_titulaire" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Places titulaire</label>
                <input value={chambreData.nb_place_titulaire} onChange={(e)=>{handleInputChange("nb_place_titulaire", e.target.value)}} type="number" id="nb_place_titulaire" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Capacité chambre" required />
            </div>
            <div className="mb-5">
                <label htmlFor="etage" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Niveau Etage</label>
                <select defaultValue={"1"} value={chambreData.etage} onChange={(e)=>{handleInputChange("etage", e.target.value)}} id="etage" className="h-10 w-[220px] md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={'0'} >RDC</option>
                    <option value={'1'} >Premiere</option>
                    <option value={'2'} >Deuxieme</option>
                    <option value={'3'} >Troisieme</option>
                    <option value={'4'} >Quatrieme</option>
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="vue" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Vue</label>
                <input value={chambreData.vue} onChange={(e)=>{handleInputChange("vue", e.target.value)}} type="text" id="vue" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Vue sur campus ..." required />
            </div>
            <div className="mb-5">
                <label htmlFor="numero" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Numero chambre</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{chambreData.numero}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="pavillon" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Pavillon</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{chambreData.pavillon}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="sexe" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Type de Couloir</label>
                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{GENRE[chambreData.sexe]}</span>
            </div>
        </div>
    )
}

export default EditUserForm;