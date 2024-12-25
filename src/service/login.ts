import {PrivateFetch} from "./PrivateFetch";
import {loginUser, logoutUser, store} from "../util/store";
import {response} from "../types/response";
import {message} from "antd";

export async function login(username: string, password: string): Promise<boolean | string> {
    function loginCallBack(data: response) {
        if (!data.valid) {
            if (data.message === "username or password wrong") {
                message.error("用户名或密码错误");
                return false
            }
            message.error("network error");
            return false;
        }


        store.dispatch(loginUser(data.resource, data.message));
        if (data.message === "ADMIN") {
            message.success("ADMIN登录成功");
        } else if (data.message === "USER") {
            message.success("登录成功");
        } else if (data.message === "BANNED") {
            message.error("账号已被禁用");
            return false;
        }

        return data.resource;
    }

    const loginRequest = async (username: string, password: string): Promise<boolean> => {
        return await PrivateFetch("auth/login", "POST", null, {username, password}, loginCallBack);
    }

    return loginRequest(username, password);

}

export async function logout(){
    function logoutCallBack(data: response) {
        // console.log(data)
        // console.log(data.valid)
        if (!data.valid) {
            message.error("server internal error");
        }

        const duration = data.resource;
        console.log("duration", duration)
        const hours = Math.floor((duration / (1000 * 60 * 60)));
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const seconds = Math.round((duration / 1000) % 60);

        store.dispatch(logoutUser());
        message.success(`登录时长 ${hours}小时 ${minutes}分钟 ${seconds}秒`);
    }

    const loginRequest = async (): Promise<boolean> => {
        return await PrivateFetch("auth/logout", "GET", null, null, logoutCallBack);
    }

    return loginRequest();
}