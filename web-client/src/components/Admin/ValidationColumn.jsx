import React, {useEffect} from 'react';
import useReservations from "../../pages/editor/Reservations/useReservations";

const ValidationColumn = ({num_carte, onClick, setAction, setNumCarte}) => {

    const {
        getInfo,
        compte
    } = useReservations();


    useEffect(() => {
        if (num_carte)
            getInfo(num_carte);
    }, [num_carte]);



    return (
        <div className="text-center flex items-center">
            { compte && (compte?.codifier) ?
                <div className={"text-green-600 bg-green-200 w-[95%] border border-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-600 dark:text-green-400"}>Deja codifié</div>
                :
                <>
                    <button
                        onClick={() => {
                            onClick();
                            setAction("valider");
                            setNumCarte(num_carte);
                        }}
                        disabled={!compte && !(compte?.codifier)}
                        className={`${!compte && !(compte?.codifier) ?
                            "text-gray-600 bg-gray-200 border border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400"
                            :
                            "text-green-700 hover:text-white border border-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                        }`}
                    >
                        Valider
                    </button>

                    <button
                        onClick={() => {
                            onClick();
                            setAction("annuler");
                            setNumCarte(num_carte);
                        }}
                        disabled={!compte && !(compte?.codifier)}
                        className={`${!compte && !(compte?.codifier) ?
                            "text-gray-600 border bg-gray-200 border-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400"
                            :
                            "text-red-700 hover:text-white border border-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        }`}
                    >
                        Annuler
                    </button>
                </>
            }
        </div>
    )
}

export default ValidationColumn;