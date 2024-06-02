import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../context/ContexProvider";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import {ChambreAPI} from "../../../api/ChambreAPI";
import {ReservationAPI} from "../../../api/ReservationAPI";

const useReservation = () =>{
    const [members, setMembers] = useState([]);
    const [reservation, setReservation] = useState({});
    const [infoChambre, setInfoChambre] = useState({});
    const [showMainModal, setShowMainModal] = useState(false);
    const [reservationState, setReservationState] = useState("");
    const [chambreState, setChambreState] = useState("");
    const [membreState, setMembreState] = useState("");
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
    }

    const navigate = useNavigate();
    const {roomReserved, setRoomReserved, codifier} = useStateContext();

    const auth = useAuthStateContext();
    const fetchMembers = (id) => {
        setMembreState("loading")
        ChambreAPI.getReserved(id)
            .then((res) => {
                setMembreState("")
                setMembers(res.data.membres)
            })
            .catch(() => {
                setMembreState("error")
            })
    }
    const getInfoChambre = (id) => {
        setChambreState("loading");
        ChambreAPI.getInfoChambre(id)
            .then((res) => {
                setInfoChambre(res.data);
                setChambreState("");
            })
            .catch(() => {
                setChambreState("error");
            })
    }

    const getReservation = () => {
        setReservationState("loading");
        ReservationAPI.getReservationByCompte(auth.user.compte)
            .then((res) => {
                setReservation(res.data.reservation)
                setReservationState("");
            })
            .catch(() => {
                setReservationState("error");
            })
    }
    const handleRemove = () => {
        stateModal.type = "loading";
        stateModal.title = "Votre demande d'annulation est en cours de traitement.";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
        ReservationAPI.annulerReservation(auth.user.num_carte)
            .then((res) => {
                if (res.data.code === 200) {
                    localStorage.setItem('room', null);
                    setRoomReserved(null);
                    stateModal.type = "succes";
                    stateModal.title = "Annulation réussie";
                    stateModal.message = "Votre demande d'annulation a été traitée avec succès.";
                    stateModal.show = true;
                    setStateModal((prevState) => ({...prevState, ...stateModal}));
                }
                else if (res.data.code === 500) {
                    stateModal.type = "error";
                    stateModal.title = "Annulation échouée";
                    stateModal.message = res.data.msg;
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
                }
            })
            .catch((e) => {
                stateModal.type = "error";
                stateModal.title = "Annulation échouée";
                stateModal.message = "Oops ! Quelque chose a mal tourné. Veuillez réessayer plus tard ou contactez le support technique"
                stateModal.show = true;
                setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
            })
    }

    useEffect(() => {
        if (roomReserved) {
            fetchMembers(roomReserved._id)
            getInfoChambre(roomReserved._id);
        }
        if (auth.user){
            getReservation();
        }
    }, [roomReserved, auth.user]);


    return({
        members, setMembers,
        reservation, setReservation,
        infoChambre, setInfoChambre,
        showMainModal, setShowMainModal,
        reservationState, setReservationState,
        stateModal, setStateModal,
        chambreState, setChambreState,
        membreState, setMembreState,
        resetStateModal,
        navigate,
        auth,
        fetchMembers,
        getInfoChambre,
        getReservation,
        handleRemove
    });
}

export default useReservation;