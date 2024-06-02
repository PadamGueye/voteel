import {MdLowPriority} from "react-icons/md";
import {FaCircleCheck} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import formatDate from "../utils/formatDate";
import {useStateContext} from "../context/ContexProvider";

const InfoReservationCard = ({reservation, reservationState})=>{
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const {codifier} = useStateContext();
    useEffect(() => {
        const [formattedDate, formattedTime] = formatDate(reservation?.date);
        setDate(formattedDate);
        setTime(formattedTime)
    }, [reservation?.date]);

    return(
        <div className={"flex w-[40%] min-w-[280px] flex-col gap-3 p-5 bg-white shadow-xl rounded-xl"}>
            <div className={"flex items-center gap-3"}>
                <div className={"h-12 w-12 md:h-20 md:w-20 rounded-[50%] flex justify-center items-center text-[#0F5FC2] bg-[#CAF1FF] font-bold"}>
                    <MdLowPriority className={"text-[22px] md:text-[25px]"} />
                </div>
                <h1 className={"text-black font-sans font-bold md:text-[25px] "}>Ma réservation</h1>
            </div>
            <ul className={"p-3 flex flex-col gap-2 "}>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#0F5FC2] text-xl"} /></div>
                    {
                        reservationState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{!reservation?.statut ? "Non défini" : reservation?.statut === "T" ? `Titulaire` : "Suppléant"}</div>
                    }
                </li>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#0F5FC2] text-xl"} /></div>
                    {
                        reservationState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{date}</div>
                    }
                </li>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#0F5FC2] text-xl"} /></div>
                    {
                        reservationState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{time}</div>
                    }
                </li>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#0F5FC2] text-xl"} /></div>
                    {
                        reservationState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{codifier ? "Codification réussie" : "En attente de codification"}</div>
                    }
                </li>
            </ul>
        </div>
    )
}

export default InfoReservationCard