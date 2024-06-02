import illustration from "../../assets/page_not_found.svg"
import AuthHeader from "../auth/AuthHeader";
import {useNavigate} from "react-router-dom";

const NotFound = ()=> {
    const navigate = useNavigate();
    return(
        <div className={"flex flex-col items-center h-screen"}>
            <AuthHeader />
            <div className={"flex flex-col items-center justify-center gap-7 h-[80%]"}>
                <div className={"max-w-[100px] md:max-w-[300px] flex justify-center items-center"}>
                    <img src={illustration} alt={"404 Page not found error"}/>
                </div>
                <div className={"max-w-[80%] text-center"}>
                    <p>Oups, la page que vous recherchez semble introuvable. Veuillez vérifier le chemin ou revenir à la page d'accueil.</p>
                </div>
                <div className=" mt-4 w-[300px] flex justify-center items-center">
                    <button onClick={()=>{navigate("/")}}  className="bg-gradient-primary text-white w-[100%] py-3 shadow-lg rounded-md text-md " >
                        Retourner
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound;