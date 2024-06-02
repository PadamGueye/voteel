import React from 'react';
import DebouncedInput from './DebouncedInput';

export default function Filter({
                                   column,
                                   table,
                               }) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = React.useMemo(
        () =>
            typeof firstValue === 'number'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [column.getFacetedUniqueValues()]
    )

    return (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.slice(0, 5000).map((value, index) => (
                    <option value={value} key={index} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '')}
                onChange={value => column.setFilterValue(value)}
                className="w-[100%] appearance-none bg-transparent focus:outline focus:outline-0  my-3  border-b-2 border-white"
                placeholder={`col... (${column.getFacetedUniqueValues().size})`}
                list={column.id + 'list'}
            />
            <div className="h-1" />
        </>
    )
}