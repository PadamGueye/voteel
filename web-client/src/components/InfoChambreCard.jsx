import {MdOutlineBedroomChild} from "react-icons/md";
import {FaCircleCheck} from "react-icons/fa6";
import getNiveauEtage from "../utils/getNiveauEtage";
import React from "react";

const InfoChambreCard = ({infoChambre, chambreState})=>{
    return(
        <div className={"flex w-[40%] min-w-[280px] flex-col gap-3 p-5 bg-white shadow-xl rounded-xl"}>
            <div className={"flex items-center gap-3"}>
                <div className={"h-12 w-12 md:h-20 md:w-20 rounded-[50%] flex justify-center items-center text-[#00AC4F] bg-[#D3FFE7] font-bold"}>
                    <MdOutlineBedroomChild className={"text-[22px] font-light md:text-[25px]"} />
                </div>
                {
                    chambreState === "loading" ?
                        <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-16 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div></div>
                        :
                        <h1 className={"text-black font-sans font-bold md:text-[30px] "}>{`${infoChambre.chambre?.numero ? infoChambre.chambre.numero : ""} ${infoChambre.chambre?.pavillon ? infoChambre.chambre?.pavillon : ""} `}</h1>
                }
            </div>
            <ul className={"p-3 flex flex-col gap-2 "}>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#00AC4F] text-xl"} /></div>
                    {
                        chambreState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{infoChambre?.nb_reservations ? `${infoChambre?.nb_reservations} réservation(s) enregistrée(s)` : ""}</div>
                    }
                </li>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#00AC4F] text-xl"} /></div>
                    {
                        chambreState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{infoChambre.chambre?.etage ? getNiveauEtage(infoChambre?.chambre.etage) : ""}</div>
                    }
                </li>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#00AC4F] text-xl"} /></div>
                    {
                        chambreState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{infoChambre.chambre?.vue ? `Vue ${infoChambre.chambre?.vue}` : "Vue non définie"}</div>
                    }
                </li>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#00AC4F] text-xl"} /></div>
                    {
                        chambreState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{infoChambre.chambre?.max_place ? `${infoChambre.chambre?.max_place} places maximum` : "Max place non définie"}</div>
                    }
                </li>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#00AC4F] text-xl"} /></div>
                    {
                        chambreState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{infoChambre?.nb_place_disponible} place(s) disponible</div>
                    }
                </li>
                <li className={"flex items-center gap-3"}>
                    <div><FaCircleCheck className={"text-[#00AC4F] text-xl"} /></div>
                    {
                        chambreState === "loading" ?
                            <div className="max-w-sm animate-pulse flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></div>
                            :
                            <div className={""}>{infoChambre?.nb_place_titulaire_disponible} place(s) titulaire disponible</div>
                    }
                </li>
            </ul>
        </div>
    )
}

export default InfoChambreCard