import {useEffect, useState} from "react";
import {useSignupContext} from "../../../../context/SignupContext";
import {useNavigate} from "react-router-dom";
import {CompteAPI} from "../../../../api/CompteAPI";
import {useStateContext} from "../../../../context/ContexProvider";
import {useAuthStateContext} from "../../../../context/AuthContextProvider";

const useComplete = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [password2, setPassword2] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [alertInfo, setAlertInfo] = useState(true);
    const [loading, setLoading] = useState(false);
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [queryError, setQueryError] = useState("");
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,24}$/;
    const {setRoomReserved, roomReserved,setCodifier} = useStateContext();
    const [token, setToken] = useState("");
    const auth = useAuthStateContext();
    const signupStorage = JSON.parse(localStorage.getItem('signup-data'))?.etudiant;


    const navigate = useNavigate();

    const {signupData, setSignupData} = useSignupContext();

    useEffect(()=>{
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password2 === password);
    },[password, password2]);

    useEffect(() => {
        if (password && !focus1 && !validPassword){
            setAlertInfo(true)
        }
    }, [password, focus1, validPassword]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleConfirmPassword = ()=>{
        if (!validPassword){
            setQueryError("Le format du mot de passe est invalide !");
        }
        else if(!validMatch){
            setQueryError("Les mots de passes saisis ne sont pas identiques !")
        }
        else{
            setLoading(true);
            CompteAPI.setPassword(signupStorage?.num_carte, password)
                .then((res)=>{
                    if (res.status === 200){
                        auth.login(res.data.user);
                        auth.setUserInfo(res.data?.user);
                        setRoomReserved(res.data?.chambre);
                        setCodifier(res.data?.codifier);
                        localStorage.setItem('room', JSON.stringify(res.data?.chambre));
                        localStorage.setItem('codifier', JSON.stringify(res.data.codifier));
                        setLoading(false);
                        (res.data?.new) ? navigate(`/edit-user/${res.data.user._id}`) : navigate(`/`);
                        localStorage.removeItem('signup-data');
                    }
                    else{
                        setQueryError(res.data?.msg);
                    }
                    setLoading(false);
                })
                .catch(error=>{
                    const statusCode = error.response?.status
                    if (statusCode !== 500) {
                        setLoading(false)
                        setQueryError(error?.response.data?.message)
                    }else {
                        setQueryError("Une erreur est survenue, veuillez réessayer plus tard !")
                        setLoading(false)
                    }
                })
        }
    }

    return({
        showPassword, setShowPassword,
        showPassword2, setShowPassword2,
        validPassword, setValidPassword,
        password, setPassword,
        password2, setPassword2,
        alertInfo, setAlertInfo,
        validMatch, setValidMatch,
        focus1, setFocus1,
        focus2, setFocus2,
        queryError, setQueryError,
        PWD_REGEX,
        togglePasswordVisibility,
        togglePasswordVisibility2,
        loading, setLoading,
        handleConfirmPassword
    })
}
export default useComplete;