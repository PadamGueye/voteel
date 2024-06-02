import MainLayout from "../../../layout/MainLayout";
import {FaInfo, FaSearch} from "react-icons/fa";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import RoomInfoModal from "../../../components/RoomInfoModal";
import useStudenHome from "./useStudenHome";
import StatesModal from "../../../components/StatesModal";
import {Link, useNavigate} from "react-router-dom";
import RoomSkeleton from "../../../components/RoomSkeleton";
import MainModal from "../../../components/MainModal";
import {Types} from "../../../constants/Types";
import {MdOutlineBedroomChild} from "react-icons/md";

const StudentHome = () => {
    const {
        isDropdownOpen, setIsDropdownOpen,
        showRoomInfo, setShowRoomInfo,
        showInfoModal, setInfoModal,
        selectedRoom, setRoom,
        roomList, setRoomList,
        selectedCheckboxes, setSelectedCheckboxes,
        roomsLoading, setRoomsLoading,
        filteredList, setFilteredList,
        searchTerm, setSearchTerm,
        filterButton, setFilterButton,
        unauthorised, setUnauthorised,
        handleCheckboxChange,
        handleInputChange,
        handleReserve,
        onRoomClick,
        onShowRoomInfo,
        toggleDropdown,
        stateModal,
        resetStateModal,
        showMainModal,
        setShowMainModal
    } = useStudenHome();
    const auth = useAuthStateContext();
    const navigate = useNavigate();

    return(
        <MainLayout userRole={Types.STUDENT}>
            <RoomInfoModal showModal={showInfoModal} selectedRoom={showRoomInfo} onSubmit={()=>{setShowMainModal(true)}} onCancel={()=>{setShowRoomInfo({}); setInfoModal(false)}}/>
            <StatesModal showModal={stateModal.show} title={stateModal.title} type={stateModal.type} message={stateModal.message} onSubmit={()=>{navigate('/student/reservation');resetStateModal()}} onCancel={resetStateModal}/>
            <MainModal showModal={showMainModal} title={"Vous êtes sur le point de réserver une chambre, êtes vous sûre de vouloir réserver vouloir continuer ?"} onCancel={()=>{setShowMainModal(false)}} onSubmit={()=>{handleReserve(auth.user?.num_carte); setShowMainModal(false)}} />
            {unauthorised ?
                (<div className={"w-full h-full flex justify-center items-center flex-col"}>
                    <MdOutlineBedroomChild className={"text-[60px] text-primary-2 font-light"} />
                    <h1 className={"font-bold mt-3 text-[15px] text-primary-2"}>Accès restreint</h1>
                    <div className={"text-[16px] font-light mt-4 text-gray-400 w-[50%] text-center"}>
                        Vous n'êtes pas autorisé à accéder à cette fonctionnalité pour le moment, car les réservations sont actuellement limitées par niveau et vous ne faites pas partie de la classe autorisée. Nous vous remercions de votre compréhension et sommes disponibles pour toute assistance supplémentaire.                    </div>
                    <Link to={`/user-profile/${auth.user?._id}`} type="button" className="text-white mb-10 text-[13px] bg-blue-800 hover:bg-blue-500 mt-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 py-2 text-center">Consulter mon compte</Link>
                </div>)
                :
                <><div className={"w-full mt-4 px-4"}>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <label htmlFor="pavA-checkbox-list" className="w-full py-3 ml-2 md:hidden text-xs font-medium text-gray-900 dark:text-gray-300">Pav A</label>
                                <input id="pavA-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("A")} value="A" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="pavA-checkbox-list" className="w-full py-3 ml-2 hidden md:inline text-sm font-medium text-gray-900 dark:text-gray-300">Pavillon A</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <label htmlFor="pavB-checkbox-list" className="w-full md:hidden py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">Pav B</label>
                                <input id="pavB-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("B")}  value="B" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="pavB-checkbox-list" className="w-full hidden md:inline py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pavillon B</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <label htmlFor="pavC-checkbox-list" className="w-full md:hidden py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">Pav C</label>
                                <input id="pavC-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("C")}  value="C" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="pavC-checkbox-list" className="w-full hidden md:inline py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pavillon C</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <label htmlFor="pavF-checkbox-list" className="w-full md:hidden py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">Pav F</label>
                                <input id="pavF-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("F")}  value="F" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="pavF-checkbox-list" className="w-full hidden md:inline py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pavillon F</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <label htmlFor="pavG-checkbox-list" className="w-full md:hidden py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">Pav G</label>
                                <input id="pavG-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("G")}  value="G" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor="pavG-checkbox-list" className="w-full hidden md:inline py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pavillon G</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={"my-4 mb-6 w-full px-4 bg-white"}>
                    <form onSubmit={handleInputChange}>
                        <div className="flex">
                            <button onClick={toggleDropdown} id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 inline-flex z-10 items-center py-1 px-1.5 md:py-2.5 md:px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 md:border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                                {filterButton}
                                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <div className={` ${isDropdownOpen ? "" : "hidden"} z-1 fixed h-screen w-screen top-0 left-0`} onClick={()=>{setIsDropdownOpen(false)}}></div>
                            <div id="dropdown" className={` ${isDropdownOpen ? "" : "hidden"} z-100 fixed mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                    <li>
                                        <button onClick={()=>{setFilterButton('all'); setIsDropdownOpen(false)}} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tout</button>
                                    </li>
                                    <li>
                                        <button onClick={()=>{setFilterButton('avalaible'); setIsDropdownOpen(false)}} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Disponible</button>
                                    </li>
                                    <li>
                                        <button onClick={()=>{setFilterButton('unavalaible'); setIsDropdownOpen(false)}} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Non Disponible</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative w-full">
                                <input onChange={(event)=>{setSearchTerm(event.target.value)}} type="search" id="search-dropdown" className="block p-2.5 w-full text-xs md:text-sm text-gray-900 md:rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Rechercher par numéro chambre ..." required />
                                <button type="submit" className="absolute top-0 right-0 p-2.5 text-xs md:text-sm font-medium h-full text-primary-2 bg-blue-700 rounded-r-lg md:border border-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <FaSearch />
                                    <span className="sr-only">Rechercher numéro chambre ...</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            <div className="flex flex-wrap -z-10 justify-center  mt-4 mb-32 gap-5 fixed w-[96%]  md:w-[78%] top-[170px] max-h-[60%] md:max-h-[85%] overflow-y-scroll">
                {
                    roomsLoading  ? <RoomSkeleton /> : (
                        filteredList.map((room)=>{
                            return(
                                <div key={room.chambre?._id} onClick={()=>{onRoomClick(room)}} className={`flex flex-col ${room?.nb_place_disponible > 0 ? "cursor-pointer bg-[#FCFCFC]" : "bg-gray-200"}  w-[290px] gap-3 ${(selectedRoom.chambre?._id === room.chambre?._id ) ? "border-2 border-[#217FED] z-100" : "border border-gray-300"}  text-gray-600 rounded-lg  px-6 py-3 shadow`}>
                                    <div className={"flex gap-3  justify-between items-center"}>
                                        <div className={"h-12 w-12 rounded-[50%] flex justify-center items-center bg-opacity-20 text-[#217FED] bg-[#217FED] font-bold"}>{`${room.chambre?.numero}${room.chambre?.pavillon}`}</div>
                                        <div className={"h-11 w-50 flex justify-center text-sm items-center px-2 bg-opacity-10 gap-2"}><span className={`h-[14px] w-[14px] rounded ${room?.nb_place_disponible > 0 ? "bg-green-500" : "bg-red-600" } `}></span>{room?.nb_place_disponible > 0 ? "Disponible" : "Non Disponible" }</div>
                                        <div className={"p-2 rounded-[50%] bg-gray-200 hover:bg-gray-300"} onClick={()=>onShowRoomInfo(room)}><FaInfo/></div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            <div className={"fixed border-gray-300 border-t bottom-0 py-2 bg-white w-[100%] md:w-[80%] flex justify-center"}>
                <button type="button" onClick={()=>onShowRoomInfo(selectedRoom)} className="text-white bg-gradient-primary bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Réserver chambre</button>
            </div>
            </>}
        </MainLayout>
    )
}

export default StudentHome;