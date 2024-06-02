import {Link} from "react-router-dom";
import {Types} from "../constants/Types";
import React from "react";
import {useAuthStateContext} from "../context/AuthContextProvider";

const Profile = ({user}) =>{
    const currentUser = useAuthStateContext()?.user;
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
        <>
            <div className={`flex items-center gap-5`}>
                <div className={``}>
                    <div className={`bg-primary-1 w-12 h-12 md:w-20 md:h-20 font-bold md:text-[32px] text-white rounded-[50%] flex justify-center items-center`}>{`${user?.prenom?.charAt(0)}${user?.nom?.charAt(0)}`}</div>
                </div>
                <div className={`flex flex-col gap-1 justify-center`}>
                    <div className={`text-sm  md:text-xl font-bold`}>{`${user?.prenom} ${user?.nom}`}</div>
                    <div className={`font-light text-xs md:text-sm`}>{`${user?.email}`}</div>
                    <div className={`font-light text-xs md:text-sm`}>{`${user?.role}`}</div>
                </div>
            </div>
            <div className={`flex flex-col gap-4`}>
                <div className={"font-light text-md md:text-2xl text-gray-600"}>Les Informations requises</div>
                <div className={"flex items-center"}>
                    <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Numéro de carte</div>
                    <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.num_carte}</div>
                </div>
                <div className={"flex items-center"}>
                    <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Prénom</div>
                    <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.prenom}</div>
                </div>
                <div className={"flex items-center"}>
                    <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Email</div>
                    <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.email}</div>
                </div>
                <div className={"flex items-center"}>
                    <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Téléphone</div>
                    <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.tel ? user?.tel : "Non défini"}</div>
                </div>
                <div className={"flex items-center"}>
                    <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Nom</div>
                    <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.nom}</div>
                </div>
                <div className={"flex flex-wrap items-center mt-4 gap-3"}>
                    {<Link to={`/signup/verifyIdentity`} className={"px-10 flex justify-center items-center py-3 bg-gray-100 rounded text-xs hover:bg-gray-200 font-normal"}>Reinitialiser mot de passe</Link>}
                    {(currentUser?.role === Types.EDITOR && currentUser?._id !== user?._id) ? "" : <Link to={`/edit-user/${user?._id}`} className={"px-10 flex justify-center items-center py-3 bg-gray-100 rounded text-xs hover:bg-gray-200 font-normal"}>Editer mes informations</Link>}
                </div>
                <div className={"flex flex-wrap items-center mt-4 gap-3"}>
                    <div className={"font-light text-md md:text-2xl text-gray-600"}>Les Informations Supplémentaires</div>
                </div>
                {
                    user?.role === Types.STUDENT &&
                    <>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Genre</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.sexe ? GENRE[user?.sexe] : "Non défini"}</div>
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Date de Naissance</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.date_naissance ? user?.date_naissance : "Non défini"}</div>
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Lieu de Naissance</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.lieu_naissance ? user?.lieu_naissance : "Non défini"}</div>
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Numéro CNI</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.num_identite ? user?.num_identite : "Non défini"}</div>
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Nationalité</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.nationalite ? user?.nationalite : "Non défini"}</div>
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Département</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.departement ? user?.departement : "Non défini"}</div>
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Option</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.option ? user?.option : "Non défini"}</div>
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Niveau d'étude</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.niveau ? NIVEAU[user?.niveau] : "Non défini"}</div>
                        </div>
                    </>
                }
                {
                    (user?.role === Types.ADMIN || user?.role === Types.EDITOR)  &&
                    <>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Organisation</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.type ? user?.type?.toUpperCase() : "Non défini"}</div>
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"font-semibold w-[100px] md:w-[250px] text-xs md:text-sm text-gray-700"}>Fonction occupé</div>
                            <div className={"font-light text-xs md:text-sm text-gray-700"}>{user?.fonction ? user?.fonction : "Non défini"}</div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Profile;