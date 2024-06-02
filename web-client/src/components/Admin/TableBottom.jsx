import React from 'react'
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";

export default function TableBottom({ resetOrder, resetFilters, table }) {
    return (
        <div className=" flex  md:flex-row items-center justify-between w-full px-10 ">
            <div className="hidden md:flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 px-4">Total : {table.getFilteredRowModel().rows.length}</div>
            <div className={"hidden md:block"}>
                 <span className="d-flex text-dark">
                  <span className="text-sm text-gray-500 dark:text-gray-400">afficher la page : </span>
                  <input
                      type="number"
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e) => {
                          const page = e.target.value ? Number(e.target.value) - 1 : 0;
                          table.setPageIndex(page);
                      }}
                      className="form-control text-gray-500 px-3 h-8 w-10 rounded-md border border-gray-300 focus:outline-blue-500 focus:outline focus:ring-3 focus:ring-blue-600"
                  />
                </span>
            </div>
            <div className="flex items-center gap-3 mx-auto justify-center font-bold text-[18px]">
                <button className="flex items-center text-gray-500 justify-center px-3 h-8 text-sm font-medium border border-gray-300 hover:border-blue-700 hover:text-blue-800 hover:bg-white  rounded-s  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    <FaArrowLeftLong />
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Page <span className="font-semibold text-gray-500 dark:text-white">{table.getState().pagination.pageIndex + 1}</span> of <span className="font-semibold text-gray-500 dark:text-white">{table.getPageCount()}</span>
                </span>
                <button className="flex items-center justify-center px-3 h-8 text-sm font-medium  border border-gray-300 hover:border-blue-700 text-gray-500 hover:text-blue-800 hover:bg-white rounded-e dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    <FaArrowRightLong />
                </button>
            </div>
            <div className={"hidden md:block"}>
                <span className="text-sm text-gray-500 dark:text-gray-400">afficher par : </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}>
                    {[10, 20, 30, 40, 50, 100, 200].map((pageSize) => (
                        <option key={pageSize} value={pageSize} className=" px-3 h-8 w-10 rounded-md border border-gray-300 focus:outline-blue-500 focus:outline focus:ring-3 focus:ring-blue-600">
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
