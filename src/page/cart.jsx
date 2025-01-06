import {List, message, Modal} from "antd";
import {CartHeader, CartListItem} from "../components/cart/cart";
import "../css/cart.css"
import {PrivateEmpty} from "../components/404page/privateEmpty";
import {useEffect, useState} from "react";
import {postOrder} from "../service/postOrder";
import {PrivateFetch} from "../service/PrivateFetch";
import {CartItemToOrderItem} from "../service/CartItemToOrderItem";

export default function Cart() {
    //let totalPrice = 0;
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [receiver, setReceiver] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [address, setAddress] = useState(null);
    const [websocket, setWebsocket] = useState([]);

    async function getCart() {
        const cartList = await PrivateFetch(`cart`, "GET");
        setCartItems(cartList);
    }

    function showModal() {
        setIsModalOpen(true);
    }

    async function handlePurchase(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!receiver) {
            message.warning("请添加收件人");
            return;
        }
        if (!address) {
            message.warning("请添加收件地址");
            return;
        }
        if (!telephone) {
            message.warning("请添加联系方式");
            return;
        }
        try {
            const newOrderItem = cartItems.map(CartItemToOrderItem);
            const newOrder = {
                telephone: telephone,
                address: address,
                receiver: receiver,
                items: newOrderItem
            }
            const ws = await postOrder(newOrder);
            setWebsocket([...websocket, ws]);
        } catch (error) {
            message.error("添加失败");
        }

        setCartItems(cartItems.filter((item) => !item.selected));
        //message.success("下单成功");
        setIsModalOpen(false);
    }

    function handleCancel(e) {
        e.stopPropagation();
        e.preventDefault();
        setIsModalOpen(false);
    }

    async function handleDelete(e, cid) {
        // const cartList = await
        PrivateFetch(`cart/${cid}`, "DELETE");
        setCartItems(cartItems.filter(item => item.cid !== cid));
    }

    useEffect(() => {
        getCart();
        return () => {
            websocket.forEach((ws) => {
                ws.close();
            });
        }
    }, []);


            async function handleSelect() {
                let calculator = 0;
                console.log("calculatePrice")
                console.log("cartItems:", cartItems, "Type:", typeof cartItems);
                const selectedItems = cartItems
                    .filter(item => item.selected)
                    .map(item => [item.price, item.number]); // 将每个商品变成一个数组 [price, quantity]

                if (selectedItems.length > 0) {
                    // 发送一个包含所有选中商品的数组的请求
                    const response = await fetch("http://localhost:8083/calculatePrice", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(selectedItems), // 发送多个商品信息
                    });

                    // 检查响应
                    if (!response.ok) {
                        console.error("Network response was not ok");
                        return;
                    }

                    // 解析响应数据
                    const totalPrices = await response.json();
                    console.log("Total Prices from Response:", totalPrices);

                    // 计算总价
                    calculator = totalPrices.reduce((acc, price) => acc + price, 0);
                    console.log("Calculated Total Price:", calculator);
                    setTotalPrice(calculator);
                } else {
                    console.log("No items selected");
                }
            }
    //}
    // if (cartItems != null) {
    //     //let price = 0;
    //     console.log(cartItems);
    //     cartItems.forEach((item) => {
    //         if (item.selected) totalPrice += item.price * item.number;
    //     })
    // setTotalPrice(price);
    //}
    // useEffect(() => {
    //     async function calculatePrice() {
    //         console.log("calculatePrice")
    //         let price = 0
    //         console.log("cartItems:", cartItems, "Type:", typeof cartItems);
    //
    //         for (let i = 0; i < cartItems.length; i++) {
    //             console.log("cartItems[i]:", cartItems[i])
    //             const item = cartItems[i];
    //             if (item.selected){
    //                 const response = await fetch("http://localhost:8083/calculatePrice", {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify([item.price, item.number]), // 发送 [[1, 2]] 作为请求体
    //                 });
    //                 console.log("response",response.json());
    //                 price+= await response.json();
    //             }
    //         }
    //         setTotalPrice(price);
    //     }
    //     if(cartItems)
    //     calculatePrice();
    // }, [cartItems]);

    const [check, setCheck] = useState(true);
    return (
        <>
            <div className="cartItem">
                <div>
                    {cartItems ?
                        <List pagination={{position: 'bottom', align: 'center'}}
                              header={<CartHeader data={cartItems} state={{check, setCheck}}/>}
                              dataSource={cartItems}
                              locale={{emptyText: <PrivateEmpty/>}}
                              renderItem={(item, index) => {
                                  return <CartListItem item={item} state={{check, setCheck}}
                                                       handleDelete={handleDelete} handleSelect={handleSelect}></CartListItem>
                              }}
                        ></List> : null}
                </div>

                {cartItems && cartItems.length ? <>
                    <p style={{
                        fontWeight: "bold",
                        color: "rgb(40, 40, 40)",
                    }}>总价: {totalPrice / 100}元</p>
                    {totalPrice ? <button className="purchaseNow" onClick={showModal}>立即下单</button> : null}
                </> : null}
            </div>
            <CartModal handleSubmit={handlePurchase} handleCancel={handleCancel} state={{
                address: address, telephone: telephone, receiver: receiver, isModalOpen: isModalOpen,
                setAddress: setAddress, setReceiver: setReceiver, setTelephone: setTelephone
            }}/>
        </>
    )
}

function CartModal({handleSubmit, handleCancel, state}) {
    const isModalOpen = state.isModalOpen;
    const setReceiver = state.setReceiver;
    const setTelephone = state.setTelephone;
    const address = state.address;
    const receiver = state.receiver;
    const telephone = state.telephone;
    const setAddress = state.setAddress;
    return (
        <Modal centered={true} title={"请添加订单信息"} open={isModalOpen} footer={null} closable={false}>
            <form className="purchaseForm">
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
    )
}