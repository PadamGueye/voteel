import getNiveauEtage from "../utils/getNiveauEtage";

const PopupModal = ({showModal, onSubmit, onCancel, selectedRoom}) => {
    return(
        <div id="popup-modal" tabIndex={-1} className={`relative w-full mt-5 h-full top-0 left-0 right-0 z-50 ${showModal ? "flex" : "hidden"} p-4 justify-center items-center bg-[rgba(0,0,0,0.2)] overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className={`absolute ${showModal ? "" : "hidden"} h-full w-full top-0 left-0`} onClick={onCancel}></div>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={onCancel} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        {
                            selectedRoom.chambre  ? (
                                <>
                                    <div className={"w-full flex justify-center items-center my-5 text-gray-400"}>
                                        <div className={"h-16 w-16 rounded-[50%] flex justify-center items-center bg-gradient-primary text-white font-bold"}>{`${selectedRoom.chambre?.numero}${selectedRoom.chambre?.pavillon}`}</div>
                                    </div>
                                    <div className={"flex flex-col justify-center gap-2 my-4 w-[100%] z-100"}>
                                        <div className={"flex gap-2 items-center pl-3 justify-start"}><span className={"font-bold flex justify-start text-sm w-[60%]"}>Niveau : </span> <span className={"text-primary-2 text-md font-bold"}>{getNiveauEtage(selectedRoom.chambre?.etage)}</span></div>
                                        <div className={"flex gap-2 items-center pl-3 justify-start"}><span className={"font-bold flex justify-start text-sm w-[60%]"}>Vue : </span> <span className={"text-primary-2 text-md font-bold"}>{selectedRoom.chambre?.vue ? selectedRoom.chambre?.vue : "non définie" }</span></div>
                                        <div className={"flex gap-2 items-center pl-3 justify-start"}><span className={"font-bold flex justify-start text-sm w-[60%]"}>Capacité chambre : </span> <span className={"text-primary-2 text-md font-bold"}>{selectedRoom.chambre?.max_place} place(s)</span></div>
                                        <div className={"flex gap-2 items-center pl-3 justify-start"}><span className={"font-bold flex justify-start text-sm w-[60%]"}>Totale places disponible : </span> <span className={"text-primary-2 text-md font-bold"}>{selectedRoom?.nb_place_disponible}</span></div>
                                        <div className={"flex gap-2 items-center pl-3 justify-start"}><span className={"font-bold flex justify-start text-sm w-[60%]"}>Place titulaire disponible : </span> <span className={"text-primary-2 text-md font-bold"}>{selectedRoom?.nb_place_titulaire_disponible}</span></div>
                                        <div className={"flex gap-2 items-center pl-3 justify-start"}><span className={"font-bold flex justify-start text-sm w-[60%]"}>Place suppléant disponible : </span> <span className={"text-primary-2 text-md font-bold"}>{selectedRoom?.nb_place_disponible - selectedRoom?.nb_place_titulaire_disponible}</span></div>
                                    </div>
                                    <button onClick={onSubmit} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-primary-1 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2">
                                        Reserver
                                    </button>
                                </>
                    ) :  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Veuillez selectionner la chambre à afficher en détail !</h3>

                        }
                        </div>
                </div>
            </div>
        </div>
    )
}
export default PopupModal;