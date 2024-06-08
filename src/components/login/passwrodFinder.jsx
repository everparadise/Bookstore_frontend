import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {MytextInput, PasswordInput} from "./loginContainer";
import {message} from "antd";

export function PasswordFinder() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [containerState, setContainerState] = useState(0);
    const [user, setUser] = useState(null);

    function handleFind() {
        if (newPassword === "") {
            message.warning({
                content: "请输入新密码"
            })
            return;
        }
        navigate("../");
    }

    async function handleNext(e) {
        e.preventDefault();
        e.stopPropagation();

        // target = await PrivateFetch("")
        //
        // if (!target) {
        //     message.error({
        //         content: "用户不存在，请重新输入用户账户"
        //     })
        //     return;
        // }
        // setUser(target);
        // setContainerState(containerState + 1);
    }

    const inputUsername = (
        <div className="loginContainer">
            <div className="LogoContainer"><img className="Logo" src="/src/logo_col.png" alt="BookEase"/></div>
            <form className="loginForm">
                <MytextInput state={{value: username, func: setUsername}} message="请输入用户名"/>
                <button onClick={handleNext} className="loginButton">下一步</button>
            </form>
        </div>
    );
    const inputNewPassword = (
        <div className="loginContainer">
            <div className="LogoContainer"><img className="Logo" src="/src/logo_col.png" alt="BookEase"/></div>
            <form className="loginForm">
                <PasswordInput state={{value: newPassword, func: setNewPassword}} placeholder={"请输入新密码"}/>
                <button onClick={handleFind} className="loginButton">设置密码</button>
            </form>
        </div>
    )
    return (
        containerState ? inputNewPassword : inputUsername
    )
}
