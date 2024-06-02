import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineErrorOutline } from "react-icons/md";
import Spinner from "./Spinner";

const StateModal = ({showModal, onSubmit, onCancel, title, type, message}) => {

    return(
        <div id="popup-modal" tabIndex={-1} className={`fixed top-0 left-0 right-0 z-50 ${showModal ? "flex" : "hidden"} p-4 justify-center items-center bg-[rgba(0,0,0,0.2)] overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className={`absolute ${showModal ? "" : "hidden"} h-full w-full top-0 left-0`}></div>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-6 flex flex-col justify-center items-center text-center">
                        <h1 className={`mb-5 font-bold text-xl ${(type === "loading") ? "text-primary-2" : ((type === "succes") ? "text-green-500" : "text-red-500")} dark:text-gray-400`}>{title}</h1>
                        {
                            (type === "loading") ? (<div><Spinner/></div>) : ((type === "succes") ? (<div className={"p-3 rounded-[50%] bg-green-100"} ><CiCircleCheck className={"text-green-600 text-4xl"} /></div>) : (<div  className={"p-3 rounded-[50%] bg-red-100"}><MdOutlineErrorOutline className={"text-red-500 text-4xl"} /></div>))
                        }
                        <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
                        <div>
                            {(type === "succes" || type === "error") &&
                                (<button onClick={onSubmit} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2">
                                    Continuer
                                </button>)
                            }
                            {
                                (type === "error") && (<button onClick={onCancel} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ">
                                    Retourner en arrière
                                </button>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StateModal;