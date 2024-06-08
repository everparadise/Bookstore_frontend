import {cartItem} from "../types/cartItem";
import {orderItem} from "../types/OrderData";

export function CartItemToOrderItem(CartItem: cartItem): orderItem {
    return {
        numbers: CartItem.number,
        bid: CartItem.bid,
        cid: CartItem.cid
    }
}
