const CheckboxList = ({handleCheckboxChange, selectedCheckboxes })=>{

    return(
        <div className={"w-full mt-4 px-4"}>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <label htmlFor="pavG-checkbox-list" className="w-full md:hidden py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">DIC3</label>
                        <input id="pavG-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("5")}  value="5" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="pavG-checkbox-list" className="w-full hidden md:inline py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DIC 3 / DESCAF 3</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <label htmlFor="pavF-checkbox-list" className="w-full md:hidden py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">DIC2</label>
                        <input id="pavF-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("4")}  value="4" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="pavF-checkbox-list" className="w-full hidden md:inline py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DIC 2 / DESCAF 2</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <label htmlFor="pavC-checkbox-list" className="w-full md:hidden py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">DIC1</label>
                        <input id="pavC-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("3")}  value="3" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="pavC-checkbox-list" className="w-full hidden md:inline py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DIC1 / DESCAF1</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <label htmlFor="pavB-checkbox-list" className="w-full md:hidden py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">DUT2</label>
                        <input id="pavB-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("2")}  value="2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="pavB-checkbox-list" className="w-full hidden md:inline py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DUT 2</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <label htmlFor="pavA-checkbox-list" className="w-full py-3 ml-2 md:hidden text-xs font-medium text-gray-900 dark:text-gray-300">DUT1</label>
                        <input id="pavA-checkbox-list" type="checkbox" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes("1")} value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="pavA-checkbox-list" className="w-full py-3 ml-2 hidden md:inline text-sm font-medium text-gray-900 dark:text-gray-300">DUT 1</label>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CheckboxList;