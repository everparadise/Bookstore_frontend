
import {Avatar} from "../components/profile/avatar";
import {SelfInfo} from "../components/profile/selfInfo";
import {useFetch} from "../service/useFetch";

export function ProfilePage(){
    const user = useFetch("user/getUser/1");
    return(
        user && <div className = "profile-page">

            <Avatar user = {user}></Avatar>
            <SelfInfo user = {user}></SelfInfo>
        </div>
    )
}