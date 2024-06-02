import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import {CompteAPI} from "../../../api/CompteAPI";
import {Types} from "../../../constants/Types";
import {UserAPI} from "../../../api/UserAPI";

const UseSignin = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [focus1, setFocus1] = useState(false);
    const [queryError, setQueryError] = useState("");
    const [emailAdress, setEmailAdress] = useState("");
    const [inputState, setInputState] = useState('typing');
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,24}$/;
    const navigate = useNavigate();


    const auth = useAuthStateContext();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const setFormatNumber = (numberStudent) =>{
        setEmailAdress(String(numberStudent).toLowerCase());
    }

    const handleEmailChange = (e)=>{
        const newValue = e.target.value;
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        setFormatNumber(newValue);

        if (!emailRegex.test(newValue)) {
            setInputState('error');
        } else {
            setInputState('valid');
        }
    }

    const handleSignin = () => {
        if (!emailAdress || !password) {
            setQueryError("Veuillez remplir tous les champs");
            setInputState("error");
        }
        else if (inputState !== "valid"){
            if (inputState === "typing"){
                setInputState("error");
                setQueryError("HellloAdresse email ou mot de passe incorrecte, réssayez !!")}
        }
        else if (!(PWD_REGEX.test(password))){
            setQueryError("PadamAdresse email ou mot de passe incorrecte, réssayez !");
        }
        else{
            setLoading(true)
            UserAPI.login(emailAdress, password)
                .then((res) => {
                    console.log("send wait")
                    if (res.status === 200) {
                        console.log("send Okay")
                        setLoading(false);
                        localStorage.setItem('two-factor-data', JSON.stringify(res.data.user));
                        navigate("/signin/two-factor-verification");
                    }
                }).catch((error) => {
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


    useEffect(() => {
        localStorage.removeItem('two-factor-data');
        if (auth.user) {
            setLoading(false)
            if (auth.user?.role === Types.ADMIN) {
                navigate('/admin');
            }
            else if (auth.user?.role === Types.EDITOR) {
                navigate('/editor');
            }
            else if (auth.user?.role === Types.STUDENT) {
                if (false)
                navigate('/student/reservation')
                else{
                    navigate("/student")
                }
            }
            else{
                //auth.logout()
            }
        }
    }, [auth.user]);


    return({
        showPassword, setShowPassword,
        password, setPassword,
        focus1, setFocus1,
        queryError, setQueryError,
        togglePasswordVisibility,
        loading, setLoading,
        handleSignin,
        handleEmailChange,
        emailAdress, setEmailAdress,
        inputState, setInputState,
    })
}
export default UseSignin;