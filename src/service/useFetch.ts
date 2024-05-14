import {useEffect, useState} from "react";
import {fetchData} from "./fetchAPI";

export function useFetch(endpoint: string): any{
    const [data, setData] = useState(null);

    useEffect(()=>{
        const getData = async ()=>{
            const fetchedData = await fetchData(endpoint);
            setData(fetchedData);
        }
        getData();
    }, [endpoint]);

    return data;
}