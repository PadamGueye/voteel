import {Types} from "../../constants/Types";
import React, {useEffect, useState} from "react";

const AddUserForm = ({className, setUserData, userData})=>{
    const [role, setRole] = useState(Types.ADMIN);
    const emptyUserData = {role : role ,	email : "",firstName : "", lastName : "", phone : "", password : ""};

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
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Nom de l'élection</label>
                <input value={userData.name} onChange={(e)=>{handleInputChange("name", e.target.value)}} type="text" id="name" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Election name" required />
            </div>
            <div className="mb-5">
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Status</label>
                <input value={userData.status} onChange={(e)=>{handleInputChange("status", e.target.value)}} type="text" id="status" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Election status (en attente)" required />
            </div>
        </div>
    )
}

export default AddUserForm;