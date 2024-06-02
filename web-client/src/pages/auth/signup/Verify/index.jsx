import AuthHeader from "../../AuthHeader";
import {Link} from "react-router-dom";
import ErrorAlerte from "../../../../components/ErrorAlerte";
import {useVerify} from "./useVerify";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import etudiantImage from "../../../../assets/etudiants.png";

const Verify = ()=>{
    const {
        studentNumber,
        handleNumberChange,
        inputState,
        handleVerifyNumber,
        errorMessage,
        queryError,
        setQueryError,
        queryResponse,
        isLoading,
    } = useVerify();


    return(
        <div>
            <AuthHeader/>
            <div className="relative top-10 w-full md:h-full md:top-20 flex  justify-center items-center">
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
                        <h1>Identifiez vous !</h1>
                    </div>
                    <div className="mt-10 w-[100%]  flex flex-col items-center gap-10 md:w-[80%] md:px-10">
                        <div className="mt-2 w-[100%] md:w-[100%] shrink-5">
                            <input style={{ borderWidth : inputState === "typing" ? "none" : "1px", borderColor : (inputState === "error" ? "red" : inputState === "valid" ? "#0ace40" : "transparent" )  }} type="text" value={studentNumber} onChange={handleNumberChange} maxLength={"9"} placeholder="Entrez votre numéro etudiant..." required className="block w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline"/>
                            {
                                inputState === "error" && <p className={"text-red-500 text-xs mt-2"}>{errorMessage}</p>
                            }
                        </div>
                        <div className="mt-2 w-[100%] md:w-[100%] flex justify-center items-center">
                            <ButtonSubmit onClick={handleVerifyNumber} inputState={inputState} isLoading={isLoading} />
                        </div>
                        <div className={"flex justify-between ml-2 text-xs text-primary-1 items-start w-[100%] md:w-[100%] gap-10 "}>
                            <Link to={"/signin"}>J'ai un compte, me connecter ?</Link>
                        </div>
                    </div>
                    <div  onClick={()=>{
                        console.log(queryResponse)}} className="fixed bottom-6 text-primary-1">
                        <Link to={"/reclamation"}>Faire des reclamations</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verify;