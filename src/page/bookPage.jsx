import {GridLayout} from "../components/layout/layout";
import Sidebar, {Spacer8px} from "../components/layout/sidebar";
import "../css/font-text.css"
import "../css/bookPage.css"
import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCartShopping, faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {Image, InputNumber, message, Modal} from "antd";
import {BookList} from "../service/datas.ts";
import {useFetch} from "../service/useFetch";
import {postData} from "../service/postAPI";
import {store} from "../reduxLogic/store";
import {useState} from "react";
import {MytextInput} from "../components/login/loginContainer";
import {postOrder} from "../service/postOrder";
export function BookPage(){
    const index = useParams();


    return(
        <BookMain index = {parseInt(index.id)}></BookMain>
    )
}
export function BookMain({index}){
    const book = useFetch(`book/book/${index}`);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [number, setNumber] = useState(1);
    const [receiver, setReceiver] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [address, setAddress] = useState(null);
    const state = store.getState();
    const navigate = useNavigate();
    function showModal(){
        setIsModalOpen(true);
    }
    function handleSubmit(e){
        e.stopPropagation();
        e.preventDefault();
        if(!receiver){
            message.warning("请添加收件人");
            return;
        }
        if(!address){
            message.warning("请添加收件地址");
            return;
        }
        if(!telephone){
            message.warning("请添加联系方式");
            return;
        }
        postOrder({bid: index, telephone: telephone, totalPrice: number* book.price, uid: state.user.uid, reveiver: receiver, number: number});
        message.success("下单成功");
        setIsModalOpen(false);
        navigate("/home");
    }
    function handleCancel(e){
        e.stopPropagation();
        e.preventDefault();
        setIsModalOpen(false);
    }
    return (
        book && <>
            <BookGrid book={book} showModal={showModal}></BookGrid>
            <Modal centered={true} title={"请添加订单信息"} open = {isModalOpen} footer={null} closable={false}>
                <form className="purchaseForm">
                    <p className = "modalTitle">下单数量</p>
                    <InputNumber style={{
                        height: '35px',
                        margin: 'auto 0'
                    }} min={1} max={100} defaultValue={1} onChange = {(value)=>{
                        setNumber(value);
                    }}/>
                    <p className="modalTitle">收件人</p>
                    <input className="input-modal" onChange={e => setReceiver(e.target.value)}
                           placeholder="请输入收件人" value={receiver}/>
                    <p className="modalTitle">联系方式</p>
                    <input className="input-modal" onChange={e => setTelephone(e.target.value)}
                           placeholder="请输入联系方式" value={telephone}/>
                    <p className="modalTitle">收货地址</p>
                    <input className="input-modal" onChange={e => setAddress(e.target.value)}
                           placeholder="请输入收货地址" value={address}/>

                    <div className="modalGrid">

                        <button className="submit" onClick={handleSubmit}>下单</button>

                        <button className="cancel" onClick={handleCancel}>取消</button>

                    </div>
                </form>
            </Modal>
        </>
    )
}

function BookGrid({book, showModal}) {
    const navigate = useNavigate();
    const state = store.getState()

    async function handleCart() {
        await postData("cart/addItem", {bid: book.bid, uid: state.user.uid})
        message.success("成功添加购物车");
        navigate("/home");
    }
    return (
        <div className="bookGrid">

            <div className="grid1">
                <div className="bookPicContainer">
                    <Image src={book.pic}/>

                </div>
                <div className="bookComment">
                    <Title text={book.name}></Title>
                    <SpacerLine>
                        <Key text="作者: "></Key><Val text={book.author}></Val>
                    </SpacerLine>
                    <SpacerLine>
                        <Key text="分类: "></Key><Val text={book.name}></Val>
                    </SpacerLine>
                    <SpacerLine>
                        <Key text="定价: "></Key><Val text={book.price}></Val>
                    </SpacerLine>
                    <SpacerLine>
                        <Key text="状态: "></Key><Val text={book.name}></Val>
                    </SpacerLine>
                    <Key text="作品简介: "></Key>
                    <div className="comment"><p className="commentFont">{book.comment}</p></div>
                </div>
            </div>
            <div className="grid2">
                <span></span>
                <button className="addCart" onClick = {()=>handleCart()}><FontAwesomeIcon icon={faCartShopping} beatFade/><Spacer8px/>加入购物车
                </button>
                <button className="buyNow" onClick = {showModal}><FontAwesomeIcon icon={faCreditCard} beatFade/><Spacer8px/>立即购买</button>
                <span></span>
            </div>
        </div>

    )
}

export function Key({text}) {
    return (
        <span className="key">
            {text}
        </span>)
}

export function Val({text}) {
    return (
        <span className="val">
            {text}
        </span>
    )
}

export function Title({text}) {
    return (
        <div className="title">
            {text}
        </div>
    )
}

export function SpacerLine({children}) {
    return (<div className="spacerLine">
        {children}
    </div>)
}