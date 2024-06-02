import ListItem from "../../../components/ListItem";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../context/ContexProvider";
import MainLayout from "../../../layout/MainLayout";
import InfoChambreCard from "../../../components/InfoChambreCard";
import InfoReservationCard from "../../../components/InfoReservationCard";
import {MdOutlineBedroomChild} from "react-icons/md";
import MainModal from "../../../components/MainModal";
import StatesModal from "../../../components/StatesModal";
import useReservation from "./useReservation";
import {Types} from "../../../constants/Types";

const Reservation = () =>{
    const {
        members, setMembers,
            reservation, setReservation,
            infoChambre, setInfoChambre,
            showMainModal, setShowMainModal,
            reservationState, setReservationState,
            chambreState, setChambreState,
            stateModal, setStateModal,
            membreState, setMembreState,
            resetStateModal,
            fetchMembers,
            getInfoChambre,
            getReservation,
            handleRemove
    } = useReservation();

    const {roomReserved, setRoomReserved, codifier} = useStateContext();
    const navigate = useNavigate();


    return(
        <MainLayout userRole={Types.STUDENT} >
            <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={()=>{navigate('/');resetStateModal()}} onCancel={resetStateModal}/>
            <MainModal showModal={showMainModal} title={"Vous êtes sur le point d'annuler votre réservation en cours, êtes vous sûre de vouloir continuer ?"} onCancel={()=>{setShowMainModal(false)}} onSubmit={()=>{handleRemove(); setShowMainModal(false)}} />
            {!roomReserved ?
                (<div className={"w-full h-full flex justify-center items-center flex-col"}>
                    <MdOutlineBedroomChild className={"text-[60px] font-light text-gray-400"} />
                    <h1 className={"font-bold mt-3 text-[15px] "}>Oup's vous n'avez pas réservation en cours</h1>
                    <div className={"text-[14px] font-light mt-4 text-gray-400 w-[50%] text-center"}>
                        Réservez une chambre pour accéder à votre espace réservation. Cliquez sur le bouton ci-dessous pour commencer !                    </div>
                    <Link to={"/"} type="button" className="text-white mb-10 text-[13px] bg-blue-800 hover:bg-blue-500 mt-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 py-2 text-center">Nouvelle Réservation</Link>
                </div>)
                :
                (
                    <>
                        <div className={"w-full font-sans h-screen overflow-y-scroll mt-2 mb-16 px-4 bg-[#F2F8FF]"}>
                            <div className={"px-10 mb-5 py-2 flex flex-wrap gap-10 justify-center"}>
                                <InfoChambreCard chambreState={chambreState} infoChambre={infoChambre}/>
                                <InfoReservationCard reservationState={reservationState} reservation={reservation} infoChambre={infoChambre}/>
                            </div>
                            <div className={"px-10 py-4 mb-60"}>
                                {roomReserved && members && <ListItem reservationState={reservationState} membreState={membreState} members={members} reservations={infoChambre?.reservations}/>}
                            </div>
                        </div>
                        <div className={"fixed bottom-0 bg-white py-2 w-[100%] md:w-[80%] flex justify-center items-start"}>
                            <button type="button" disabled={codifier} onClick={()=>{setShowMainModal(true)}}
                                    className={`text-white ${codifier ? "bg-red-400" : "hover:bg-red-700 bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"} font-medium rounded-lg text-sm px-10 py-2.5 text-center`}>
                                Annuler ma réservation {codifier && "(Déja codifié)"}
                            </button>
                        </div>
                    </>
                )
            }
        </MainLayout>
    )
}

export default Reservation;