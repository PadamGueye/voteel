import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Types, UserType} from "../../../constants/Types";
import {UserAPI} from "../../../api/UserAPI";
import {useAuthStateContext} from "../../../context/AuthContextProvider";

const useEditUser = ()=>{
    const navigate = useNavigate();
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const [showMainModal, setShowMainModal] = useState(false);
    const [preview, setPreview] = useState(false);
    const [action, setAction] = useState("");
    const emptyUserData = {num_carte : "", role : Types.BASIC ,	email : "",	prenom : "", nom : "",	type : UserType.CEE, fonction : "",	tel : "", date_naissance : "",	lieu_naissance : "", num_identite : "",	nationalite : "", departement : "Génie Informatique", option : "", niveau : "1", sexe : "M"};
    const [userData, setUserData] = useState(emptyUserData);
    const [loading, setLoading] = useState(false);
    const [formatedData, setFormatedData] = useState({});
    const {userId} = useParams();
    const [validateMessage, setValidateMessage] = useState("");
    const userContexte = useAuthStateContext()?.user;

    const grantAccess = async ()=>{
        if (Types.ADMIN === userContexte?.role){
            return true;
        }
        else{
            if ( userId === userContexte?._id){
                return true
            }
        }
        return false
    }
    const fetchData = async () => {
        const result = await grantAccess();
        if (result === true) {
            setLoading(true);
            try {
                UserAPI.getUserById(userId).then((res)=>{
                    setUserData(res.data.user);
                })
            }catch(error){
                stateModal.type = "error";
                stateModal.title = "Erreur de la recupération d'utilisateur";
                stateModal.message = `Erreur lors de la recupération de utilisateur, veuillez reéssayer !`;
                stateModal.show = true;
                setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            }
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
        const { role } = entry;
        if (role !== Types.BASIC && role !== Types.EDITOR  && role !==Types.ADMIN) {
            stateModal.type = "error";
            stateModal.title = "Erreur de création d'utilisateur"
            stateModal.message = `Le rôle de l'utilisateur est différent de student, vérifiez la console.`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            return false;
        }
        if (role === Types.BASIC) {
            const { num_carte, email, prenom, nom, tel, niveau, sexe } = entry;

            if (!num_carte || !email || !prenom || !nom || !tel || !niveau || !sexe) {
                console.log(entry);
                stateModal.type = "error";
                stateModal.title = "Erreur de la mise à jour d'utilisateur";
                stateModal.message = `Les informations sont incomplétes veuillez remplir tous les champs, vérifiez la console`;
                stateModal.show = true;
                setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                return false;
            }
            setFormatedData({
                num_carte: entry.num_carte,
                role: Types.BASIC,
                email: entry.email,
                prenom: entry.prenom,
                nom: entry.nom,
                tel: entry.tel,
                date_naissance: entry.date_naissance,
                lieu_naissance: entry.lieu_naissance,
                num_identite: entry.num_identite,
                nationalite: entry.nationalite,
                departement: entry.departement,
                option: entry.option,
                niveau: entry.niveau,
                sexe: entry.sexe ? entry.sexe : "M"
            })
            setValidateMessage("La validation des informations de l'utilisateur à réussie, continuer !");
        }else if(role === Types.EDITOR  || role ===Types.ADMIN) {
            setFormatedData({
                num_carte : entry.num_carte,
                email: entry.email,
                prenom : entry.prenom,
                nom : entry.nom,
                role: entry.role,
                tel: entry.tel,
                type: entry.type,
                fonction: entry.fonction
            })
            setValidateMessage("La validation des informations de l'utilisateur à réussie, continuer !");
        }
        return true;
    }

    const onSubmit = async () => {
        setShowMainModal(false);
        stateModal.type = "loading";
        stateModal.title = "La modification de l'utilisateur est en cours de traitement.";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
        if (action === "annuler") {
            navigate("/");
        }
        else {
            const result = await Promise.resolve(validateData(userData));
            if (result === true){
                UserAPI.updateUser(userId, formatedData).then(
                    (res)=>{
                        setFormatedData({});
                        setUserData(emptyUserData);
                        stateModal.type = "succes";
                        stateModal.title = "Modification réussie";
                        stateModal.message = "Les informations de l'utilisateur ont été modifiées avec succès.";
                        stateModal.show = true;
                        setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                        setPreview(false);
                    }).catch((error)=>{
                    stateModal.type = "error";
                    stateModal.title = "Erreur de modification d'utilisateur";
                    stateModal.message = `Erreur lors de la modification de utilisateur, vérifiez la console.`;
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                    console.error(error);
                })
            }
        }
    }

    const onPreview = async () => {
        setShowMainModal(false);
        const result = await validateData(userData);
        if (result === true){
            setPreview(true);
        }
    }
    const onCancel = () =>{
        setShowMainModal(false);
        setAction("");
        navigate("/");
    }

    return({
        navigate,
        stateModal, setStateModal,
        showMainModal, setShowMainModal,
        preview, setPreview,
        action, setAction,
        emptyUserData,
        userData, setUserData,
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
export default useEditUser;