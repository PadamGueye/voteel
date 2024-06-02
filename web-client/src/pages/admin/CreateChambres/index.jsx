import MainLayout from "../../../layout/MainLayout";
import {Types} from "../../../constants/Types";
import StatesModal from "../../../components/StatesModal";
import MainModal from "../../../components/MainModal";
import React from "react";
import FileUpload from "../../../components/FileUpload";
import CustomTable from "../../../components/Admin/CustomTable";
import {startCase} from "lodash";
import ProgressBar from "../../../components/ProgressBar";
import useCreateChambres from "./useCreateChambres";
import MenuChambres from "../../../components/Admin/MenuChambres";

const CreateChambres = () =>{
    const {
        navigate,
        stateModal, setStateModal,
        showMainModal, setShowMainModal,
        action, setAction,
        parsedData, setParsedData,
        progressValue, setProgressValue,
        columnHelper,
        step, setStep,
        resetStateModal,
        onProgressBar,
        onSubmit,
        onCancel,
        validateData
    } = useCreateChambres();

    return(
        <MainLayout userRole={Types.ADMIN}>
            <div className={"px-10 py-2 flex flex-col items-center"}>
                <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={resetStateModal} onCancel={()=>{navigate('/admin');resetStateModal()}}/>
                <MainModal showModal={showMainModal} title={`Vous êtes sur le point ${action === "annuler" ? "d'annuler" : "de valider"} la création des chambres, êtes vous sûre de vouloir continuer ?`} onCancel={()=>{setShowMainModal(false); resetStateModal()}} onSubmit={()=>{(action === "annuler" ? onCancel() : onSubmit())}} />
            </div>
            <div className={"flex flex-col items-center justify-start w-full h-screen overflow-y-scroll bg-blue-50"}>
                <MenuChambres className={"flex justify-start md:flex-row  items-center border-b bg-white border-gray-300 shadow-sm w-full gap-3 px-4"} />
                <div className={"bg-white mt-10 w-[90%] h-[60%] p-6 rounded-xl border border-gray-300 shadow mb-16"}>
                    <div className={"flex flex-wrap px-10 h-[100%] justify-center items-center gap-5"}>
                        {
                            step === "upload" && parsedData.length <= 0 && <FileUpload setParsedData={setParsedData}/>
                        }
                        {
                            (step === "validation" || step === "creation") &&
                            <div className={"w-[350px] py-4 bg-gray-100 md:w-[400px] rounded-md flex items-center px-6"}>
                                <ProgressBar onRetry={() => {setParsedData([]); setStep("upload")}} progressValue={progressValue}/>
                            </div>
                        }
                        <div className={"w-full h-full"}>
                            {
                                step === "preview" &&
                                <CustomTable data={parsedData} columns={[
                                    ...Object.keys(parsedData[0]).map((key) =>
                                        columnHelper.accessor(key, {
                                            cell: (info) => info.getValue(),
                                            header: startCase(key),
                                            id: key,
                                        })
                                )]}/>
                            }
                        </div>
                    </div>
                </div>
                <div className={"fixed bottom-0 bg-white py-1 w-[100%] md:w-[80%] flex justify-center items-start"}>
                    <button onClick={()=>{setShowMainModal(true); setAction("valider")}} disabled={(step !== "preview")} className={`text-gray-600 ${(step !== "preview") && "text-gray-400 bg-gray-200"} hover:bg-gray-200 border border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400`}>
                        Créer Chambres
                    </button>
                    <button onClick={()=>{setShowMainModal(true); setAction("annuler")}} className={`text-white hover:bg-red-700 bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center`}>
                        Annuler
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}
export default CreateChambres;