import { BASE_URL} from "../constant/constant";

export async function putData(endUrl: string, body:object = {}, options:object = {}){
    const url = `${BASE_URL}${endUrl}`;
    console.log(url);
    console.log(JSON.stringify(body))
    const defaultOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    const finalOptions = {...defaultOptions, ...options};
    console.log(finalOptions);
    try{
        const response = await fetch(url, finalOptions);
        if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`);
        }
        const data = await response.json();

        if(data.valid === false){
            console.log(data.message);
            return data.resource;
        }
        //console.log(data);
        return data.resource;
    }catch(error){
        console.error("Fetch error", error);
        throw error;
    }
}

