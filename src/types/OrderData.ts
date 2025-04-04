//used for frontend data presentation
export interface orderData {
    address: string,
    number: number,
    dateTime: string,
    pic: string,
    name: string,
    telephone: string,
    receiver: string,
}

//used for pass data to backend
export interface orderBook {
    uid: number,
    bid: number,
    address: string,
    telephone: string,
    number: number,
    totalPrice: number;
    name: string;
}

export interface orderItem {
    bid: number,
    numbers: number,
    cid: number,
}