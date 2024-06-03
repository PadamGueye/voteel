import {Link} from "react-router-dom";
import {PiUserLight, PiUserListLight} from "react-icons/pi";
import React from "react";
import {IoIosRefresh} from "react-icons/io";

const MenuUsers =({className, onRefresh = ()=>{}})=>{
    return(
        <ul className={className}>
            {
                (<li>
                    <Link to={"/admin/create-election"} className={`flex justify-center items-center text-sm md:px-4 py-2 hover:bg-gray-200`}>
                        <PiUserLight  className={`text-blue-700 text-xl`} />
                        <span className="flex-1 ml-3 whitespace-nowrap">Ajouter une election</span>
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