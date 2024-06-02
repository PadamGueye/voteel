import {redirect, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import {ChambreAPI} from "../../../api/ChambreAPI";

const useEditChambre = ()=>{
    const navigate = useNavigate();
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const [showMainModal, setShowMainModal] = useState(false);
    const [preview, setPreview] = useState(false);
    const [action, setAction] = useState("");
    const emptyChambreData = {numero : 0, max_place : 0 ,	nb_place_titulaire : 0,	pavillon : "A", etage : "0",	sexe : "M", vue: ""};
    const [chambreData, setChambreData] = useState(emptyChambreData);
    const [loading, setLoading] = useState(false);
    const [formatedData, setFormatedData] = useState({});
    const {chambreId} = useParams();
    const [validateMessage, setValidateMessage] = useState("");
    const userContexte = useAuthStateContext()?.user;

    const fetchData = async () => {
        setLoading(true);
        try {
            ChambreAPI.getById(chambreId).then((res)=>{
                setChambreData(res.data?.chambre);
            })
        }catch(error){
            stateModal.type = "error";
            stateModal.title = "Erreur de la recupération de la chambre";
            stateModal.message = `Erreur lors de la recupération de la chambre, veuillez reéssayer !`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
    }

    const validateData = async (entry) => {
        setFormatedData({
            numero: entry.numero,
            max_place: entry.max_place,
            nb_place_titulaire: entry.nb_place_titulaire,
            pavillon: entry.pavillon,
            etage: entry.etage,
            sexe: entry.sexe ? entry.sexe : "M",
            vue : entry.vue
        })
        return true;
    }

    const onSubmit = async () => {
        setShowMainModal(false);
        stateModal.type = "loading";
        stateModal.title = "La modification de la chambre est en cours de traitement.";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
        if (action === "annuler") {
            navigate("/chambres");
        }
        else {
            const result = await Promise.resolve(validateData(chambreData));
            if (result === true){
                ChambreAPI.updateChambre(chambreId, formatedData).then(
                    (res)=>{
                        setFormatedData({});
                        setChambreData(emptyChambreData);
                        stateModal.type = "succes";
                        stateModal.title = "Modification réussie";
                        stateModal.message = "Les informations la chambre ont été modifiées avec succès.";
                        stateModal.show = true;
                        setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                        setPreview(false);
                    }).catch((error)=>{
                    stateModal.type = "error";
                    stateModal.title = "Erreur de modification d'utilisateur";
                    stateModal.message = error?.response?.data?.message;
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                    console.error(error);
                })
            }
        }
    }

    const onPreview = async () => {
        setShowMainModal(false);
        const result = await validateData(chambreData);
        if (result === true){
            setPreview(true);
        }
    }
    const onCancel = () =>{
        setShowMainModal(false);
        setAction("");
        redirect("/admin/chambres")
    }

    return({
        navigate,
        stateModal, setStateModal,
        showMainModal, setShowMainModal,
        preview, setPreview,
        action, setAction,
        emptyChambreData,
        chambreData, setChambreData,
        formatedData, setFormatedData,
        validateMessage, setValidateMessage,
        userContexte,
        resetStateModal,
        validateData,
        onPreview,
        onSubmit,
        onCancel
    })
}
export default useEditChambre;