import MainLayout from "../../../layout/MainLayout";
import {Types} from "../../../constants/Types";
import StatesModal from "../../../components/StatesModal";
import MainModal from "../../../components/MainModal";
import React from "react";
import useEditChambre from "./useEditChambre";
import SuccessAlert from "../../../components/SuccessAlert";
import EditChambreForm from "../../../components/Admin/EditChambreForm";
import MenuChambres from "../../../components/Admin/MenuChambres";

const EditChambre = () =>{
   const {
       navigate,
       stateModal, setStateModal,
       showMainModal, setShowMainModal,
       preview, setPreview,
       action, setAction,
       emptyChambreData,
       chambreData, setChambreData,
       formatedData, setFormatedData,
       validateMessage, setValidateMessage,
       userContexte,
       resetStateModal,
       validateData,
       onSubmit,
       onPreview,
       onCancel
   } = useEditChambre();



    return(
        <MainLayout userRole={userContexte?.role}>
            <div className={"px-10 py-2 flex flex-col items-center"}>
                <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={()=>{navigate('/admin/chambres');resetStateModal()}} onCancel={()=>{navigate('/admin/chambres');resetStateModal()}}/>
                <MainModal showModal={showMainModal} title={`Vous êtes sur le point ${action === "annuler" ? "d'annuler" : "de modifier"} un utilisateur, êtes vous sûre de vouloir continuer ?`} onCancel={()=>{setShowMainModal(false); resetStateModal()}} onSubmit={()=>{(action === "annuler" ? onCancel() : onSubmit())}} />
            </div>
            <div className={"flex flex-col items-center justify-start w-full h-screen overflow-y-scroll bg-blue-50"}>
                { (Types.ADMIN === userContexte?.role ) && <MenuChambres className={"flex justify-start md:flex-row  items-center border-b bg-white border-gray-300 shadow-sm w-full gap-3 px-4"}/>}
                {validateMessage && <div className={"fixed top-32"}><SuccessAlert text={validateMessage} handleClose={()=>{setValidateMessage("")}} id="alert-2"  /></div>}
                {
                    <div className={"bg-white mt-10 w-[90%] p-6 rounded-xl border border-gray-300 shadow mb-40"}>
                        <div className="font-Inter my-10 text-primary-2 flex justify-center items-center md:mt-1 text-xl md:text-2xl">
                            <h3>Editer les informations de la chambre</h3>
                        </div>
                        <EditChambreForm chambreData={chambreData} setChambreData={setChambreData} className={"flex flex-wrap justify-center items-center gap-5"}/>
                    </div>
                }
                <div className={"fixed bottom-0 bg-white py-2 w-[100%] md:w-[80%] flex justify-center items-start"}>
                    <button onClick={()=>{
                        if (!preview) {
                            onPreview();
                        }else {
                            setShowMainModal(true);
                            setAction("valider")
                        }
                    }} className={`text-gray-600 hover:bg-gray-200 border border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400`}>
                        {!preview ? "Verifier" : "Enregistrer modification"}
                    </button>
                    <button onClick={()=>{setShowMainModal(true); setAction("annuler")}} className={`text-white hover:bg-red-700 bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center`}>
                        Annuler
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}
export default EditChambre;