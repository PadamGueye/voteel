import illustration from "../../assets/accessDenied.svg";
import AuthHeader from "../auth/AuthHeader";
import {useNavigate} from "react-router-dom";

const AccessDeny = ()=> {
    return(
        <div className={"flex flex-col items-center h-screen"}>
            <AuthHeader />
            <div className={"flex flex-col items-center justify-center gap-7 h-[80%]"}>
                <div className={"max-w-[100px] md:max-w-[150px] flex justify-center items-center"}>
                    <img src={illustration} alt={"404 Page not found error"}/>
                </div>
                <div className={"max-w-[80%] text-center"}>
                    <p>Oups,  Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource. Veuillez contacter l'administrateur du système si vous pensez qu'il s'agit d'une erreur.</p>
                </div>
            </div>
        </div>
    )
}

export default AccessDeny;