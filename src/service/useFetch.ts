import {useEffect, useState} from "react";
import {PrivateFetch} from "./PrivateFetch";

export function useFetch(endpoint: string): any {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const fetchedData = await PrivateFetch(endpoint, "GET");
            setData(fetchedData);
        }
        getData();
    }, [endpoint]);

    return data;
}