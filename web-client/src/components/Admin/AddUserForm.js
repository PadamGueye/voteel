import {Types, UserType} from "../../constants/Types";
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
                <label htmlFor="role" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Role</label>
                <select defaultValue={Types.ADMIN} value={userData.role} onChange={(e)=>{setRole(e.target.value)}} id="role" className="h-10 w-[220px] md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={Types.ADMIN} >Administrateur</option>
                    <option value={Types.EDITOR} >Editeur</option>
                    <option value={Types.BASIC} >Basic</option>
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Prenom</label>
                <input value={userData.firstName} onChange={(e)=>{handleInputChange("firstName", e.target.value)}} type="text" id="firstName" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Mouhamed" required />
            </div>
            <div className="mb-5">
                <label htmlFor="nom" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Nom</label>
                <input value={userData.lastName} onChange={(e)=>{handleInputChange("lastName", e.target.value)}} type="text" id="lastName" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Gueye" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Email</label>
                <input value={userData.email} onChange={(e)=>{handleInputChange("email", e.target.value)}} type="email" id="email" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@email.com" required />
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Téléphone</label>
                <input value={userData.phone} onChange={(e)=>{handleInputChange("phone", e.target.value)}} type="phone" id="tel" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="+221 77 123 45 67" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Password</label>
                <input value={userData.password} onChange={(e)=>{handleInputChange("password", e.target.value)}} type="text" id="password" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="***********" required />
            </div>
        </div>
    )
}

export default AddUserForm;