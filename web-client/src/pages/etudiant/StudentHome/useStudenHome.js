import {useEffect, useState} from "react";
import {useAuthStateContext} from "../../../context/AuthContextProvider";
import {useStateContext} from "../../../context/ContexProvider";
import {ChambreAPI} from "../../../api/ChambreAPI";
import {ReservationAPI} from "../../../api/ReservationAPI";
import useDebounce from "../../../utils/useDebounce";

const useStudenHome = ()=>{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showRoomInfo, setShowRoomInfo] = useState({});
    const [showInfoModal, setInfoModal] = useState(false);
    const [selectedRoom, setRoom] = useState({});
    const [roomList, setRoomList] = useState([])
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(["A","B","C","F","G"]);
    const [roomsLoading, setRoomsLoading] = useState(false);
    const auth = useAuthStateContext();
    const {setRoomReserved, setCodifier} = useStateContext();
    const [showMainModal, setShowMainModal] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterButton, setFilterButton] = useState('Filtrer');
    const [unauthorised, setUnauthorised] = useState(false);



    const [stateModal, setStateModal] = useState({show: false, message : "", title : "", type:""});
    const resetStateModal = ()=>{
        const resetState = {show: false, message : "", title : "", type:""}
        setStateModal(resetState);
    }

    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;

        if (selectedCheckboxes.includes(checkboxValue)) {
            setSelectedCheckboxes(selectedCheckboxes.filter((value) => value !== checkboxValue).sort());
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, checkboxValue].sort());
        }
    };

    const handleInputChange = () => {
        const filteredRooms = roomList.filter((room) =>
            `${room.chambre?.numero}${room.chambre?.pavillon}`.includes(searchTerm)
        );

        const finalFilteredRooms = filteredRooms.filter((room) => {
            if (filterButton === 'avalaible') {
                return room?.nb_place_disponible > 0;
            } else if (filterButton === 'unavalaible') {
                return room?.nb_place_disponible < 0;
            }

            return true;
        });

        setFilteredList(finalFilteredRooms);
    };
    const handleReserve = (num_carte) => {
        setShowRoomInfo(false);
        setInfoModal(false);
        stateModal.type = "loading";
        stateModal.title = "Réservation en cours";
        stateModal.show = true;
        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
        if (selectedRoom.chambre && num_carte) {
            ReservationAPI.reserver(selectedRoom.chambre?._id, num_carte)
                .then((res) => {
                    if (res.data.code === 200) {
                        setRoom({});
                        stateModal.type = "succes";
                        stateModal.title = "Réservation réussie";
                        stateModal.message = "Félicitations ! Votre réservation a été confirmée avec succès. Cliquez le boutton ci-dessous pour voir les détails."
                        stateModal.show = true;
                        setStateModal((prevState) => ({...prevState, ...stateModal}));
                        setRoomReserved(res.data.chambre);
                        setCodifier(res.data.codifier);
                        localStorage.setItem('room', JSON.stringify(res.data.chambre));
                        localStorage.setItem('codifier', false);
                    }
                    else if (res.data.code === 500) {
                        setRoom({});
                        stateModal.type = "error";
                        stateModal.title = "Réservation échouée";
                        stateModal.message = res.data.msg;
                        stateModal.show = true;
                        setStateModal((prevState) => ({ ...prevState, ...stateModal  }));
                    }
                })
                .catch(() => {
                    stateModal.type = "error";
                    stateModal.title = "Réservation échouée";
                    stateModal.message = "Oops ! Quelque chose a mal tourné. Veuillez réessayer plus tard ou contactez le support technique"
                    stateModal.show = true;
                    setStateModal((prevState) => ({ ...prevState, ...stateModal  }));

                })
        }
    }

    const onRoomClick = (room) =>{
        if (room?.nb_place_disponible > 0) {
            if (room.chambre._id === selectedRoom.chambre?._id) {
                setRoom({});
            } else {
                setRoom(room)
                setShowRoomInfo(room)
            }
        }
    }

    const onShowRoomInfo = (room) =>{
        if (room?.nb_place_disponible > 0 ) {
            if (room) {
                setShowRoomInfo(room);
                setInfoModal(true);
            }
        }
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        setRoomsLoading(true);
        setUnauthorised(false);
        try {
            if (auth.user){
                ChambreAPI.getByPavillons(auth.user?.num_carte, selectedCheckboxes)
                    .then((response) => {
                    setRoomList(response.data);
                    setFilteredList(response.data);
                    setRoomsLoading(false);
                }).catch((error) => {
                    console.error("Erreur lors de la récupération des chambres :", error);
                    if (error.response?.status){
                        setUnauthorised(true);
                    }
                    setRoomsLoading(false);
                });
            }
            setRoomsLoading(true);
        } catch (e) {
            console.error("Erreur générale :", e);
            setRoomsLoading(false);
        }
    }, [selectedCheckboxes, auth]);

    useDebounce(handleInputChange, 500, [searchTerm, filterButton]);


    return({

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
        handleInputChange,
        handleCheckboxChange,
        handleReserve,
        onRoomClick,
        onShowRoomInfo,
        toggleDropdown,
        stateModal,
        setStateModal,
        resetStateModal,
        showMainModal,
        setShowMainModal
    })
}

export default useStudenHome;