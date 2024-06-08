import {PrivateFetch} from "./PrivateFetch";
import {loginUser, store} from "../util/store";
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