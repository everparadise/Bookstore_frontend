import {Link, useLocation} from "react-router-dom";
import "../../css/sidebar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook,
    faCartShopping,
    faHouseChimney,
    faRankingStar,
    faReceipt,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {store} from "../../util/store";

export default function Sidebar() {
    const location = useLocation();

    const lists = [
        {
            text: "home", loc: "/home", font: (
                <FontAwesomeIcon icon={faHouseChimney}/>
            )
        },
        {
            text: "book", loc: "/book", font: (
                <FontAwesomeIcon icon={faBook}/>
            )
        },
        {
            text: "cart", loc: "/cart", font: (
                <FontAwesomeIcon icon={faCartShopping}/>
            )
        },
        {
            text: "order", loc: "/order", font: (
                <FontAwesomeIcon icon={faReceipt}/>
            )
        },
        {
            text: "rank", loc: "/rank", font: (
                <FontAwesomeIcon icon={faRankingStar}/>
            )
        },
        {
            text: "profile", loc: "/profile", font: (
                <FontAwesomeIcon icon={faUser}/>
            )
        }
    ]
    const adminList = [

        {
            text: "home", loc: "/home", font: (
                <FontAwesomeIcon icon={faHouseChimney}/>
            )
        },
        {
            text: "order", loc: "/order", font: (
                <FontAwesomeIcon icon={faReceipt}/>
            )
        },
        {
            text: "Rank Manage", loc: "/rankManage", font: (
                <FontAwesomeIcon icon={faRankingStar}/>
            )
        },
        {
            text: "User Manage", loc: "/userManage", font: (
                <FontAwesomeIcon icon={faUser}/>
            )
        }
    ]
    const selectedList = store.getState().authority === "ADMIN" ? adminList : lists;

    const listsMap = selectedList.map((item) => {
        return <Link key={item.text} className={`sidebarList ${location.pathname.startsWith(item.loc) ? "active" : ""}`}
                     to={item.loc === "/book" ? "#" : item.loc}>
            {item.font}<Spacer8px/>{item.text}
        </Link>
    })
    return (
        <div className="sidebar">
            <ul className="sidebarContainer">
                {listsMap}
            </ul>
        </div>
    )
}

export function Spacer8px() {
    return (
        <span style={{display: "inline-block", width: "8px"}}/>
    )
}