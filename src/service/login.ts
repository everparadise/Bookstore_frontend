import {User} from "../types/user";
import {postData} from "./postAPI";

export async function login(username: string, password: string): Promise<User>{
    const loginRequest = async (username: string, password: string):Promise<User>=>{
        return await postData("user/loginRequest", {username, password});
    }
    return await loginRequest(username, password);
}