const RoomSkeletons = () => {
    const roomSkeletons = [];
    Array.from({length: 12}).forEach((_, index) => {
        roomSkeletons.push(<RoomSkeleton key={`skeleton-${index}`}/>);
    });
    return roomSkeletons;
};

const RoomSkeleton = ()=>{
    return(
    <div role="status" className="flex flex-col bg-gray-200 w-[290px] gap-3 border border-gray-300 text-gray-600 rounded-lg px-6 py-3 shadow animate-pulse">
        <div className="flex gap-8 justify-start items-center">
            <div className="h-12 w-12 rounded-[50%] bg-opacity-20 bg-gray-500 font-bold"></div>
            <div className="h-2.5 bg-gray-500 bg-opacity-20 rounded-full dark:bg-gray-700 w-[70%]"></div>
        </div>
    </div>)
}

export default RoomSkeletons;