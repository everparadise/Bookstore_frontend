import {Avatar} from "../../components/profile/avatar";
import {SelfInfo} from "../../components/profile/selfInfo";
import {PrivateFetch} from "../../service/PrivateFetch";
import {useEffect, useState} from "react";

export function ProfilePage() {
    const [user, setUser] = useState(null);

    async function getUser() {
        let res;
        try {
            res = await PrivateFetch("user", "GET");
        } catch (error) {

        }
        setUser(res);
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        user && <div className="profile-page">

            <Avatar user={user}></Avatar>
            <SelfInfo user={user}></SelfInfo>
        </div>
    )
}