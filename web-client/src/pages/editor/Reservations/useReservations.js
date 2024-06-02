import React, {useEffect, useState} from "react";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import {startCase} from "lodash";
import ValidationColumn from "../../../components/Admin/ValidationColumn";
import {createColumnHelper} from "@tanstack/react-table";
import {CompteAPI} from "../../../api/CompteAPI";
import {ChambreAPI} from "../../../api/ChambreAPI";
import {ReservationAPI} from "../../../api/ReservationAPI";
import {UserAPI} from "../../../api/UserAPI";

const useReservations = ()=>{
    const columnHelper = createColumnHelper();
    const [pav, setPav] = useState("A");
    const [rooms, setRooms] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState([]);
    const [numCarte, setNumCarte] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);


    const auth = useAuthStateContext();
    const [showMainModal, setShowMainModal] = useState(false);
    const [action, setAction] = useState("");
    const [etudiants, setEtudiants] = useState([]);
    const [columns, setColumns] = useState([]);
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});

    const [message, setMessages] = useState("");
    const [compte, setCompte] = useState(null);
    const [request, setRequest] = useState(null);
    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""};
        setAction("");
        setNumCarte("");
        setStateModal(resetState);
    }

    const handleRemove = () => {
        stateModal.type = "loading";
        stateModal.title = "Votre demande d'annulation est en cours de traitement.";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));

        ReservationAPI.annulerReservation(numCarte)
            .then((res) => {
                if (res.data.code === 200) {
                    setRefresh(true);
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
            .catch(() => {
                stateModal.type = "error";
                stateModal.title = "Annulation échouée";
                stateModal.message = "Oops ! Quelque chose a mal tourné. Veuillez réessayer plus tard ou contactez le support technique"
                stateModal.show = true;
                setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
            })
    }

    const handleValidate = () => {
        stateModal.type = "loading";
        stateModal.title = "Votre demande de validation est en cours de traitement.";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));

        ReservationAPI.validerReservation(numCarte)
            .then((res) => {
                if (res.data.code === 200) {
                    setRefresh(true);
                    stateModal.type = "succes";
                    stateModal.title = "Validation réussie";
                    stateModal.message = "Votre demande de validation a été traitée avec succès.";
                    stateModal.show = true;
                    setStateModal((prevState) => ({...prevState, ...stateModal}));
                }
                else if (res.data.code === 500) {
                    stateModal.type = "error";
                    stateModal.title = "Validation échouée";
                    stateModal.message = res.data.msg;
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
                }
            })
            .catch(() => {
                stateModal.type = "error";
                stateModal.title = "Validation échouée";
                stateModal.message = "Oops ! Quelque chose a mal tourné. Veuillez réessayer plus tard ou contactez le support technique"
                stateModal.show = true;
                setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
            })
    }

    const getInfo = (num_carte) => {
        CompteAPI.getByCarte(num_carte)
            .then((res) => {
                if (res.data.compte && res.data.compte.reserver)
                    setCompte(res.data.compte);
                else {
                    setCompte(null);
                    setMessages("en attente")
                }
            })
            .catch((error) => {
                const statusCode = error.response?.status
                if (statusCode !== 500) {
                    setMessages(error?.response.data?.message)
                }else {
                    setMessages("Une erreur est survenue, veuillez réessayer plus tard !")
                }
            })
    }

    const getEtudiants = () => {
        setLoading(true);
        UserAPI.getStudents()
            .then((res) => {
            res.data.etudiant &&
            res.data.etudiant?.map((etu)=>{
                if (etu?.chambre !== ("non codifié")){
                    setEtudiants((prevState)=>([...prevState, etu]))
                }
            })
            res.data.etudiant &&
            setColumns([
                ...Object.keys(res.data.etudiant[0]).map((key) =>
                    columnHelper.accessor(key, {
                        cell: (info) => info.getValue(),
                        header: startCase(key),
                        id: key,
                    })
                ), {
                    header: "Réservations",
                    id: "actions",
                    accessorKey : "actions",
                    cell: ({row}) => <ValidationColumn num_carte={row.original.num_carte} onClick={()=>setShowMainModal(true)} setAction={setAction} setNumCarte={setNumCarte} />
                }])
                setLoading(false);
            }).catch(()=>{
            setLoading(false);
        })
    }



    const fetchRooms = () => {
        if (auth.user)
            ChambreAPI.getChambres()
                .then((res) => {
                    setRooms(res.data.chambres)
                })
                .catch((error) => {
                })
    }

    const fetchMembers = (id) => {
        ChambreAPI.getReserved(id)
            .then((res) => {
                setMembers(res.data.membres)
            })
            .catch((error) => {
            })
    }

    useEffect(() => {
        setRefresh(false)
        fetchRooms();
        getEtudiants();
    }, [refresh]);


    useEffect(() => {
        if (rooms)
            setSelectedRoom(rooms.filter(({pavillon}) => (pavillon === pav)).sort((a,b) => {
                return a.numero - b.numero
            }))
    }, [pav, rooms])


    return({
        pav, setPav,
        rooms, setRooms,
        members, setMembers,
        selectedRoom, setSelectedRoom,
        showMainModal, setShowMainModal,
        action, setAction,
        etudiants, setEtudiants,
        columns, setColumns,
        stateModal, setStateModal,
        numCarte, setNumCarte,
        loading, setLoading,
        refresh, setRefresh,
        resetStateModal,
        handleRemove,
        handleValidate,
        getEtudiants,
        fetchRooms,
        fetchMembers,
        getInfo,
        message, setMessages,
        compte, setCompte,
        request, setRequest
    })
}

export default useReservations;