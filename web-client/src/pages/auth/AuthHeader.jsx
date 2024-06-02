import logo from '../../assets/ccee-logo.png'
import {useNavigate} from "react-router-dom";

const AuthHeader = ()=>{
    const navigate = useNavigate();
    return(
        <header onClick={()=>{navigate('/')}} className="bg-white md:bg-transparent z-10 shadow-sm md:shadow-transparent fixed flex px-6 py-2 md:py-3 m-0 w-screen ">
            <div className="flex items-center md:justify-center gap-1 md:gap-3 cursor-pointer">
                <div className={"md:bg-white md:h-16 md:w-16 rounded-[50%] md:flex md:justify-center md:items-center"}>
                    <img className="w-7 md:w-10" src={logo} alt={"logo CEE"}/>
                </div>
                <div className="text-primary-1 ">
                    <h1 className="text-sm md:text-lg font-bold	">
                        Plateforme Voteel
                    </h1>
                </div>
            </div>
        </header>
    )
}

export default AuthHeader;