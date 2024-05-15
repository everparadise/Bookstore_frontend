import {orderBook} from "../types/OrderData";
import {postData} from "./postAPI";

export function postOrder(orders: orderBook, endpoint: string = "order/addOrder/0") {
    postData(endpoint, orders);
}