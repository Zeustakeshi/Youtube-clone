import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, duration: number = 1000) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, duration);
        return () => {
            clearTimeout(timer);
        };
    }, [value]);
    return debounceValue;
}
