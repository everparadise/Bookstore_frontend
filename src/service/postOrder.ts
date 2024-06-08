import {orderBook} from "../types/OrderData";
import {PrivateFetch} from "./PrivateFetch";

export function postOrder(orders: orderBook, endpoint: string = "order") {
    console.log(orders);
    PrivateFetch(endpoint, "POST", null, orders);
}