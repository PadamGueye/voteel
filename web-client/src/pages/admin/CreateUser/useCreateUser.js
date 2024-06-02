import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Types, UserType} from "../../../constants/Types";
import {UserAPI} from "../../../api/UserAPI";

const useCreateUser = ()=>{
    const navigate = useNavigate();
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const [showMainModal, setShowMainModal] = useState(false);
    const [preview, setPreview] = useState(false);
    const [action, setAction] = useState("");
    const emptyUserData = {role : Types.ADMIN ,	email : "",	firstName : "", lastName : "", phone : "", password : "Passer123"};
    const [userData, setUserData] = useState(emptyUserData);
    const [formatedData, setFormatedData] = useState({});

    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
    }

    const validateData = async (entry) => {
        const { role, email , firstName, lastName, phone, password} = entry;

        if (!role || !email || !firstName || !lastName || !phone || !password) {
            stateModal.type = "error";
            stateModal.title = "Erreur de création d'utilisateur";
            stateModal.message = `Les informations de l'utilisateur sont mal formatées, vérifiez la console`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            return false;
        }
        setFormatedData({
            role : entry.role,
            email : entry.email,
            firstName: entry.firstName,
            lastName : entry.lastName,
            phone : entry.phone,
            password : entry.password
        })
        return true;
    }

    const onPreview = async () => {
        setShowMainModal(false);
        const result = await validateData(userData);
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
            navigate("/admin");
        }
        else {
            UserAPI.createUser(formatedData).then(
                (res)=>{
                    setFormatedData({});
                    setUserData(emptyUserData);
                    stateModal.type = "succes";
                    stateModal.title = "Création réussie";
                    stateModal.message = "Les utilisateurs ont été créés avec succès.";
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                    setPreview(false);
                })
                .catch((error)=>{
                    stateModal.type = "error";
                    stateModal.title = "Erreur de création d'utilisateur";
                    stateModal.message = `Erreur lors de la création des utilisateurs, vérifiez la console.`;
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                    console.error(error);
                    throw error;
                })
        }
    }


    const onCancel = () =>{
        setShowMainModal(false);
        setAction("");
        navigate("/admin");
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
        resetStateModal,
        validateData,
        onPreview,
        onSubmit,
        onCancel
    })
}
export default useCreateUser;