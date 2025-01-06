import {orderBook} from "../types/OrderData";
import {PrivateFetch} from "./PrivateFetch";
import {message} from "antd";
import {websocketFactory} from "../util/websocketFactory";
import {store} from "../util/store";

export async function postOrder(orders: orderBook, endpoint: string = "order") {
    console.log(orders);
    function callback(){
        message.success("订单已接收,处理结果请稍候");
    }
    console.log(`order-endpoint/${store.getState().token}`)
    const ws = websocketFactory(`order-endpoint/${store.getState().token}`, onMessage, onOpen, onClose, onError);
    PrivateFetch(endpoint, "POST", null, orders, callback);
    function onMessage(event: any){
        console.log("message")
        const dataList = event.data.split(' ');
        if(dataList[0] == "ok"){
            message.success("订单号为 \"" + dataList[1] + "\" 的订单已处理成功");
        }
        else{
            message.error("订单处理失败: " + dataList[1]);
            console.log("处理失败原因: ", dataList[2]);
        }
    }
    function onOpen(){
        console.log("websocket open");
    }
    function onClose(){
        //message.warning("不再等待订单处理结果");
    }
    function onError(error: any){
        console.log("websocket error: ", error);
    }
    return ws;
}