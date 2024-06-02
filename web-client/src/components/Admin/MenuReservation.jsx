import {Link} from "react-router-dom";
import React from "react";
import {IoIosRefresh} from "react-icons/io";
import {MdOutlineBedroomChild} from "react-icons/md";
import {GoListOrdered} from "react-icons/go";

const MenuUsers =({className, onRefresh = ()=>{}})=>{
    return(
        <ul className={className}>
            {
                (<li>
                    <Link to={"/admin/create-room"} className={`flex justify-center items-center text-sm md:px-4 py-2 hover:bg-gray-200`}>
                        <MdOutlineBedroomChild  className={`text-blue-700 text-xl`} />
                        <span className="flex-1 ml-3 whitespace-nowrap">Reservaions</span>
                    </Link>
                </li>)
            }
            {
                (<li>
                    <Link to={"/admin/create-rooms"} className={`flex justify-center items-center text-sm md:px-4 py-2 hover:bg-gray-200`}>
                        <GoListOrdered  className={`text-blue-700 text-xl`}/>
                        <span className="flex-1 ml-3 whitespace-nowrap ">Ajouter une liste</span>
                    </Link>
                </li>)
            }
            {
                (<li>
                    <button onClick={onRefresh} className={`flex justify-center items-center text-sm md:px-4 py-2 hover:bg-gray-200`}>
                        <IoIosRefresh className={`text-blue-700 text-lg hover:animate-spin`} />
                            <span className="flex-1 ml-3 whitespace-nowrap ">Rafraichir</span>
                    </button>
                </li>)
            }
        </ul>
    )
}

export default MenuUsers;