import {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import "../../css/loginContainer.css"
import "../../css/textInput.css"
import {message} from "antd"
import {login} from "../../service/login";

export function LoginContainer({width, height}) {
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.target.disabled = true;
        e.preventDefault();
        e.stopPropagation();
        if (username === "") {
            message.warning({
                content: "请输入用户账户"
            })
            return;
        } else if (pwd === "") {
            message.warning({
                content: "请输入用户密码"
            })
            return;
        }

        await login(username, pwd);
        navigate("/home");

    }

    return (
        <div className="loginContainer">
            <div className="LogoContainer"><img className="Logo" src="/src/logo_col.png" alt="Book Ease"/></div>
            <form className="loginForm">
                <MytextInput state={{value: username, func: setUsername}} message="请输入用户名"/>
                <PasswordInput state={{value: pwd, func: setPwd}} placeholder="请输入密码"/>
                <RegAndFind></RegAndFind>
                <button onClick={handleLogin} className="loginButton">登录</button>
            </form>
        </div>
    )
}

export function RegAndFind() {
    return (
        <div className="regAndFind">
            <Link to="register" className="reg regFindLink">新用户？请走此路</Link>
            {//<Link to="findPwd" className="find regFindLink">忘记密码？</Link>
            }
        </div>
    )
}

export function MytextInput({state, message}) {
    return (
        <div className="textinput">
            <div className="iconContainer">
                <div className="imgContainer" style={{
                    backgroundImage: "url(/src/profile.png)"
                }}>
                </div>
            </div>
            <input className="input-middle" onChange={e => state.func(e.target.value)} placeholder={message}
                   value={state.value}/>
        </div>
    )
}

export function PasswordInput({state, placeholder}) {
    function handleInput(e) {
        e.stopPropagation();
        state.func(e.target.value);
    }

    return (
        <div className="textinput">
            <div className="iconContainer">
                <div className="imgContainer" style={{
                    backgroundImage: "url(/src/lock.png)"
                }}>
                </div>
            </div>
            <input className="input-middle" onChange={handleInput} placeholder={placeholder} value={state.value}
                   type="password"/>
        </div>
    )
}