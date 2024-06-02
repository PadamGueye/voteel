import AuthHeader from "../AuthHeader";
import ErrorAlerte from "../../../components/ErrorAlerte";
import {RiEyeCloseFill, RiEyeFill} from "react-icons/ri";
import ButtonSubmit from "../../../components/ButtonSubmit";
import {Link} from "react-router-dom";
import useSgnin from "./useSignin";
import {useEffect} from "react";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import etudiantImage from "../../../assets/etudiants.png"

const Signin = ()=>{
    const {
        showPassword, setShowPassword,
        password, setPassword,
        setFocus1,
        queryError, setQueryError,
        togglePasswordVisibility,
        loading, setLoading,
        handleEmailChange,
        emailAdress, setEmailAdress,
        inputState,
        handleSignin,
    } = useSgnin()

    const auth = useAuthStateContext()
    useEffect(() => {
        //auth.logout();
    }, []);
    return(
        <div>
            <AuthHeader/>
            <div className="relative top-10 w-full md:h-full flex justify-center items-center">
                <div className="md:w-[50%]  hidden md:flex items-center justify-center self-center md:pr-10">
                    <div className="w-[50%] fixed top-0 h-screen bg-blue-50 md:flex justify-center items-center">
                        <img src={etudiantImage} alt={"illustration"} className={"w-[80%] h-[70%]"}/>
                    </div>
                </div>
                <div className="mt-10 w-[70%] flex items-center md:mt-1 md:w-[50%] md:p-5 flex-col md:justify-center">
                    {
                        queryError && <ErrorAlerte id="alert-1" text={queryError} handleClose={()=>{setQueryError("")}} />
                    }
                    <div className="font-Inter mt-10 md:mt-1 font-semibold text-xl md:text-2xl">
                        <h1>Connexion</h1>
                    </div>
                    <div className="mt-10 w-[100%]  flex flex-col items-center justify-center gap-10 md:w-[80%]">
                        <div className=" w-[100%] md:w-[100%]">
                            <div className="mt-2 w-[100%] md:w-[100%] shrink-5">
                                <input style={{ borderWidth : inputState === "typing" ? "none" : "1px", borderColor : "transparent" }} type="email" value={emailAdress} onChange={handleEmailChange} placeholder="Entrez votre adresse email..." required className="block w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline"/>
                            </div>
                        </div>
                        <div  className=" w-[100%] md:w-[100%]">
                            <div className={"shrink-5 flex justify-center items-center"}>
                                <input onFocus={()=>setFocus1(true)} onBlur={()=>setFocus1(false)} type={showPassword ? 'text' : 'password'} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Votre mot de passe ici..." required className="block transform w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline"/>
                                <div
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-[7%] transform -translate-x-10 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <RiEyeCloseFill className="text-primary-1 w-4" size={20} />
                                    ) : (
                                        <RiEyeFill className="text-primary-1 w-4" size={20} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 w-[100%] md:w-[100%] flex justify-center items-center">
                            <ButtonSubmit onClick={handleSignin} isLoading={loading} />
                        </div>
                        <div className={"flex justify-between text-xs text-primary-1 items-start w-[100%] md:w-[100%] gap-10 "}>
                            <Link to={"/signup/verifyIdentity"}>Créer mon compte</Link>
                            <Link to={"/signup/verifyIdentity"}>Mot de passe oublié</Link>
                        </div>
                    </div>
                    <div className="fixed bottom-6 text-primary-1">
                        <Link to={"/reclamation"}>Faire des reclamations</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;