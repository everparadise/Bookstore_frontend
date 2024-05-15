import "../../css/header.css"
import {Link, useNavigate} from "react-router-dom"
import {Dropdown} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faMoneyBill1, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Navbar({user}) {
    const navigate = useNavigate();
    const tagsItems = [
        {value: "/home", text: "Home"},
        {value: "/cart", text: "Cart"},
    ];
    const tags = tagsItems.map(items =>
        <NavTag text={items.text} value={items.value} key={items.text}/>
    )
    const dropDownItems = [
        {
            key: 'username',
            label: 'chiikawa',
            icon: <FontAwesomeIcon icon={faUser}/>
        },
        {
            key: 'pwdChange',
            label: '修改密码',
            icon: <FontAwesomeIcon icon={faKey}/>
        },
        {
            key: 'remainMoney',
            label: `余额: ${user.remainMoney}`,
            icon: <FontAwesomeIcon icon={faMoneyBill1}/>
        },
        {
            key: 'logOut',
            label: '登出',
            icon: <FontAwesomeIcon icon={faRightFromBracket}/>,
            danger: true,
        }
    ]
    return (
        <div className="Navbar">
            <img className="logo" src="/src/logo_col.png" onClick={() => {
                navigate("/home");
            }}/>
            <div className="spacer"/>
            <div className="sayHi">{"Hi,chiikawa"}</div>
            <Dropdown menu={{items: dropDownItems}}>
                <Link className="profileContainer" style={{
                    backgroundImage: "url(/src/profile/1.jpg)",
                    backgroundSize: "cover",
                    minHeight: "36px",
                    minWidth: "36px",
                }} to="profile">
                </Link>
            </Dropdown>
        </div>
    )
}

function NavTag({text, value}) {
    return (
        <div className="NavTag " style={{
            paddingLeft: 0,
            lineHeight: "64px",
            paddingRight: "10px",
            display: "inline-block",
        }}>
            <Link className="NavTagLink" to={value}>{text}</Link>
        </div>
    )
}