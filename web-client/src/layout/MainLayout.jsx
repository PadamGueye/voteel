import Header from "../components/Header";
import {useState} from "react";
import SideBar from "../components/SideBar";
import MainModal from "../components/MainModal";
import {useNavigate} from "react-router-dom";
import {useAuthStateContext} from "../context/AuthContextProvider";

const MainLayout = ({userRole, children}) => {

    const [openSidebar,setOpenSideBar] = useState(true);
    const handleOpenSideBar = ()=>{setOpenSideBar(!openSidebar)}
    const [showSignout, setShowSignout] = useState(false);
    const navigate = useNavigate();


    const auth = useAuthStateContext();
    const onSignoutSubmit = () => {
        auth.logout();
        navigate('/signin');
    }
    const onSignoutCancel = () => {setShowSignout(false)}

    return(
        <div className={"w-[100%]"}>
            <Header handleOpenSideBar={handleOpenSideBar} />
            <SideBar handleOpenSideBar={handleOpenSideBar}  userRole={userRole} onSignoutClick={() => { setShowSignout(true)}} openSidebar={openSidebar}/>
            <MainModal showModal={showSignout} title={"Êtes-vous sûr de vouloir vous déconnecter ?"} onSubmit={onSignoutSubmit} onCancel={onSignoutCancel}/>
            <div className="mt-14 md:w-[80%] w-[100%] fixed h-screen flex flex-col items-center right-0">
                {children}
            </div>
        </div>
    )
}

export default MainLayout;