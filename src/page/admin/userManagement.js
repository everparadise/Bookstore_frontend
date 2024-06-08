import {SearchAndPageContainer} from "../../components/homepage/bookCards";
import {useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import {PrivateFetch} from "../../service/PrivateFetch";
import {message} from "antd";
import {faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../css/userManagement.css"

export function UserManagement(){
    const [user, setUser] = useState(null);


    async function getTargetUser(value){
        const result = await PrivateFetch(`user/${value}`, "GET");
        if(result) setUser(result);
    }


    return(
        <div className = "cartItem centerFlex">
            <Search style={{
                marginTop: "24px",
                lineHeight: "1.2",
            }} size="large" onSearch={(value) => getTargetUser(value)} placeholder = "请输入目标用户名"></Search>
            {user && <UserManager user={user}/>}
        </div>
    )
}

function UserManager({user}){
    const [state, setState] = useState(user.role !== "BANNED");

    async function changeState(){
        const result = await PrivateFetch(`user/${state ? "ban" : "unban"}/${user.uid}`, "PUT");
        if(result){
            setState(!state);
            message.success("操作成功")
        }
        else message.error("操作失败")
    }

    return(
        <div className="userManager">
            <span className="user-image-container">
                <img src={user.avatar} className="user-image" alt={user.avatar}/>
            </span>
            <span className="listHeader user-name">{user.username}</span>
            <span className="buttonContainer">
                <button onClick={changeState} className="float-right m-auto">{state ?
                    <FontAwesomeIcon icon={faLockOpen}/> :
                    <FontAwesomeIcon icon={faLock}/>}</button>
            </span>

        </div>
    )
}