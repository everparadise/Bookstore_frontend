import {Link} from "react-router-dom";
import {Checkbox, InputNumber} from "antd";
import "../../css/cart.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {IMAGE_PREFIX} from "../../constant/constant";

export function CartListItem({item, state, handleDelete, handleSelect}) {
    //参数item 是cartBook类型对象
    const [detail, setDetail] = useState(false);

    function handleDetail() {
        setDetail(!detail);
    }

    return (
        <div>
            <div className="cartListItem">
                <button className="detailSpan" onClick={handleDetail}><FontAwesomeIcon icon={faPlus}/></button>
                <Checkbox checked={item.selected} onChange={(e) => {
                    item.selected = e.target.checked;
                    handleSelect();
                    state.setCheck(!state.check);
                }}/>
                <Link to={`/book/${item.bid}`} className="namelink">{item.name}</Link>
                <InputNumber style={{
                    height: '35px',
                    margin: 'auto 0'
                }} min={1} max={100} defaultValue={item.number} onChange={(value) => {
                    item.number = value;
                    handleSelect();
                    state.setCheck(!state.check);
                }}/>
                <span> {item.number * item.price / 100}</span>
                <button className="deleteButton" onClick={(e) => handleDelete(e, item.cid)}>删除</button>
            </div>
            {detail ? <BookListDetail item={item}></BookListDetail> : null}
        </div>

    )
}

export function CartHeader({data, state}) {
    return (
        <div className="cartHeader">
            <span/>
            <Checkbox onChange={(e) => {
                data.forEach((item) => {
                    item.selected = e.target.checked;
                })
                state.setCheck(!state.check);
            }}/>
            <span className="listHeader"> 书名 </span>
            <span className="listHeader"> 数量 </span>
            <span className="listHeader"> 价格 </span>
            <span className="listHeader"> 操作 </span>
        </div>
    )
}

export function BookListDetail({item}) {
    //参数为book类
    return (
        <div className="cartDetail">
            <span className="detailPicContainer">
                 <img className="detailPic" src={IMAGE_PREFIX + item.pic} alt={item.name}/>
            </span>
            <p>{item.comment}</p>
        </div>
    )

}