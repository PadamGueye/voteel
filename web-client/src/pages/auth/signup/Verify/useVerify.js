import {useState} from "react";
import {useSignupContext} from "../../../../context/SignupContext";
import {useNavigate} from "react-router-dom";
import {CompteAPI} from "../../../../api/CompteAPI";

const useVerify = ()=>{
    const [studentNumber, setStudentNumber] = useState("");
    const [inputState, setInputState] = useState('typing');
    const MAX_CHAR = 9;
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const {signupData, setSignupData} = useSignupContext();
    const [queryError, setQueryError] = useState("");
    const [isLoading, setLoading] = useState(false);

    const handleVerifyNumber = ()=>{
        if (inputState !== "valid"){
            if (inputState === "typing"){
                setInputState("error");
                setErrorMessage("Le format n'est pas correcte verifier la longueur du numero")
            }
        }
        else{
            setLoading(true);
            CompteAPI.verifyIdentity(studentNumber)
                .then((res)=>{
                    if (res.data.code === 200){
                        setSignupData(res.data);
                        localStorage.setItem('signup-data', JSON.stringify(res.data));
                        navigate("/signup/verifyOtp");
                    }
                    else{
                        setQueryError(res.data.msg);
                        setInputState("error");
                        setErrorMessage("Reéssayez encore !");
                    }
                    setLoading(false);
                })
                .catch(error=>{
                    const statusCode = error.response?.status
                    setInputState("error");
                    setErrorMessage("Reéssayez encore !");
                    setLoading(false);
                    if (statusCode !== 500) {
                        setQueryError(error?.response.data?.message)
                    }else {
                        setQueryError("Une erreur est survenue, veuillez réessayer plus tard !")
                    }
                })
        }
    }
    const setFormatNumber = (numberStudent) =>{
        setStudentNumber(String(numberStudent).toUpperCase());
    }

    const handleNumberChange = (e)=>{
        const newValue = e.target.value;
        setFormatNumber(newValue);
        const regex1 = /[^A-Z0-9]/i;

        if(regex1.test(newValue)){
            setErrorMessage("Le numéro saisi contient au moins un caractère non accepté.");
            setInputState('error');
        }else if (newValue.length < MAX_CHAR){
            setErrorMessage("");
            setInputState('typing');
        }else{
            setErrorMessage("");
            setInputState('valid');
        }
    }
    return {
        studentNumber,
        setStudentNumber,
        setFormatNumber,
        handleNumberChange,
        handleVerifyNumber,
        inputState,
        setInputState,
        errorMessage,
        setErrorMessage,
        queryError,
        setQueryError,
        isLoading
    }
}

export {useVerify};