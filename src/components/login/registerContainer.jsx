import {MytextInput, PasswordInput} from "./loginContainer";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import {loginUser, store} from "../../util/store";
import {PrivateFetch} from "../../service/PrivateFetch";
import {registerCallback} from "../../service/registerCallback";

export function RegisterContainer() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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
        } else if (username === "") {
            message.warning({
                content: "请输入用户名"
            })
        } else if (email === "") {
            message.warning({
                content: "请输入注册邮箱"
            })
        } else {
            const user = await PrivateFetch("auth/register", "POST", null, {
                username,
                password,
                email
            }, registerCallback);
            if (user != null) {
                store.dispatch(loginUser(user, "USER"));
                message.success({
                    content: "注册成功"
                });
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
                <MytextInput state={{value: username, func: setUsername}} message="请输入用户名"/>
                <MytextInput state={{value: email, func: setEmail}} message="请输入注册邮箱"/>
                <PasswordInput state={{value: password, func: setPwd}} placeholder="请设置一个密码"/>
                <PasswordInput state={{value: secondpwd, func: setSecondpwd}} placeholder="请再次输入密码"/>
                <button onClick={handleRegister} className="loginButton">注册账号</button>
            </form>
        </div>
    )
}

