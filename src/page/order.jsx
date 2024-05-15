import {List} from "antd";
import {OrderHeader, OrderItem} from "../components/order/orderList";
import {PrivateEmpty} from "../components/404page/privateEmpty";
import "../css/cart.css"
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {fetchData} from "../service/fetchAPI";

export function OrderPage() {

    const [data, setData] = useState(null);

    async function getOrderData() {
        const order = await fetchData("order/getOrder/1");
        setData(order);
    }

    useEffect(() => {
        getOrderData();
    }, [])
    return (
        <div className="cartItem">
            <Search style={{
                marginTop: "24px",
                lineHeight: "1.2",
            }} size="large"></Search>
            {data ? <List dataSource={data}
                          renderItem={(dataInfo) => <OrderItem item={dataInfo}></OrderItem>}
                          renderEmpty={{emptyText: <PrivateEmpty/>}}
                          pagination={{position: "bottom", align: "center"}}
                          header={<OrderHeader/>}
            ></List> : null}

        </div>
    )
}