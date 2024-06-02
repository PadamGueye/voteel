import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ChambreAPI} from "../../../api/ChambreAPI";

const useChambre = ()=>{
    const navigate = useNavigate();
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const [showMainModal, setShowMainModal] = useState(false);
    const [preview, setPreview] = useState(false);
    const [action, setAction] = useState("");
    const emptyChambreData = {numero : 0, max_place : 0 ,	nb_place_titulaire : 0,	pavillon : "A", etage : "0",	sexe : "M", vue: ""};
    const [chambreData, setChambreData] = useState(emptyChambreData);
    const [formatedData, setFormatedData] = useState({});

    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
    }

    const validateData = async (entry) => {
        const { numero, max_place, nb_place_titulaire,	pavillon, etage, sexe } = entry;

            if (!numero || !max_place || !nb_place_titulaire || !pavillon || !etage || !sexe) {
                stateModal.type = "error";
                stateModal.title = "Erreur de création d'utilisateur";
                stateModal.message = `Les informations de l'utilisateur sont mal formatées, vérifiez la console`;
                stateModal.show = true;
                setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                return false;
            }
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

    const onPreview = async () => {
        setShowMainModal(false);
        const result = await validateData(chambreData);
        if (result === true){
            setPreview(true);
        }
    }
    const onSubmit = async () => {
        setShowMainModal(false);
        stateModal.type = "loading";
        stateModal.title = "La création de l'utilisateur est en cours de traitement.";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
        if (action === "annuler") {
            navigate("/admin/chambres");
        }
        else {
            ChambreAPI.createChambre(formatedData).then(
                (res)=>{
                    setFormatedData({});
                    setChambreData(emptyChambreData);
                    stateModal.type = "succes";
                    stateModal.title = "Création réussie";
                    stateModal.message = "La chambre à été créée avec succès.";
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                    setPreview(false);
                })
                .catch((error)=>{
                    stateModal.type = "error";
                    stateModal.title = "Erreur de création de la chambre";
                    stateModal.message = `Une erreur est survenue lors de la création des chambres, vérifiez la console`;
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                    console.log(error);
                })
        }
    }


    const onCancel = () =>{
        setShowMainModal(false);
        navigate('/admin/chambres')
        setAction("");
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
        resetStateModal,
        validateData,
        onPreview,
        onSubmit,
        onCancel
    })
}
export default useChambre;