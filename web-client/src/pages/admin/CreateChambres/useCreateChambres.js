import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import {ChambreAPI} from "../../../api/ChambreAPI";

const useCreateChambres = ()=>{
    const navigate = useNavigate();
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const [showMainModal, setShowMainModal] = useState(false);
    const [action, setAction] = useState("");
    const [parsedData, setParsedData] = useState([]);
    const [progressValue, setProgressValue] = useState(0);
    const columnHelper = createColumnHelper();
    const [step, setStep] = useState("upload");


    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
    }

    async function onProgressBar(userData, onProgress, callback) {
        const totalEntries = userData.length;
        let validEntries = 0;

        function updateProgress() {
            const progressPercentage = Math.floor((validEntries / totalEntries) * 100);
            onProgress(progressPercentage);
            setProgressValue(progressPercentage);
        }

        for (const entry of userData) {
            try {
                let result = await Promise.resolve(callback(entry));
                if (result === false) {
                    console.log("Erreur survenue à la ligne " + (validEntries + 1) + " ", entry);
                    return Math.floor((validEntries / totalEntries) * 100);
                } else {
                    validEntries++;
                }
                updateProgress();
            } catch (error) {
                console.log("Erreur survenue à la ligne " + (validEntries + 1) + " ", entry, error);
                return Math.floor((validEntries / totalEntries) * 100);
            }
        }

        return Math.floor((validEntries / totalEntries) * 100);
    }

    const onSubmit = async () => {
        setShowMainModal(false);
        if (action === "annuler") {
            setStep("upload");
            navigate("/admin/chambres");
        } else {
            setStep("creation");
            try {
                let percentage = await onProgressBar(parsedData, (percentage) => {
                    setProgressValue(percentage);
                }, handleCreateUser);

                if (percentage === 100) {
                    stateModal.type = "succes";
                    stateModal.title = "Création réussie";
                    stateModal.message = "Les chambres ont été créés avec succès.";
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                }
            } catch (error) {
                console.log("Erreur lors de la création des chambres.", error);
            }
        }
    }


    const onCancel = () =>{
        setShowMainModal(false);
        setStep("upload");
        setAction("");
        navigate("/admin/chambres");
    }

    const validateData = async (entry) => {
        setStep("validation")

        const { numero, max_place, nb_place_titulaire,	pavillon, etage, sexe } = entry;

        if (!numero || !max_place || !nb_place_titulaire || !pavillon || !etage || !sexe) {
            stateModal.type = "error";
            stateModal.title = "Erreur de création d'utilisateur";
            stateModal.message = `Les informations de l'utilisateur sont mal formatées, vérifiez la console`;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            return false;
        }
        return true;
    }


    const handleCreateUser = async (chambre) => {
        try {
            const res = await ChambreAPI.createChambre(chambre);
            return true;
        } catch (error) {
            stateModal.type = "error";
            stateModal.title = "Erreur de création d'utilisateur";
            stateModal.message = error?.response?.data?.message;
            stateModal.show = true;
            setStateModal((prevState) => ({ ...prevState, ...stateModal }));
            console.log(error);
            throw error;
        }
    };


    useEffect(() => {
        if (parsedData.length > 0){
            const processEntries = async () => {
                const percentage = await onProgressBar(parsedData, (percentage) => {
                    setProgressValue(percentage);
                }, validateData);

                if (percentage === 100) {
                    setStep("preview");
                    setProgressValue(0);
                }
            };
            processEntries();
        }
    }, [parsedData]);
    return({
        navigate,
        stateModal, setStateModal,
        showMainModal, setShowMainModal,
        action, setAction,
        parsedData, setParsedData,
        progressValue, setProgressValue,
        columnHelper,
        step, setStep,
        resetStateModal,
        onProgressBar,
        onSubmit,
        onCancel,
        validateData
    })
}

export default useCreateChambres;