import {MytextInput, PasswordInput} from "./loginContainer";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import {postData} from "../../service/postAPI";
import {loginUser, store} from "../../reduxLogic/store";

export function RegisterContainer() {
    const [username, setUsername] = useState("");
    const [password, setPwd] = useState("");
    const [secondpwd, setSecondpwd] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.target.disabled = true;
        e.stopPropagation();
        e.preventDefault();
        if (password !== secondpwd) {
            message.warning({
                content: "两次输入的密码不一致，请重新输入密码"
            })
        } else {
            const user = await postData("user/addUser", {username, password});
            if (user != null) {
                store.dispatch(loginUser(user));
                navigate("/home");
            }
        }
        e.target.disabled = false;
    }

    useEffect(() => {

    }, []);
    return (
        <div className="loginContainer">
            <div className="LogoContainer"><img className="Logo" src="/src/logo_col.png" alt="Book Ease"/></div>
            <form className="loginForm">
                <MytextInput state={{value: username, func: setUsername}}/>
                <PasswordInput state={{value: password, func: setPwd}} placeholder="请设置一个密码"/>
                <PasswordInput state={{value: secondpwd, func: setSecondpwd}} placeholder="请再次输入密码"/>
                <button onClick={handleRegister} className="loginButton">注册账号</button>
            </form>
        </div>
    )
}

