import {Types, UserType} from "../../constants/Types";
import React from "react";
import {GENRE, NIVEAU} from "../../utils/format";
import {useAuthStateContext} from "../../context/AuthContextProvider";

const EditUserForm = ({className, setUserData, userData})=>{

    const auth = useAuthStateContext();
    const handleInputChange = (fieldName, value) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: value,
        }));
    };

    return(
        <div className={className}>
            {
                userData.role === Types.STUDENT &&
                (<>
                        <div className="mb-5">
                            <label htmlFor="date_naissance" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Date de naissance</label>
                            <input value={userData.date_naissance} onChange={(e)=>{handleInputChange("date_naissance", e.target.value)}} type="date" id="date_naissance" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lieu_naissance" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Lieu de naissance</label>
                            <input value={userData.lieu_naissance} onChange={(e)=>{handleInputChange("lieu_naissance", e.target.value)}} type="text" id="lieu_naissance" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Dakar" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="num_identite" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">CNI</label>
                            <input value={userData.num_identite} onChange={(e)=>{handleInputChange("num_identite", e.target.value)}} type="text" id="num_identite" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="12123444252666" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="nationalite" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Nationalité</label>
                            <input value={userData.nationalite} onChange={(e)=>{handleInputChange("nationalite", e.target.value)}} type="text" id="nationalite" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Sénégalaise" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="departement" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Département</label>
                            <select defaultValue={"Génie Informatique"} value={userData.departement} onChange={(e)=>{handleInputChange("departement", e.target.value)}} id="departement" className="h-10 w-[220px] md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={"Génie Informatique"} >Génie Informatique</option>
                                <option value={"Génie Chimique B.A"} >Génie Chimique B.A</option>
                                <option value={"Génie Mécanique"} >Génie Mécanique</option>
                                <option value={"Génie Civile"} >Génie Civile</option>
                                <option value={"Génie Electrique"} >Génie Electrique</option>
                                <option value={"Gestion"} >Gestion</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="option" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Option</label>
                            <input value={userData.option} onChange={(e)=>{handleInputChange("option", e.target.value)}} type="text" id="option" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Biologie Appliquée" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="sexe" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Genre</label>
                            {
                                auth.user?.role === Types.ADMIN ?
                                <select defaultValue={"M"} value={userData.sexe} onChange={(e)=>{handleInputChange("sexe", e.target.value)}} id="sexe" className="h-10 w-[220px] md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={"M"} >Masculin</option>
                                    <option value={"F"} >Féminin</option>
                                </select>
                                :
                                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{GENRE[userData.sexe]}</span>

                            }
                        </div>
                        <div className="mb-5">
                            <label htmlFor="niveau" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Niveau</label>
                            {
                                auth.user?.role === Types.ADMIN ?
                                <select defaultValue={"1"} value={userData.niveau} onChange={(e)=>{handleInputChange("niveau", e.target.value)}} id="niveau" className="h-10 w-[220px] md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={'1'} >DUT1</option>
                                    <option value={'2'} >DUT2</option>
                                    <option value={'3'} >DIC1 /DESCAF1</option>
                                    <option value={'4'} >DIC2 /DESCAF2</option>
                                    <option value={'5'} >DIC3 /DESCAF3</option>
                                </select>
                                :
                                <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{NIVEAU[userData.niveau]}</span>
                        }
                        </div>

                    </>
                )
            }
            {
                (userData.role === Types.ADMIN || userData.role === Types.EDITOR) &&
                (<>
                    <div className="mb-5">
                        <label htmlFor="type" className="block mb-2 text-sm text-primary-2 font-medium dark:text-white">Type d'utilisateur</label>
                        <select defaultValue={UserType.CEE} value={userData.type} onChange={(e)=>{handleInputChange("type", e.target.value)}} id="type" className="h-10 w-[220px] md:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={UserType.CEE} >CEE</option>
                            <option value={UserType.COUD} >COUD</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="fonction" className="block mb-2 text-sm font-medium text-primary-2 dark:text-white">Fonction</label>
                        <input value={userData.fonction} onChange={(e)=>{handleInputChange("fonction", e.target.value)}} type="text" id="fonction" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Adjoint ComSoc" required />
                    </div>
                </>)
            }
            <div className="mb-5">
                <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Prenom</label>
                {
                    auth.user?.role === Types.ADMIN ?
                    <input value={userData.prenom} onChange={(e)=>{handleInputChange("prenom", e.target.value)}} type="text" id="prenom" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Mouhamed" required />
                    :
                    <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.prenom}</span>
                }
            </div>
            <div className="mb-5">
                <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Nom</label>
                {
                    auth.user?.role === Types.ADMIN ?
                    <input value={userData.nom} onChange={(e)=>{handleInputChange("nom", e.target.value)}} type="text" id="nom" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Gueye" required />
                    :
                    <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.nom}</span>

                }
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Email</label>
                {
                    auth.user?.role === Types.ADMIN ?
                    <input value={userData.email} onChange={(e)=>{handleInputChange("email", e.target.value)}} type="email" id="email" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@esp.sn" required />
                        :
                    <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.email}</span>
                }
            </div>
            <div className="mb-5">
                <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Téléphone</label>
                {
                    auth.user?.role === Types.ADMIN ?
                    <input value={userData.tel} onChange={(e)=>{handleInputChange("tel", e.target.value)}} type="phone" id="tel" className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="+221 77 123 45 67" required />
                        :
                    <span  className="h-10 w-[220px] md:w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-500 cursor-not-allowed text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.tel}</span>
                }
            </div>
            <div className="mb-5">
                <label htmlFor="num_carte" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Numero Carte</label>
                <span title={"Vous ne pouvez pas modifier le numero de la carte !"} className="h-10 w-[220px] md:w-[300px] cursor-not-allowed shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.num_carte}</span>
            </div>
            <div className="mb-5">
                <label htmlFor="role" className="block mb-2 text-sm text-gray-500 font-medium dark:text-white">Role</label>
                <span title={"Vous ne pouvez pas modifier le role de l'utilisateur !"}  className="h-10 w-[220px] md:w-[300px] cursor-not-allowed shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{userData.role}</span>
            </div>
        </div>
    )
}

export default EditUserForm;