import AuthHeader from "../AuthHeader";
import {Link} from "react-router-dom";
import {OtpInput} from "reactjs-otp-input";
import ErrorAlerte from "../../../components/ErrorAlerte";
import {useSignupContext} from "../../../context/SignupContext";
import {useTwoFactorAuh} from "./useTwoFactorAuh";
import SuccessAlert from "../../../components/SuccessAlert";
import ButtonSubmit from "../../../components/ButtonSubmit";
import etudiantImage from "../../../assets/etudiants.png";
import {Types} from "../../../constants/Types";


const TwoFactorAuh = () => {
    const {
        otp,
        setOtp,
        otpFailed,
        setOtpFailed,
        masquerEmail,
        queryError,
        setQueryError,
        querySuccess,
        setQuerySuccess,
        handleConfirmOtp,
        setInputState,
        isLoading,
        resendOtp,
        timer,
        resendDisabled,
    } = useTwoFactorAuh();

    const { signupData } = useSignupContext();

    return (
        <div>
            <AuthHeader />
            <div className="relative top-10 w-full md:h-full md:top-20 flex  justify-center items-center">
                <div className="md:w-[50%]  hidden md:flex items-center justify-center self-center md:pr-10">
                    <div className="w-[50%] fixed top-0 h-screen bg-blue-50 md:flex justify-center items-center">
                        <img src={etudiantImage} alt={"illustration"} className={"w-[80%] h-[70%]"}/>
                    </div>
                </div>
                <div className="mt-10 w-[70%] flex items-center md:mt-1 md:w-[50%] md:p-5 flex-col md:justify-center">
                    {
                        querySuccess && <SuccessAlert id="alert-2" text={querySuccess} handleClose={() => { setQuerySuccess("") }} />
                    }
                    {
                        queryError && <ErrorAlerte id="alert-1" text={queryError} handleClose={() => { setQueryError(""); setInputState("typing") }} />
                    }
                    <div className="font-Inter mt-10 md:mt-1 font-semibold text-xl md:text-2xl">
                        {
                            signupData.etudiant?.role === Types.BASIC ?
                                <p>Vérification de code secret</p>
                                :
                                <h1>Email vérification</h1>
                        }
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                        {
                            signupData.etudiant?.role === Types.BASIC ?
                                <p>Renseignez votre code secret personel !</p>
                                :
                                <p>Vérifiez le code dans votre mail {signupData.etudiant?.email && masquerEmail(signupData.etudiant?.email)}</p>
                        }
                    </div>
                    <div className="mt-10 w-[100%]  flex flex-col items-center gap-10 md:w-[80%] md:px-10">

                        <OtpInput
                            value={otp}
                            onChange={(props) => { setOtp(props); setOtpFailed(false) }}
                            numInputs={8}
                            inputType={"number"}
                            renderInput={(props) => <input {...props} />}
                            hasErrored={otpFailed}
                            shouldAutoFocus={true}
                            isInputNum={true}
                            errorStyle={{
                                borderWidth: "1px",
                                borderColor: "red",
                            }}
                            focusStyle={{
                                borderWidth: "2px",
                                borderColor: "#2970FF",
                            }}
                            inputStyle={{
                                minWidth: "35px",
                                height: "45px",
                                textAlign: "center",
                                background: "#E8EFFF",
                                padding: "10px",
                                margin: "5px",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                color: "#2970FF",
                                fontSize: "20px",
                                fontWeight: "bold"
                            }}
                            containerStyle={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-evenly"
                            }}
                        />
                        {
                            otpFailed && <p className={"text-red-500 text-xs"}>{"Le code saisi est incorrect, Reéssayez !"}</p>
                        }
                    </div>
                    <div className="mt-10 w-[100%]  flex flex-col items-center gap-10 md:w-[80%] md:px-10">
                        <ButtonSubmit onClick={handleConfirmOtp} isLoading={isLoading} />
                        {
                            signupData.etudiant?.role !== Types.BASIC && (<div className="flex flex-col items-center justify-center text-center text-sm space-x-1 text-gray-500">
                                <p>Vous n'avez pas reçu de code ?</p>
                                <div className="flex flex-row gap-1">
                                    {
                                        resendDisabled ? <p>Renvoyer le code dans {timer}</p> : <button onClick={resendOtp} className="flex flex-row items-center font-bold text-blue-600">Renvoyer code</button>
                                    }
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="fixed bottom-6 text-primary-1">
                        <Link to={"/reclamation"}>Faire des reclamations</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TwoFactorAuh;