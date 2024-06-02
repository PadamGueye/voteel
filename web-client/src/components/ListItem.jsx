import React from "react";

const ListItem = ({membreStatemembers, reservationState, members , reservations}) => {

    const NIVEAU = {
        '5': 'DIC3',
        '4': 'DIC2',
        '3': 'DIC1 / DESCAF1',
        '2': 'DIC2 / DESCAF2',
        '1': 'DIC3 / DESCAF3',
    }

    return(
        <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left-right text-gray-500">
                <thead  className="border-b border-gray-400 text-xs text-white uppercase bg-primary-1 hover:bg-primary-2">
                <tr>
                    <th scope="col" className="px-6 py-3">Nom Complet</th>
                    <th scope="col" className="px-6 py-3">Département</th>
                    <th scope="col" className="px-6 py-3">Option</th>
                    <th scope="col" className="px-1 py-3">Niveau d'étude</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Téléphone</th>
                    <th scope="col" className="px-6 py-3">Statut</th>
                </tr>
                </thead>
                <tbody>
                {
                    (membreStatemembers === "loading" || reservationState === "loading") ?
                        Array.from({ length: 3 }).map((_, index) => (
                                <tr key={index} className="bg-white border-b-[1.5px] border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <td key={i} className="px-4 py-4">
                                            <div className="max-w-sm animate-pulse flex items-center justify-center">
                                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        :
                    members && members.map((member) => (
                    <tr key={member.tel} className="bg-white border-b-[1.5px] border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <td scope="row" className="px-4 py-4 font-semibold text-black whitespace-nowrap dark:text-white">
                            {`${member?.prenom} ${member?.nom}`}
                        </td>
                        <td className="px-4 py-4">
                            {member?.departement}
                        </td>
                        <td className="px-4 py-4">
                            {member?.option}
                        </td>
                        <td className="px-1 py-4">
                            {NIVEAU[member?.niveau]}
                        </td>
                        <td className="px-4 py-4">
                            {member?.email}
                        </td>
                        <td className="px-4 py-4">
                            {member?.tel}
                        </td>
                        <td className="px-4 py-4 font-bold text-green-500">
                            {reservations?.map((reservation)=>{
                                console.log(reservation , member)
                                if (reservation?.compte === member?.compte){
                                    return (!reservation?.statut ? "Non défini" : reservation?.statut === "T" ? "Titulaire" : "Suppléant" );
                                }
                            })}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListItem;