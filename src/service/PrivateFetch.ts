import {store} from "../util/store";
import {message} from "antd";

export const TARGET_URL: string = process.env.BASE_URL ?? "http://localhost:8080/";
export const CURR_VERSION: string = process.env.VERSION ?? "v1/";
export const base = `${TARGET_URL}${CURR_VERSION}`;


interface RequestOptions {
    method: string;
    credentials: any;
    headers?: any;
    body?: any;
}

export async function PrivateFetch(endpoint: string, method: string, options: any = null, body: any = null, callback: any = null) {
    const url: string = `${base}${endpoint}`;
    const token = store.getState().token;
    const defaultOptions: RequestOptions = {
        method: method || "GET",
        credentials: "include",
        headers: {
        }
    };
    if (body && method !== "GET") {
        if (body instanceof FormData) {
            defaultOptions.body = body;
        } else {
            defaultOptions.headers['Content-Type'] = "application/json"
            defaultOptions.headers['credentials'] = "include"
            defaultOptions.body = JSON.stringify(body);
        }
    }
    else {
        defaultOptions.headers['Content-Type'] = "application/json"
    }
    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }


    const finalOptions = {...defaultOptions};
    console.log(url);
    console.log("token", token);
    //console.log(body);
    console.log(defaultOptions);
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
        if (response.status === 401) {
            //window.location.href = "/";
        }
    }

    const data = await response.json();
    if (callback) {
        return callback(data);
    } else if (!data.valid) {
        message.warning(data.message);
        //window.location.href = '/';
    }
    // if(data.message === "Authentication Failure"){
    //     window.location.href = '/';
    // }
    // throw new Error(`${data.message}}`);
    console.log(data, data.resource);
    return data.resource;

}