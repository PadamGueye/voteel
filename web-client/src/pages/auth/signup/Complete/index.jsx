import AuthHeader from "../../AuthHeader";
import {Link} from "react-router-dom";
import {RiEyeCloseFill, RiEyeFill} from 'react-icons/ri';
import InfoAlerte from "../../../../components/InfoAlert";
import ErrorAlerte from "../../../../components/ErrorAlerte";
import useComplete from "./useComplete";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import etudiantImage from "../../../../assets/etudiants.png";

const Complete = () => {
    const {
        showPassword,
        showPassword2,
        validPassword,
        password, setPassword,
        password2, setPassword2,
        alertInfo, setAlertInfo,
        validMatch,
        focus1, setFocus1,
        focus2, setFocus2,
        queryError, setQueryError,
        togglePasswordVisibility,
        togglePasswordVisibility2,
        loading,
        handleConfirmPassword
    } = useComplete();
    return (
        <div>
            <AuthHeader />
            <div className="relative top-10 w-full md:h-full  flex  justify-center items-center">
                <div className="md:w-[50%]  hidden md:flex items-center justify-center self-center md:pr-10">
                    <div className="w-[50%] fixed top-0 h-screen bg-blue-50 md:flex justify-center items-center">
                        <img src={etudiantImage} alt={"illustration"} className={"w-[80%] h-[70%]"}/>
                    </div>
                </div>
                <div className="mt-10 w-[70%] flex items-center md:mt-1 md:w-[50%] md:p-5 flex-col md:justify-center">
                    {
                        queryError && <ErrorAlerte id="alert-1" text={queryError} handleClose={() => { setQueryError("") }} />
                    }
                    {
                        alertInfo && <InfoAlerte id="alert-2" text={"Un mot de passe doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 chiffre, avec une longueur de 8 à 24 caractères."} handleClose={() => { setAlertInfo(false) }} />
                    }
                    <div className="font-Inter mt-10 md:mt-1 font-semibold text-xl md:text-2xl">
                        <h1>Définir un nouveau mot de passe.</h1>
                    </div>
                    <div className="mt-10 w-[100%] flex flex-col items-center justify-center gap-10 md:w-[80%] md:px-10">
                        <div className="w-[100%]">
                            <div className={"shrink-5 flex justify-center items-center"}>
                                <input onFocus={() => setFocus1(true)} onBlur={() => setFocus1(false)} type={showPassword ? 'text' : 'password'} id="password2" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Votre mot de passe ici..." required className="block transform scale-x-105 w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline" />
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
                            {
                                password && !focus1 && !validPassword && <p className={"text-red-500 text-xs"}>Mot de passe invalide, veuillez respecter le format indiqué ci dessous !</p>
                            }
                        </div>
                        <div className=" w-[100%] md:w-[100%]">
                            <div className={"shrink-5 flex justify-center items-center"}>
                                <input onFocus={() => setFocus2(true)} onBlur={() => setFocus2(false)} type={showPassword2 ? 'text' : 'password'} id="password" name="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Votre mot de passe ici..." required className="block transform scale-x-105  w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline" />
                                <div
                                    onClick={togglePasswordVisibility2}
                                    className="absolute right-[7%] transform -translate-x-10 cursor-pointer"
                                >
                                    {showPassword2 ? (
                                        <RiEyeCloseFill className="text-primary-1 w-4" size={20} />
                                    ) : (
                                        <RiEyeFill className="text-primary-1 w-4" size={20} />
                                    )}
                                </div>
                            </div>
                            {
                                password2 && !focus2 && !validMatch && validPassword && <p className={"text-red-500 text-xs"}>Les mots de passe saisis ne sont pas identiques !</p>
                            }
                        </div>
                        <div className="mt-2 w-[100%] flex justify-center items-center">
                            <ButtonSubmit onClick={handleConfirmPassword} isLoading={loading} >Terminer</ButtonSubmit>
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

export default Complete;