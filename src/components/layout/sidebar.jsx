import {Link, useLocation} from "react-router-dom";
import {useRef} from "react";
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
export default function Sidebar(){
    const location = useLocation();
    const activeRef = useRef();
    const lists = [
        {text: "home", loc: "/home", font: (
                <FontAwesomeIcon icon={faHouseChimney} />
            )},
        {text: "book", loc: "/book", font: (
                <FontAwesomeIcon icon={faBook} />
            )},
        {text: "cart", loc: "/cart", font: (
                <FontAwesomeIcon icon={faCartShopping}/>
            )},
        {text: "order", loc: "/order", font:(
                <FontAwesomeIcon icon={faReceipt} />
            )},
        {text: "rank", loc: "/rank", font:(
                <FontAwesomeIcon icon={faRankingStar} />
            )},
        {text: "profile", loc: "/profile", font:(
                <FontAwesomeIcon icon={faUser} />
            )}
    ]
    const listsMap = lists.map((item)=>{
        return <Link key = {item.text} className = {`sidebarList ${location.pathname.startsWith(item.loc) ? "active" : ""}`}
                    to = {item.loc === "/book" ? "#" : item.loc}>
                    {item.font}<Spacer8px/>{item.text}
                </Link>
    })
    return(
        <div className="sidebar">
            <ul className = "sidebarContainer">
                {listsMap}
            </ul>
        </div>
    )
}
export function Spacer8px(){
    return (
        <span style={{display: "inline-block", width: "8px"}}/>
    )
}