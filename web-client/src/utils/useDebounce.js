import {useEffect} from "react";

const UseDebounce = (callback: () => void, delay: number = 500, dependencies: string[] = [])=>{
        useEffect(() => {
            const timeoutId = setTimeout(() => {
                callback();
            }, delay);

            return () => {
                clearTimeout(timeoutId);
            };
        }, dependencies);
}
export default UseDebounce;