import React, {Fragment, useEffect, useMemo, useState} from "react";
import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import "../../styles/tanstack-table.css";
import {fuzzyFilter} from "../../utils/utils";
import ColumnHeader from "./ColumnHeader";
import TableBottom from "./TableBottom";
import DebouncedInput from "./DebouncedInput";
import {isEmpty} from "lodash";
import TableRow from "./TableRow";
import {FaSearch} from "react-icons/fa";

export const columnResizeMode = "onChange"; // onEnd

/**
 * unique-column-ids
 * https://tanstack.com/table/v8/docs/guide/column-defs#unique-column-ids
 */

export default function CustomTable({
                                  columns,
                                  data,
                                  renderSubComponent,
                                  getRowCanExpand = () => false,
                                  setSelectedRows,
                                  nestedTableDataId,
                                  // draggable = false,
                                  onContextMenu,
                                  dontShowFilters = false,
                                  showGlobalSearch = true,
                                  showTableBottom = true,
                                  // onDrop,
                              }) {
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowSelection, setRowSelection] = useState({});
    const [columnOrder, setColumnOrder] = useState(
        columns.map((column) => column.id) //must start out with populated columnOrder so we can splice
    );

    const getColumns = useMemo(() => {
        return columns;
    }, [columns]);

    useEffect(() => {
    }, [data]);


    const getData = useMemo(() => data, [data]);

    const resetOrder = () => setColumnOrder(columns.map((column) => column.id));
    const resetFilters = () => setColumnFilters([]);

    const table = useReactTable({
        data: getData,
        columns: getColumns,
        getRowCanExpand,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnOrder,
            columnFilters,
            globalFilter,
            rowSelection,
        },
        getExpandedRowModel: getExpandedRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        columnResizeMode,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugTable: true,
        // debugHeaders: true,
        // debugColumns: false,
    });

    useEffect(() => {
        if (setSelectedRows) {
            if (!isEmpty(rowSelection))
                setSelectedRows(
                    table.getSelectedRowModel().flatRows.map((row) => row.original)
                );
            else setSelectedRows([]);
        }
    }, [rowSelection, setSelectedRows]);

    return (
        <div className={"flex flex-col top-0 w-full h-full items-center justify-between"}>
            {showGlobalSearch && (
            <div className={"flex items-center h-[10%] md:h-[15%]"}>
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className="block min:w-[250px] md:w-[400px] p-2.5 text-xs md:text-sm text-gray-900 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Rechercher..."
                    id={"search"}
                />
                <label htmlFor={"search"} className="p-3 text-xs md:text-sm bg-blue-600 text-white hover:text-blue-800 hover:bg-white font-medium rounded-r-lg md:border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FaSearch />
                </label>
            </div>
            )}
            <div className={"w-full justify-center h-[60%] md:h-[70%] overflow-auto shadow-md"}>
                <table className={"w-full text-center text-sm flex justify-center items-center flex-col"}>
                    {data && (
                        <Fragment>
                            <thead className="w-full py-2 flex justify-center items-center rounded-t-lg font-normal bg-blue-600">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className={"border-none"}>
                                    {headerGroup.headers.map((header) => (
                                        <ColumnHeader
                                            key={header.id}
                                            header={header}
                                            table={table}
                                            dontShowFilters={dontShowFilters}
                                        />
                                    ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody>
                            {table.getRowModel().rows.map((row, idx) => (
                                <TableRow
                                    table={table}
                                    rowSelection={rowSelection}
                                    key={idx}
                                    row={row}
                                    // draggable={draggable}
                                    flexRender={flexRender}
                                    renderSubComponent={renderSubComponent}
                                    nestedTableDataId={nestedTableDataId}
                                    onContextMenu={onContextMenu}
                                    // onDrop={onDrop}
                                />
                            ))}
                            </tbody>
                        </Fragment>
                    )}
                </table>
            </div>
            <div className={"relative h-[10%] md:h-[15%] border-gray-300 border-t py-2 mt-4  mb-4 bg-red w-[100%] md:w-[80%] flex justify-center"}>{data && showTableBottom && (
                <TableBottom
                    resetOrder={resetOrder}
                    resetFilters={resetFilters}
                    table={table}
                />
            )}
            </div>
        </div>
    );
}
