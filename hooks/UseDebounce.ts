import { execPath } from "process";
import { useEffect , useState } from "react";

function UseDebounce<T>(value: T , delay?: number): T{
    const [debouncedValue , setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || 250)

        return () => {
            clearTimeout(timer);
        }
    } , [value, delay]);

    return debouncedValue;

}

export default UseDebounce;