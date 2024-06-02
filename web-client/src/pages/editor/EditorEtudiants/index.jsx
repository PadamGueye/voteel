import React from 'react';
import CustomTable from "../../../components/Admin/CustomTable";
import MainLayout from "../../../layout/MainLayout";
import StatesModal from "../../../components/StatesModal";
import MainModal from "../../../components/MainModal";
import {useNavigate} from "react-router-dom";
import useEditorEtudiants from "./useEditorEtudiants";
import {Types} from "../../../constants/Types";
import CustomTableSkeleton from "../../../components/CustomTableSkeleton";
import MenuRefresh from "../../../components/Admin/MenuRefresh";

const EditorEtudiants = () => {
    const {
        showMainModal, setShowMainModal,
        refresh, setRefresh,
        action,
        etudiants,
        columns,
        stateModal,
        resetStateModal,
        loading
    } = useEditorEtudiants();
    const navigate = useNavigate();

    return (
        <MainLayout userRole={Types.EDITOR}>
            <div className={"px-10 py-4 flex flex-col items-center"}>
                <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={()=>{navigate('/editor');resetStateModal()}} onCancel={resetStateModal}/>
                <MainModal showModal={showMainModal} title={`Vous êtes sur le point ${action === "annuler" ? "d'annuler" : "de valider"} une réservation, êtes vous sûre de vouloir continuer ?`} onCancel={()=>{setShowMainModal(false);}} onSubmit={()=>{ setShowMainModal(false)}} />
                <div className={"flex flex-col items-center justify-start w-full h-screen"}>
                    <MenuRefresh onRefresh={()=>{setRefresh(true)}} className={"flex justify-start md:flex-row h-[5%] items-center bg-blue-50 border-b bg-gray-5 border-gray-300 shadow-sm w-full gap-3 px-4"} />

                    <div className={"px-10 h-[90%] md:h-[90%] py-4 flex flex-col items-center"}>
                    <div className={"w-[40%] md:w-full h-full"}>
                        {
                            loading ? <CustomTableSkeleton />
                            :
                            <CustomTable data={etudiants} columns={columns}/>
                        }
                    </div>
                </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default EditorEtudiants;