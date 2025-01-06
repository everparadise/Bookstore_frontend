import {message} from "antd";

export function registerCallback(response: any) {
    if (response.resource === "username") {
        message.error("当前用户名已存在");

    } else if (response.resource === "email") {
        message.warning("邮箱格式不正确");
    }
    return response.resource;
}