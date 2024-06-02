import {flexRender} from "@tanstack/react-table";
import {columnResizeMode} from "./CustomTable";
import {reorderColumn} from "../../utils/utils";
import {AiOutlineSortAscending, AiOutlineSortDescending} from "react-icons/ai";
import React from "react";
import {BiSortAlt2} from "react-icons/bi";

const ColumnHeader = ({ header, table, dontShowFilters }) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;

    const onDrop = (event) => {
        const draggedColumn = JSON.parse(event.dataTransfer.getData("column"));
        if (column.id === "select") return;
        const newColumnOrder = reorderColumn(
            draggedColumn.id,
            column.id,
            columnOrder
        );
        setColumnOrder(newColumnOrder);
    };

    const dragStart = (event) => {
        event.dataTransfer.setData("column", JSON.stringify(column));
    };

    return (
        <th colSpan={header.colSpan} onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className={"border-none text-white"}
            {...{key: header.id, style: {width: header.getSize(),},}}>
            <div className="text-center w-11/12">
                {header.isPlaceholder ? null : (
                    <>
                        <div {...{className: header.column.getCanSort() ? "cursor-pointer flex justify-center items-center" : "", onClick: header.column.getToggleSortingHandler()}}>
                            <span className="cursor-grabbing"  draggable={header.column.columnDef.id !== "select"} onDragStart={(event) => dragStart(event)}>
                                {flexRender(header.column.columnDef.header, header.getContext())} {header.column.columnDef.id !== "select" && ""}
                            </span>
                            {({asc: <AiOutlineSortAscending size={"18px"} />, desc: <AiOutlineSortDescending size={"18px"} />,} [header.column.getIsSorted()] ?? <BiSortAlt2  size={"18px"} />)}
                        </div>
                    </>
                )}

                <div
                    {...{onMouseDown: header.getResizeHandler(), onTouchStart: header.getResizeHandler(), className: `resizer ${header.column.getIsResizing() ? "isResizing" : ""}`,
                        style: {transform: columnResizeMode === "onEnd" && header.column.getIsResizing() ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)` : "",},}
                    }
                />
            </div>
        </th>
    );
};
export default ColumnHeader;
