import './App.css';
import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useAuthStateContext} from "./context/AuthContextProvider";
import {RequireAuth} from "./guards/AuthGard";
import {useStateContext} from "./context/ContexProvider";
import Verify from "./pages/auth/signup/Verify";
import Complete from "./pages/auth/signup/Complete";
import Signin from "./pages/auth/Signin";
import StudentHome from "./pages/etudiant/StudentHome";
import Reservation from "./pages/etudiant/Reservation";
import Reservations from "./pages/editor/Reservations";
import {CompteAPI} from "./api/CompteAPI";
import NotFound from "./pages/commons/NotFound";
import {Types} from "./constants/Types";
import AccessDeny from "./pages/commons/AccessDeny";
import Home from "./pages/commons/Home";
import Utilisateurs from "./pages/admin/Utilisateurs";
import CreateUser from "./pages/admin/CreateUser";
import CreateUsers from "./pages/admin/CreateUsers";
import EditUser from "./pages/commons/EditUser";
import UserProfile from "./pages/commons/UserProfile";
import Chambres from "./pages/admin/Chambres";
import EditChambre from "./pages/commons/EditChambre";
import CreateChambres from "./pages/admin/CreateChambres";
import CreateChambre from "./pages/admin/CreateChambre";
import Reclamation from "./pages/reclamation";
import ReclamationSuccess from "./pages/commons/ReclamSuccess";
import EditorEtudiants from "./pages/editor/EditorEtudiants";
import TwoFactorAuh from "./pages/auth/TwoFactorAuth";

function EditcChambre() {
    return null;
}

function App() {
    const auth = useAuthStateContext();
    const {setRoomReserved, setCodifier} = useStateContext();

    useEffect(() => {
        let access;
        try{
            access =  JSON.parse(localStorage.getItem('access-key'));
            setRoomReserved(JSON.parse(localStorage.getItem('room')));
        }catch (e) {
            console.error(e)
        }
        if (!auth.user && access && access.token) {
            CompteAPI.getByCarte(access.num_carte)
                .then((res) => {
                    if (res.data.code === 200) {
                        setCodifier(res.data?.compte.codifier);
                        auth.setUserInfo(res.data?.user);
                    }
                    else
                        setCodifier(false);
                })
                .catch(() => {

                })
            auth.login(access)
        } else if (!auth.user) {
            auth.logout();
        }

    }, [auth])


    return (
       <div className="bg-white-bg min-h-screen max-w-screen">
           <div className="relative">
               <BrowserRouter>
                   <Routes>
                       <Route path="/" element={<Home />} />
                       <Route path="/signin" element={<Signin />} />
                       <Route path="/reclamation" element={<Reclamation />} />
                       <Route path="/reclamationsuccess" element={<ReclamationSuccess />} />
                       <Route path="/signin/two-factor-verification" element={<TwoFactorAuh />} />
                       <Route path="/signup/verifyIdentity" element={<Verify />} />
                       <Route path="/signup/setPassword" element={<Complete />} />
                       <Route path="/admin" element={<RequireAuth role={[Types.ADMIN]} ><Utilisateurs /></RequireAuth>} />
                       <Route path="/admin/create-user" element={<RequireAuth role={[Types.ADMIN]} ><CreateUser /></RequireAuth>} />
                       <Route path="/admin/create-users" element={<RequireAuth role={[Types.ADMIN]} ><CreateUsers /></RequireAuth>} />
                       <Route path="/admin/chambres" element={<RequireAuth role={[Types.ADMIN]} ><Chambres /></RequireAuth>} />
                       <Route path="/admin/create-room" element={<RequireAuth role={[Types.ADMIN]} ><CreateChambre /></RequireAuth>} />
                       <Route path="/admin/create-rooms" element={<RequireAuth role={[Types.ADMIN]} ><CreateChambres /></RequireAuth>} />
                       <Route path="/admin/edit-room/:chambreId" element={<RequireAuth role={[Types.ADMIN]} ><EditChambre /></RequireAuth>} />
                       <Route path="/editor" element={<RequireAuth role={[Types.ADMIN, Types.EDITOR]} ><Reservations /></RequireAuth>} />
                       <Route path="/editor/etudiants" element={<RequireAuth role={[Types.ADMIN,Types.EDITOR]} ><EditorEtudiants /></RequireAuth>} />
                       <Route path="/student" element={<RequireAuth role={[Types.BASIC]}><StudentHome /></RequireAuth>} />
                       <Route path="/student/reservation" element={<RequireAuth role={[Types.BASIC]} ><Reservation /></RequireAuth>} />
                       <Route path="/user-profile/:userId" element={<RequireAuth role={[Types.ADMIN, Types.EDITOR, Types.BASIC]} ><UserProfile /></RequireAuth>} />
                       <Route path="/edit-user/:userId" element={<RequireAuth role={[Types.ADMIN, Types.EDITOR, Types.BASIC]} ><EditUser /></RequireAuth>} />
                       <Route path="/access-denied" element={<AccessDeny />} />
                       <Route path="*" element={<NotFound />} />
                   </Routes>
               </BrowserRouter>
           </div>
       </div>
    );
}

export default App;
