import MainLayout from "../../layout/MainLayout";
import {Types} from "../../constants/Types";
import StatesModal from "../../components/StatesModal";
import MainModal from "../../components/MainModal";
import React, {useEffect, useState} from "react";
import useVotes from "./useVotes";
import CandidateCard from "../../components/candidateCard";
import {useParams} from "react-router-dom";

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
            positions, setPositions,
            candidates, setCandidates,
            selectedCandidates, setSelectedCandidates,
            handleSelect,
            resetStateModal,
            onDeleteUser,
            onResetSecret,
            navigate
        } = useVotes();

    return(
        <div>
            <div className={"px-10 py-2 flex flex-col items-center"}>
                <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={()=>{navigate('/admin');resetStateModal()}} onCancel={resetStateModal}/>
                <MainModal showModal={showMainModal} title={`Vous êtes sur le point de voter pour les elections, êtes vous sûre de vouloir continuer ?`} onCancel={()=>{setShowMainModal(false); resetStateModal()}} onSubmit={()=>{ setShowMainModal(false);  onResetSecret();}} />
            </div>
            <div className="flex flex-col items-center justify-start w-full h-screen bg-blue-50 p-4 overflow-y-scroll mb-32">
                <h2 className="text-3xl text-center font-bold mb-8">ELECTION VOTEEL</h2>
                {positions.map((position) => (
                    <div key={position.id} className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{position.name.toUpperCase()}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {candidates
                                .filter(candidate => candidate.id_position === position.id)
                                .map(candidate => (
                                    <CandidateCard
                                        key={candidate.id}
                                        candidate={candidate}
                                        isSelected={selectedCandidates[position.id] === candidate.id}
                                        onSelect={() => handleSelect(position.id, candidate.id)}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={"fixed bottom-0 bg-white py-2 w-[100%] md:w-[80%] flex justify-center items-start"}>
                <button onClick={()=>{{
                        setShowMainModal(true);
                        setAction("valider")
                    }
                }} className={`text-gray-600 hover:bg-gray-200 border border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400`}>
                    Voter
                </button>
            </div>
        </div>
    )
}
export default Position;