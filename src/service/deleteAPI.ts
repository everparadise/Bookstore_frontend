import {BASE_URL} from "../constant/constant";

export async function deleteData(endUrl: string, options: object = {}) {
    const url = `${BASE_URL}${endUrl}`;
    const defaultOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const finalOptions = {...defaultOptions, ...options};
    console.log(url);
    console.log(finalOptions);
    try {
        const response = await fetch(url, finalOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status : ${response.status}`);
        }
        const data = await response.json();

        if (data.valid === false) {
            throw new Error(`Inner Fault ${data.message}`);
        }
        //console.log(data);
        return data.resource;
    } catch (error) {
        console.error("Fetch error", error);
        throw error;
    }
}

