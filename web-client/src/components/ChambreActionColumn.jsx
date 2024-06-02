import {BiSolidEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import React from "react";
import {Types} from "../constants/Types";

const ChambreActionColumn = ({onView, onEdit, onDelete, userRole}) => {
  return(
      <div className={"flex justify-center items-center gap-2"}>
          <BiSolidEdit onClick={onEdit} title={"éditer"}  className={" hover:scale-125 cursor-pointer"} />
          <RiDeleteBin6Line onClick={Types.ADMIN !== userRole ? onDelete : ()=>{}} title={"supprimer"}  className={`${Types.ADMIN !== userRole ? "text-red-400 hover:text-red-600 hover:scale-125 cursor-pointer" : "text-gray-400" }`} />
      </div>
)
}

export default ChambreActionColumn;