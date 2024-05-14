import {book}  from "./book"
export interface cartItem{
    cid: number,
    bid: number,
    uid: number,
    name: string,
    price: number,
    pic: string,
    comment: string,
    number: number,
    selected: boolean

}