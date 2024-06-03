import MainLayout from "../../../layout/MainLayout";
import {Types} from "../../../constants/Types";
import StatesModal from "../../../components/StatesModal";
import MainModal from "../../../components/MainModal";
import React from "react";
import CustomTable from "../../../components/Admin/CustomTable";
import {startCase} from "lodash";
import CustomTableSkeleton from "../../../components/CustomTableSkeleton";
import useElections from "./useCandidate";
import MenuElections from "../../../components/Admin/MenuElections";
import MenuPositions from "../../../components/Admin/MenuPositions";
import usePosition from "./useCandidate";

const Position = () =>{
    const {
            stateModal, setStateModal,
            showMainModal, setShowMainModal,
            action, setAction,
            userList, setUserList,
            columnHelper,
            loading, setLoading,
            refresh, setRefresh,
            selectedUser, setSelectedUser,
            resetStateModal,
            onDeleteUser,
            onResetSecret,
            navigate
        } = usePosition();

    return(
        <MainLayout userRole={Types.ADMIN}>
            <div className={"px-10 py-2 flex flex-col items-center"}>
                <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={()=>{navigate('/admin');resetStateModal()}} onCancel={resetStateModal}/>
                <MainModal showModal={showMainModal} title={`Vous êtes sur le point ${action === "delete" ? "de supprimer" : "de reinitialiser le secret d'"} un utilisateur, êtes vous sûre de vouloir continuer ?`} onCancel={()=>{setShowMainModal(false); resetStateModal()}} onSubmit={()=>{ setShowMainModal(false); action === "delete" ? onDeleteUser() : onResetSecret();}} />
            </div>
            <div className={"flex flex-col items-center justify-start w-full h-screen"}>
                <MenuPositions onRefresh={()=>{setRefresh(true)}} className={"flex justify-start md:flex-row h-[5%] items-center bg-blue-50 border-b bg-gray-5 border-gray-300 shadow-sm w-full gap-3 px-4"} />
                <div className={"px-10 h-[90%] py-4 flex flex-col items-center"}>
                    <div className={"w-[40%] md:w-full h-full"}>
                        {
                            loading ? <CustomTableSkeleton />
                                :
                            userList.length > 0 &&
                            <CustomTable data={userList} columns={[
                                ...Object.keys(userList[0]).map((key) =>
                                    columnHelper.accessor(key, {
                                        cell: (info) => info.getValue(),
                                        header: startCase(key),
                                        id: key,
                                    })
                                )]}
                            />
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default Position;