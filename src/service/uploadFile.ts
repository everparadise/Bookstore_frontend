import {message} from "antd";
import {PrivateFetch} from "./PrivateFetch";

export async function uploadFile(pic: any, setUrl: any, url: string, bid: any) {
    const formData = new FormData();

    formData.append('image', pic);
    try {
        const backendUrl = await PrivateFetch(`image/upload/${bid}`, "POST", {}, formData);
        message.success("图像上传成功");
        console.log(backendUrl);
        setUrl(backendUrl);
        return backendUrl;
    } catch (e) {
        message.error("上传图像失败");
        setUrl(url);
    }
}
