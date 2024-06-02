import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import {ChambreAPI} from "../../../api/ChambreAPI";
import getNiveauEtage from "../../../utils/getNiveauEtage";
import ChambreActionColumn from "../../../components/ChambreActionColumn";

const useChambres = () => {
    const navigate = useNavigate();
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const [showMainModal, setShowMainModal] = useState(false);
    const [action, setAction] = useState("");
    const [chambreList, setChambreList] = useState([]);
    const columnHelper = createColumnHelper();
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [deletedChambre, setDeletedChambre] = useState("");


    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
        setDeletedChambre("");
    }

    const onDeleteChambre = () => {
        ChambreAPI.deleteChambre(deletedChambre).then((res)=>{
            stateModal.type = "succes";
            stateModal.title = "Suppression réussie";
            stateModal.message = "Une chambre a été supprimé avec succès.";
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            setRefresh(true);
        }).catch((error)=>{
            stateModal.type = "error";
            stateModal.title = "Erreur de la suppression d'une chambre";
            stateModal.message = `Une erreur est survenue lors de la suppression des chambres, vérifiez la console`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            setLoading(false);
        })
    }
    useEffect(() => {
        setLoading(true);
        ChambreAPI.getChambres().then((res)=>{
            setChambreList([]);
            res.data?.chambres.map((chambre)=>{
                const mappedChambre = {
                    numero: chambre?.numero,
                    pavillon: chambre?.pavillon,
                    etage: getNiveauEtage(chambre?.etage),
                    max_place: chambre?.max_place,
                    place_titulaire: chambre?.nb_place_titulaire,
                    vue: chambre?.vue,
                    genre: chambre?.sexe === 'M' ? "Homme" : "Femme",
                    disponible: <div className={"flex justify-center items-center gap-3"}><div className={`h-[14px] justify-center items-center  ${(chambre?.nb_place > 0) ? "bg-green-500" : "bg-red-600"} flex justify-center items-center w-[14px] rounded`}></div></div> ,
                    action : <ChambreActionColumn
                        onEdit={()=>{navigate(`/admin/edit-room/${chambre?._id}`)}}
                        onDelete={()=>{setShowMainModal(true); setDeletedChambre(chambre?._id); setAction("delete")}}
                        onView={()=>{}} />
                }
                setChambreList((prevUserList) => prevUserList.concat(mappedChambre));
            })
            setLoading(false);
            setRefresh(false);
        }).catch((error)=>{
            console.log(error)
            stateModal.type = "error";
            stateModal.title = "Erreur de récuperation des chambre";
            stateModal.message = `Une erreur est survenue lors de la recuperation des chambres, vérifiez la console`;
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
        chambreList, setChambreList,
        columnHelper,
        loading, setLoading,
        refresh, setRefresh,
        deletedUser: deletedChambre, setDeletedUser: setDeletedChambre,
        resetStateModal,
        onDeleteChambre,
        navigate
  })
}
export default useChambres;