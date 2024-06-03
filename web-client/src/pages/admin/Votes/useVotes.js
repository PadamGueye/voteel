import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import UserActionColumn from "../../../components/UserActionColumn";import {ElectionAPI} from "../../../api/ElectionAPI";
import {PositionAPI} from "../../../api/PositionAPI";
import {CandidateAPI} from "../../../api/CandidateAPI";

const usePositions = () => {
    const navigate = useNavigate();
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const [showMainModal, setShowMainModal] = useState(false);
    const [action, setAction] = useState("");
    const [userList, setUserList] = useState([]);
    const columnHelper = createColumnHelper();
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [positions, setPositions] = useState([]);


    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
        setSelectedUser("");
    }

    const onDeleteUser = () => {
        stateModal.type = "loading";
        stateModal.title = "Votre demande de suppression d'utilisateur est en cours de traitement.";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
        ElectionAPI.deleteElection(selectedUser).then((res)=>{
            stateModal.type = "succes";
            stateModal.title = "Suppression réussie";
            stateModal.message = "Un utilisateur a été supprimé avec succès.";
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            setRefresh(true);
        }).catch(()=>{
            stateModal.type = "error";
            stateModal.title = "Erreur de la suppression d'un utilisateur";
            stateModal.message = `Une erreur est survenue lors de la suppression d'un utilisateur, vérifiez la console`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            setLoading(false);
        })
    }
    const onResetSecret = () => {
        /*stateModal.type = "loading";
        stateModal.title = "Votre demande de reinitilisation de secret est en cours de traitement.";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
        AdminAPI.resetSecret(selectedUser?.id).then((res)=>{
            stateModal.type = "succes";
            stateModal.title = "Opération réussie";
            stateModal.message = "Le secret d'un utilisateur a été reinialisé avec succès.";
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            setRefresh(true);
        }).catch(()=>{
            stateModal.type = "error";
            stateModal.title = "Opération échouée";
            stateModal.message = `Une erreur est survenue lors de la reinitilisation d'un secret utilisateur, vérifiez la console`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            setLoading(false);
        })
         */
    }
    useEffect(() => {
        setLoading(true);
        PositionAPI.getPositions().then((res)=>{
            setUserList([]);
            setPositions(res.data);
            setLoading(false);
            setRefresh(false);
        }).catch(()=>{
            stateModal.type = "error";
            stateModal.title = "Erreur de récuperation d'utilisateur";
            stateModal.message = `Une erreur est survenue lors de la recuperation des utilisateurs, vérifiez la console`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            setLoading(false);
            setRefresh(false);
        })
    }, [refresh]);

    useEffect(() => {
        setLoading(true);
        CandidateAPI.getCandidates().then((res)=>{
            setUserList([]);
            setCandidates(res.data)
            setLoading(false);
            setRefresh(false);
        }).catch(()=>{
            stateModal.type = "error";
            stateModal.title = "Erreur de récuperation d'utilisateur";
            stateModal.message = `Une erreur est survenue lors de la recuperation des utilisateurs, vérifiez la console`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            setLoading(false);
            setRefresh(false);
        })
    }, [refresh]);

    return({
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
        resetStateModal,
        onDeleteUser,
        onResetSecret,
        navigate
  })
}
export default usePositions;