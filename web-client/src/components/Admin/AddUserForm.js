import {Types, UserType} from "../../constants/Types";
import React, {useEffect, useState} from "react";

const AddUserForm = ({className, setUserData, userData})=>{
    const [role, setRole] = useState(Types.STUDENT);
    const emptyUserData = {num_carte : "", role : role ,	email : "",	prenom : "", nom : "",	type : UserType.CEE, fonction : "",	tel : "", date_naissance : "",	lieu_naissance : "", num_identite : "",	nationalite : "", departement : "Génie Informatique", option : "", niveau : "1", sexe : "M"};

    const handleInputChange = (fieldName, value) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: value,
        }));
    };

    useEffect(() => {
        setUserData(emptyUserData);
    }, [role]);
    return(
        <div className={className}>
            <div className="mb-5">
                <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Prenom</label>
                <input value={userData.prenom} onChange={(e)=>{handleInputChange("prenom", e.target.value)}} type="text" id="prenom" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Mouhamed" required />
            </div>
            <div className="mb-5">
                <label htmlFor="nom" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Nom</label>
                <input value={userData.nom} onChange={(e)=>{handleInputChange("nom", e.target.value)}} type="text" id="nom" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Gueye" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Email</label>
                <input value={userData.email} onChange={(e)=>{handleInputChange("email", e.target.value)}} type="email" id="email" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@esp.sn" required />
            </div>
            <div className="mb-5">
                <label htmlFor="tel" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Téléphone</label>
                <input value={userData.tel} onChange={(e)=>{handleInputChange("tel", e.target.value)}} type="phone" id="tel" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="+221 77 123 45 67" required />
            </div>
        </div>
    )
}

export default AddUserForm;