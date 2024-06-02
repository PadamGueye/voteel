import {useState} from "react";
import {useAuthStateContext} from "../context/AuthContextProvider";

const Header = ({handleOpenSideBar}) =>{
    const [openUserMenu,setOpenUserMenu] = useState(false);
    const {userInfo} = useAuthStateContext();
    const userName = userInfo?.prenom ? userInfo?.prenom : "";
    const userFamilyName = userInfo?.nom ? userInfo?.nom : "";
    const userEmail = userInfo?.email ? userInfo?.email : "";
    const carte_etudiant = userInfo?.num_carte ? userInfo?.num_carte : "";
    const userRole = userInfo?.role ? userInfo?.role.toUpperCase() : "";
    const userType = userInfo?.type ? " - "+userInfo?.type.toUpperCase() : "";


    return(
        <nav className="fixed top-0 z-40 w-full md:block flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <button onClick={handleOpenSideBar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-end">
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                                <div onClick={()=>{setOpenUserMenu(!openUserMenu)}}  className={"bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] cursor-pointer flex justify-center items-center gap-1 md:gap-3 px-3 py-1 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"}>
                                    <button type="button" className="flex text-sm bg-white-800 rounded-full" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 42" fill="none">
                                            <circle cx="21" cy="21" r="21" fill="white"/>
                                            <path d="M21.5361 11.8462C20.3936 11.8462 19.2979 12.3001 18.4901 13.1079C17.6822 13.9158 17.2284 15.0115 17.2284 16.1539C17.2284 17.2964 17.6822 18.3921 18.4901 19.1999C19.2979 20.0078 20.3936 20.4616 21.5361 20.4616C22.6785 20.4616 23.7742 20.0078 24.5821 19.1999C25.3899 18.3921 25.8437 17.2964 25.8437 16.1539C25.8437 15.0115 25.3899 13.9158 24.5821 13.1079C23.7742 12.3001 22.6785 11.8462 21.5361 11.8462ZM15.0745 16.1539C15.0745 14.4402 15.7553 12.7967 16.9671 11.5849C18.1788 10.3732 19.8224 9.69238 21.5361 9.69238C23.2498 9.69238 24.8933 10.3732 26.1051 11.5849C27.3168 12.7967 27.9976 14.4402 27.9976 16.1539C27.9976 17.8676 27.3168 19.5111 26.1051 20.7229C24.8933 21.9347 23.2498 22.6155 21.5361 22.6155C19.8224 22.6155 18.1788 21.9347 16.9671 20.7229C15.7553 19.5111 15.0745 17.8676 15.0745 16.1539ZM17.2284 26.9232C16.3715 26.9232 15.5498 27.2635 14.9439 27.8694C14.338 28.4753 13.9976 29.2971 13.9976 30.1539C13.9976 30.4395 13.8841 30.7135 13.6822 30.9154C13.4802 31.1174 13.2063 31.2308 12.9207 31.2308C12.6351 31.2308 12.3611 31.1174 12.1592 30.9154C11.9572 30.7135 11.8438 30.4395 11.8438 30.1539C11.8438 28.7258 12.4111 27.3562 13.4209 26.3464C14.4307 25.3366 15.8003 24.7693 17.2284 24.7693H25.8437C27.2718 24.7693 28.6414 25.3366 29.6512 26.3464C30.6611 27.3562 31.2284 28.7258 31.2284 30.1539C31.2284 30.4395 31.1149 30.7135 30.9129 30.9154C30.711 31.1174 30.4371 31.2308 30.1514 31.2308C29.8658 31.2308 29.5919 31.1174 29.3899 30.9154C29.188 30.7135 29.0745 30.4395 29.0745 30.1539C29.0745 29.2971 28.7341 28.4753 28.1282 27.8694C27.5224 27.2635 26.7006 26.9232 25.8437 26.9232H17.2284Z" fill="#9F9F9F"/>
                                        </svg>
                                    </button>
                                    <div className={"flex flex-col"}>
                                        <h1 className={"text-md text-black font-bold hidden md:inline"}>{`${userName.slice(0, 12)} ${userFamilyName}`}</h1>
                                        <p className={"text-[10px] font-bold text-right"}>
                                            {`${userRole}${userType}`}
                                        </p>
                                    </div>
                                    <div className={`${openUserMenu && "transform rotate-180 duration-100"}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                            <path d="M6.36256 4.95032L11.3126 0.000320435L12.7266 1.41432L6.36256 7.77832L-0.00143814 1.41432L1.41356 0.000320435L6.36356 4.95032H6.36256Z" fill="#313131"/>
                                        </svg>
                                    </div>
                            </div>
                            <div className={`absolute ${openUserMenu ? "" : "hidden"} h-screen w-screen top-0 left-0`} onClick={()=>{setOpenUserMenu(false);}}></div>
                            <div style={{visibility: !openUserMenu ? "hidden" : "visible" , }} className="z-50 fixed right-6 top-[40px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                <div className="px-4 py-3 " role="none">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                        {userEmail}
                                    </p>
                                    <p className="text-sm text-black font-bold dark:text-white" role="none">
                                        {carte_etudiant}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a href={`/user-profile/${userInfo?._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Mon compte</a>
                                    </li>
                                    <li>
                                        <a href={`/edit-user/${userInfo?._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Editer mon profile</a>
                                    </li>
                                    <li>
                                        <a href="/reclamation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Centre d'assistance</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Header;