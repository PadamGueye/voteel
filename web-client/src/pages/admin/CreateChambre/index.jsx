import MainLayout from "../../../layout/MainLayout";
import {Types} from "../../../constants/Types";
import StatesModal from "../../../components/StatesModal";
import MainModal from "../../../components/MainModal";
import React from "react";
import useCreateChambre from "./useCreateChambre";
import MenuChambres from "../../../components/Admin/MenuChambres";
import AddChambreForm from "../../../components/Admin/AddChambreForm";
import PreviewChambre from "../../../components/Admin/PreviewChambre";

const CreateUser = () =>{
   const {
       navigate,
       stateModal, setStateModal,
       showMainModal, setShowMainModal,
       preview, setPreview,
       action, setAction,
       chambreData, setChambreData,
       formatedData, setFormatedData,
       resetStateModal,
       validateData,
       onPreview,
       onSubmit,
       onCancel,
   } = useCreateChambre();

    return(
        <MainLayout userRole={Types.ADMIN}>
            <div className={"px-10 py-2 flex flex-col items-center"}>
                <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={()=>{navigate('/admin/chambres');resetStateModal()}} onCancel={()=>{setShowMainModal(false);resetStateModal()}}/>
                <MainModal showModal={showMainModal} title={`Vous êtes sur le point ${action === "annuler" ? "d'annuler" : "de valider"} la création d'une chambre, êtes vous sûre de vouloir continuer ?`} onCancel={()=>{setShowMainModal(false);}} onSubmit={()=>{(action === "annuler" ? onCancel() : onSubmit())}} />
            </div>
            <div className={"flex flex-col items-center justify-start w-full h-screen overflow-y-scroll bg-blue-50"}>
                <MenuChambres className={"flex justify-start md:flex-row  items-center border-b bg-white border-gray-300 shadow-sm w-full gap-3 px-4"} />
                {   !preview &&
                    <div className={"bg-white mt-10 w-[90%] h-[60%] p-6 rounded-xl border border-gray-300 shadow mb-16"}>
                        <AddChambreForm chambreData={chambreData} setChambreData={setChambreData} className={"flex flex-wrap h-[100%] justify-center items-center gap-5 overflow-y-scroll"}/>
                    </div>
                }
                {   preview &&
                    (<div className={"bg-white mt-10 w-[90%] h-[60%] p-6 rounded-xl border border-gray-300 shadow mb-16"}>
                        <PreviewChambre setPreview={setPreview} chambreData={formatedData} className={"flex flex-wrap h-[100%] justify-center items-center gap-5 overflow-y-scroll"} />
                    </div>)
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
                        Créer Chambre
                    </button>
                    <button onClick={()=>{setShowMainModal(true); setAction("annuler")}} className={`text-white hover:bg-red-700 bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center`}>
                        Annuler
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}
export default CreateUser;