import React from "react";

const AddChambreForm = ({className, setChambreData, chambreData})=>{
    const handleInputChange = (fieldName, value) => {
        setChambreData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: value,
        }));
    };

    return(
        <div className={className}>
            <div className="mb-5">
                <label htmlFor="numero" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Numero chambre</label>
                <input value={chambreData.numero} onChange={(e)=>{handleInputChange("numero", e.target.value)}} type="number" id="numero" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Numero chambre" required />
            </div>
            <div className="mb-5">
                <label htmlFor="max_place" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Capacité chambre (places)</label>
                <input value={chambreData.max_place} onChange={(e)=>{handleInputChange("max_place", e.target.value)}} type="number" id="max_place" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Capacité chambre" required />
            </div>
            <div className="mb-5">
                <label htmlFor="nb_place_titulaire" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Places titulaire</label>
                <input value={chambreData.nb_place_titulaire} onChange={(e)=>{handleInputChange("nb_place_titulaire", e.target.value)}} type="number" id="nb_place_titulaire" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Capacité chambre" required />
            </div>
            <div className="mb-5">
                <label htmlFor="pavillon" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Pavillon</label>
                <select defaultValue={"1"} value={chambreData.pavillon} onChange={(e)=>{handleInputChange("pavillon", e.target.value)}} id="pavillon" className="h-10 w-[220px] md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={'A'} >Pavillon A</option>
                    <option value={'B'} >Pavillon B</option>
                    <option value={'C'} >Pavillon C</option>
                    <option value={'F'} >Pavillon F</option>
                    <option value={'G'} >Pavillon G</option>
                </select>
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
                <label htmlFor="sexe" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Type de Couloir</label>
                <select defaultValue={"M"} value={chambreData.sexe} onChange={(e)=>{handleInputChange("sexe", e.target.value)}} id="sexe" className="h-10 w-[220px] md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={"M"} >Homme</option>
                    <option value={"F"} >Femme</option>
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="vue" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Vue</label>
                <input value={chambreData.vue} onChange={(e)=>{handleInputChange("vue", e.target.value)}} type="text" id="vue" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Vue sur campus ..." required />
            </div>
        </div>
    )
}

export default AddChambreForm;