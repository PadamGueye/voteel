import React from "react";

const CustomTableSkeleton =()=>{
    return(
        Array.from({ length: 7 }).map((_, index) => (
            <tr key={index} className="bg-white border-b-[1.5px] border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                {Array.from({ length: 6 }).map((_, i) => (
                    <td key={i} className="px-4 py-2.5">
                        <div className="max-w-sm animate-pulse flex items-center justify-center">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
                        </div>
                    </td>
                ))}
            </tr>
        ))
    )
}
export default CustomTableSkeleton;