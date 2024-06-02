import iconeFile from "../assets/iconefile.png";
import {IoReloadOutline} from "react-icons/io5";
import React from "react";

const ProgressBar = ({onRetry, progressValue}) =>{
    return(
        <>
            <div className={"w-[15%]"}>
                <img src={iconeFile} alt={"iconeFile"}/>
            </div>
            <div className={"flex flex-col justify-center items-center gap-3 w-[85%]"}>
                <div className={"w-full flex justify-between  items-center"}>
                    <div className={"font-bold text-sm"}>Verification des informations</div>
                    <div className={"flex flex-col justify-center items-center"}>
                        <div onClick={onRetry}
                             className={"p-1 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-300 cursor-pointer"}>
                            <IoReloadOutline className={"text-black hover:animate-spin text-md"}/>
                        </div>
                    </div>
                </div>
                <div className={"w-full flex items-center justify-between"}>
                    <div className="w-[80%] bg-gray-300 rounded-full h-1.5 dark:bg-gray-700">
                        <div style={{width : `${progressValue}%`}} className={`bg-blue-600 h-1.5 rounded-full dark:bg-blue-500`}></div>
                    </div>
                    <div className={"w-[15%] font-bold text-sm"}>{progressValue}%</div>
                </div>
            </div>
        </>
    )
}

export default ProgressBar