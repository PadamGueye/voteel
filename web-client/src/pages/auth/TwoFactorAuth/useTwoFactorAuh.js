import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSignupContext} from "../../../context/SignupContext";
import {CompteAPI} from "../../../api/CompteAPI";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import {UserAPI} from "../../../api/UserAPI";

const useTwoFactorAuh = ()=>{
    const [otp, setOtp] = useState("");
    const [otpFailed, setOtpFailed] = useState(false);
    const [queryError, setQueryError] = useState("");
    const [querySuccess, setQuerySuccess] = useState(`Votre compte a été retrouvé avec succès. Merci de confirmer votre inscription.`);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [inputState, setInputState] = useState("error")
    const {signupData, setSignupData} = useSignupContext();
    const auth = useAuthStateContext();
    const navigate = useNavigate();



    const [resendDisabled, setResendDisabled] = useState(true);
    const [timer, setTimer] = useState(0);
    const signupStorage = JSON.parse(localStorage.getItem('two-factor-data'));


    const handleConfirmOtp = ()=>{
        if (otp.length < 8){
            setOtpFailed(true);
        }
        else{
            setIsLoading(true);
            UserAPI.verify(otp, signupStorage?.email)
                .then((res)=>{
                        auth.login(res.data);
                        auth.setUserInfo(res.data);
                        localStorage.removeItem('two-factor-data');
                        navigate(`/`)
                    if (res.data.code === 409){
                        setOtpFailed(true);
                        setQueryError(res.data.msg);
                    }
                    else{
                        setQueryError(res.data.msg);
                        setInputState("error");
                        setErrorMessage("");
                    }
                    setIsLoading(false);
                })
                .catch(error=>{
                    const statusCode = error.response?.status
                    setInputState("error");
                    setErrorMessage("Reéssayez encore !");
                    setIsLoading(false);
                    if (statusCode !== 500) {
                        setQueryError(error?.response.data?.message)
                    }else {
                        setQueryError("Une erreur est survenue, veuillez réessayer plus tard !")
                    }
                })
        }
    }

    const resendOtp = () =>{
        setIsLoading(true);
        CompteAPI.verifyIdentity(signupData.etudiant?.num_carte)
            .then((res)=>{
                if (res.data.code === 200){
                    startTimer();
                    setSignupData(res.data)
                }
            })
            .catch(error=>{
                const statusCode = error.response?.status
                setInputState("error");
                setErrorMessage("Reéssayez encore !");
                setIsLoading(false);
                if (statusCode !== 500) {
                    setQueryError(error?.response.data?.message)
                }else {
                    setQueryError("Une erreur est survenue, veuillez réessayer plus tard !")
                }
            })
    }

    const startTimer = () => {
        setTimer(30);
        setResendDisabled(true);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setResendDisabled(false);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timer]);

    const masquerEmail = (email) => {
        const atIndex = email.indexOf("@");
        if (atIndex !== -1) {
            const prefix = email.slice(0, atIndex);
            const before = prefix.slice(0, 3);
            const after = prefix.slice(prefix.length-3, prefix.length);
            const domain = email.slice(atIndex);
            return `${before}*****${after}${domain}`;
        }
        return email;
    }

    return {
        otp,
        setOtp,
        otpFailed,
        setOtpFailed,
        masquerEmail,
        handleConfirmOtp,
        setErrorMessage,
        errorMessage,
        queryError,
        setQueryError,
        querySuccess,
        setQuerySuccess,
        inputState,
        setInputState,
        isLoading,
        setIsLoading,
        resendOtp,
        timer,
        resendDisabled,
    }
}

export {useTwoFactorAuh};