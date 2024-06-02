import MainLayout from "../../../layout/MainLayout";
import {Types} from "../../../constants/Types";
import StatesModal from "../../../components/StatesModal";
import MainModal from "../../../components/MainModal";
import React, {useEffect, useState} from "react";
import {redirect, useNavigate, useParams} from "react-router-dom";
import MenuUsers from "../../../components/Admin/MenuUsers";
import {UserAPI} from "../../../api/UserAPI";
import Profile from "../../../components/Profile";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import UserProfileSkeleton from "../../../components/UserProfileSkeleton";

const UserProfile = () =>{
    const navigate = useNavigate();
    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const [showMainModal, setShowMainModal] = useState(false);
    const [action, setAction] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const {userId} = useParams();
    const userContexte = useAuthStateContext()?.user;

    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
    }

    const grantAccess = async ()=>{
        if (Types.ADMIN === userContexte?.role || Types.EDITOR === userContexte?.role){
            return true;
        }
        else{
            if ( userId === userContexte?._id){
                return true
            }
        }
        return false
    }

    const fetchData = async () => {
        setLoading(true);
        const result = await grantAccess();
        if (result === true) {
            try {
                const res = await UserAPI.getUserById(userId);
                setUser(res.data.user);
                setLoading(false);
            } catch (error) {
                redirect("/")
                stateModal.type = "error";
                stateModal.title = "Erreur de récupération d'utilisateur";
                stateModal.message = `Une erreur est survenue lors de la récupération des utilisateurs, vérifiez la console`;
                stateModal.show = true;
                setStateModal((prevState) => ({ ...prevState, ...stateModal }));
                setLoading(false);
            }
        }
        setLoading(false)
        redirect("/");
    };

    useEffect(() => {
        fetchData();
    }, []);



    return(
        <MainLayout userRole={userContexte?.role}>
            <div className={"px-10 py-2 flex flex-col items-center"}>
                <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={()=>{navigate('/admin');resetStateModal()}} onCancel={resetStateModal}/>
                <MainModal showModal={showMainModal} title={`Vous êtes sur le point ${action === "delete" ? "de supprimer" : "de valider"} un utilisateur, êtes vous sûre de vouloir continuer ?`} onCancel={()=>{setShowMainModal(false); resetStateModal()}} onSubmit={()=>{ setShowMainModal(false)}} />
            </div>
            <div className={"flex flex-col items-center justify-start w-full h-screen"}>
                { (Types.ADMIN === userContexte?.role ) && <MenuUsers className={"flex justify-start md:flex-row  items-center border-b bg-white border-gray-300 shadow-sm w-full gap-3 px-4"}/>}
                <div className={"px-3 md:px-10 h-[90%] w-full py-4 flex flex-col items-center"}>
                    <div className={`flex flex-col p-5 w-full gap-10 overflow-y-scroll`}>
                        {
                            loading ?
                                <UserProfileSkeleton />
                                :
                                <Profile user={user} />
                        }

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default UserProfile;