import {BiSolidEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import React from "react";
import {CgProfile} from "react-icons/cg";
import {MdOutlineLockReset} from "react-icons/md";
import {Types} from "../constants/Types";

const UserActionColumn = ({onView, onEdit, onDelete, onSecretReset, userRole}) => {
  return(
      <div className={"flex justify-center items-center gap-2"}>
          <CgProfile onClick={onView} title={"propriétés"} className={"text-gray-500 hover:scale-125 cursor-pointer"} />
          <BiSolidEdit onClick={onEdit} title={"éditer"}  className={" hover:scale-125 cursor-pointer"} />
          <MdOutlineLockReset onClick={Types.STUDENT === userRole ? onSecretReset : ()=>{}} title={"reset secret"}  className={` ${Types.STUDENT === userRole ? "text-blue-700 hover:text-blue-800 hover:scale-125 cursor-pointer" : "text-gray-400" }`} />
          <RiDeleteBin6Line onClick={Types.ADMIN !== userRole ? onDelete : ()=>{}} title={"supprimer"}  className={`${Types.ADMIN !== userRole ? "text-red-400 hover:text-red-600 hover:scale-125 cursor-pointer" : "text-gray-400" }`} />
      </div>
)
}

export default UserActionColumn;