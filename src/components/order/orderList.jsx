import "../../css/cart.css"
import "../../css/order.css"
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {IMAGE_PREFIX} from "../../constant/constant";

export function OrderItem({item}) {
    const [detail, setDetail] = useState(false);

    function handleDetail() {
        setDetail(!detail);
    }

    return (
        <>
            <div className="orderItemGrid">
                <button className="detailSpan" onClick={handleDetail}><FontAwesomeIcon icon={faPlus}/></button>
                <p className="orderItemFont">{item.username}</p>
                <p className="orderItemFont">{item.telephone}</p>
                <p className="orderItemFont">{item.address}</p>
                <p className="orderItemFont">{item.dateTime}</p>
            </div>
            {detail ? <Detail item={item}></Detail> : null}
        </>

    )
}

export function OrderHeader() {
    return (
        <div className="orderHeaderGrid">
            <p></p>
            <p className="listHeader">收货人</p>
            <p className="listHeader">联系方式</p>
            <p className="listHeader">收货地址</p>
            <p className="listHeader">下单时间</p>
        </div>
    )
}

export function Detail({item}) {
    //参数为orderdata
    return (
        <div className="cartDetail">
            <span className="detailPicContainer">
                 <img className="detailPic" src={IMAGE_PREFIX + item.pic} alt={item.name}/>
            </span>
            <p className="listHeader orderSpacer">书名: {item.name}</p>
            <p className="orderItemFont">数目: {item.number}</p>
        </div>
    )
}