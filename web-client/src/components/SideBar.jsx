import {Link, useLocation} from "react-router-dom";
import ButtonSubmit from "./ButtonSubmit";
import Logo from "../../src/assets/ccee-logo.png"
import {FaEdit, FaInfo, FaRegListAlt} from "react-icons/fa";
import {Types} from "../constants/Types";
import {MdLowPriority, MdOutlineBedroomChild, MdOutlineHowToVote} from "react-icons/md";
import React from "react";
import {LuUserSquare2} from "react-icons/lu";


const SideBar = ({ openSidebar, handleOpenSideBar, userRole,onSignoutClick}) =>{
    const pathName =  useLocation().pathname;

    return(
        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-50 w-[80%] md:w-[20%] h-screen transition-transform ${openSidebar && '-translate-x-full'} bg-[#EFF4FF] border-r border-gray-200 ${openSidebar && ''} sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
            <div className="flex items-center justify-center w-full h-[90px] md:h-[120px]">
                <a href="/" className="flex">
                    <img src={Logo} className="h-12 md:h-16" alt="CEE" />
                </a>
                <button onClick={handleOpenSideBar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button">
                    <svg className={"md:hidden h-5 absolute top-[15px] right-[20px] "} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M19.557 0.458161C19.4167 0.317531 19.25 0.20596 19.0665 0.129836C18.8829 0.0537112 18.6862 0.0145271 18.4875 0.0145271C18.2889 0.0145271 18.0921 0.0537112 17.9086 0.129836C17.7251 0.20596 17.5584 0.317531 17.4181 0.458161L10 7.86105L2.58194 0.442991C2.4415 0.302545 2.27476 0.191138 2.09126 0.115129C1.90776 0.0391207 1.71109 1.47983e-09 1.51247 0C1.31385 -1.47983e-09 1.11717 0.0391207 0.93367 0.115129C0.750169 0.191138 0.583436 0.302545 0.442991 0.442991C0.302545 0.583436 0.191138 0.750169 0.115129 0.93367C0.0391207 1.11717 -1.47983e-09 1.31385 0 1.51247C1.47983e-09 1.71109 0.0391207 1.90776 0.115129 2.09126C0.191138 2.27476 0.302545 2.4415 0.442991 2.58194L7.86105 10L0.442991 17.4181C0.302545 17.5585 0.191138 17.7252 0.115129 17.9087C0.0391207 18.0922 0 18.2889 0 18.4875C0 18.6862 0.0391207 18.8828 0.115129 19.0663C0.191138 19.2498 0.302545 19.4166 0.442991 19.557C0.583436 19.6975 0.750169 19.8089 0.93367 19.8849C1.11717 19.9609 1.31385 20 1.51247 20C1.71109 20 1.90776 19.9609 2.09126 19.8849C2.27476 19.8089 2.4415 19.6975 2.58194 19.557L10 12.1389L17.4181 19.557C17.5585 19.6975 17.7252 19.8089 17.9087 19.8849C18.0922 19.9609 18.2889 20 18.4875 20C18.6862 20 18.8828 19.9609 19.0663 19.8849C19.2498 19.8089 19.4166 19.6975 19.557 19.557C19.6975 19.4166 19.8089 19.2498 19.8849 19.0663C19.9609 18.8828 20 18.6862 20 18.4875C20 18.2889 19.9609 18.0922 19.8849 17.9087C19.8089 17.7252 19.6975 17.5585 19.557 17.4181L12.1389 10L19.557 2.58194C20.1335 2.00549 20.1335 1.03462 19.557 0.458161Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div className="h-[80%] pb-4 overflow-y-auto dark:bg-gray-800">
                <ul className="space-y-2 h-[80%] font-medium">
                    {
                        (userRole === Types.ADMIN) &&
                        (<li>
                            <Link to={"/admin"} className={`flex items-center px-8 py-2 ${pathName === "/admin" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#4B87FF] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <LuUserSquare2 className={`flex-shrink-0 w-5 h-5 ${pathName === "/admin" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Utilisateurs</span>
                            </Link>
                        </li>)
                    }
                    {
                        (userRole === Types.ADMIN) &&
                        (<li>
                            <Link to={"/admin/elections"} className={`flex items-center px-8 py-2 ${pathName === "/admin/chambres" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#4B87FF] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <MdOutlineBedroomChild className={`flex-shrink-0 w-5 h-5 ${pathName === "/admin/chambres" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Elections</span>
                            </Link>
                        </li>)
                    }{
                        (userRole === Types.ADMIN) &&
                        (<li>
                            <Link to={"/admin/positions"} className={`flex items-center px-8 py-2 ${pathName === "/admin/chambres" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#4B87FF] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <MdOutlineHowToVote className={`flex-shrink-0 w-5 h-5 ${pathName === "/admin/chambres" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Positions</span>
                            </Link>
                        </li>)
                    }{
                        (userRole === Types.ADMIN) &&
                        (<li>
                            <Link to={"/admin/candidates"} className={`flex items-center px-8 py-2 ${pathName === "/admin/chambres" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#4B87FF] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <FaRegListAlt className={`flex-shrink-0 w-5 h-5 ${pathName === "/admin/chambres" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Candidats</span>
                            </Link>
                        </li>)
                    }
                    {
                        (userRole === Types.EDITOR) &&
                        (<li>
                            <Link to={"/editor"} className={`flex items-center px-8 py-2 ${pathName === "/editor" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#4B87FF] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <FaEdit className={`flex-shrink-0 w-5 h-5 ${pathName === "/editor" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Réservations</span>
                            </Link>
                        </li>)
                    }
                    {
                        (userRole === Types.EDITOR) &&
                        (<li>
                            <Link to={"/editor/etudiants"} className={`flex items-center px-8 py-2 ${pathName === "/editor/etudiants" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#13A3E9] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <FaInfo className={`flex-shrink-0 w-5 h-5 ${pathName === "/editor/etudiants" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Liste Etudiants</span>
                            </Link>
                        </li>)
                    }
                    {
                        (userRole === Types.EDITOR) &&
                        (<li>
                            <Link to={"/editor"} className={`flex items-center px-8 py-2 ${pathName === "/editor/statistiques" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#13A3E9] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <FaInfo className={`flex-shrink-0 w-5 h-5 ${pathName === "/editor/statistiques" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Statistiques</span>
                            </Link>
                        </li>)
                    }
                    {
                        (userRole === Types.BASIC) &&
                        (<li>
                            <Link to={"/student"} className={`flex items-center px-8 py-2 ${pathName === "/student" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#4B87FF] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <FaEdit className={`flex-shrink-0 w-5 h-5 ${pathName === "/student" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9] hover:bg-[#171C49]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Nouvelle réservation</span>
                             </Link>
                        </li>)
                    }
                    {
                        (userRole === Types.BASIC) &&
                        (<li>
                            <Link to={"/student/reservation"} className={`flex items-center px-8 py-2 ${pathName === "/student/reservation" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353] "} hover:text-[#13A3E9] dark:text-white hover:bg-[#171C49] dark:hover:bg-gray-700 group`}>
                                <FaInfo className={`flex-shrink-0 w-5 h-5 ${pathName === "/student/reservation" ? "text-[#13A3E9] bg-[#171C49]" : "text-[#535353]"} transition duration-75 dark:text-gray-400 group-hover:text-[#13A3E9]  dark:group-hover:text-white`} />
                                <span className="flex-1 ml-3 whitespace-nowrap">Ma réservation</span>
                            </Link>
                        </li>)
                    }
                </ul>
                <div className={"w-full h-[20%] flex justify-center items-center "}>
                    <div className="mt-2 w-[80%] md:w-[80%] flex justify-center items-center">
                        <ButtonSubmit onClick={onSignoutClick} isLoading={false} >Déconnexion</ButtonSubmit>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideBar;