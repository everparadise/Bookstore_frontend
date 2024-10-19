import "../../css/header.css"
import {Link, useNavigate} from "react-router-dom"
import {Dropdown} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faMoneyBill1, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {PrivateFetch} from "../../service/PrivateFetch";
import {logoutUser, store} from "../../util/store";
import {logout} from "../../service/login";

export default function Navbar() {
    const navigate = useNavigate();
    const tagsItems = [
        {value: "/home", text: "Home"},
        {value: "/cart", text: "Cart"},
    ];

    const [user, setUser] = useState(null);

    async function getUserInfo() {
        const res = await PrivateFetch("user", "GET");
        setUser(res);
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    function onClick(value) {
        console.log("key", value);
        if (value.key === "logOut") {
            logout();
            store.dispatch(logoutUser());
            navigate("/");
        }
    }

    const dropDownItems = [
        {
            key: 'username',
            label: user ? user.username : 'loading',
            icon: <FontAwesomeIcon icon={faUser}/>
        },
        {
            key: 'pwdChange',
            label: '修改密码',
            icon: <FontAwesomeIcon icon={faKey}/>
        },
        {
            key: 'remainMoney',
            label: `余额: ${user ? user.remainMoney : "loading"}`,
            icon: <FontAwesomeIcon icon={faMoneyBill1}/>
        },
        {
            key: 'logOut',
            label: '登出',
            icon: <FontAwesomeIcon icon={faRightFromBracket}/>,
            danger: true,
        }
    ]
    const userAvatar = user ? user.avatar : "";
    return (
        <div className="Navbar">
            <img className="logo" src="/src/logo_col.png" onClick={() => {
                navigate("/home");
            }}/>
            <div className="spacer"/>
            <div className="sayHi">{`Hi,${user ? user.username : ""}`}</div>
            <Dropdown menu={{items: dropDownItems, onClick: onClick}}>
                <Link className="profileContainer" style={{
                    backgroundImage: `url(${userAvatar})`,
                    backgroundSize: "cover",
                    minHeight: "36px",
                    minWidth: "36px",
                }} to="profile">
                </Link>
            </Dropdown>
        </div>
    )
}
