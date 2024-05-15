export interface book {
    bid: number,
    pic: string,
    name: string,
    comment: string,
    author: string,
    price: number,
    stock?: number,
    tag?: string,
    sales: number,
    isbn?: string
}

export interface BookDto {
    bid: number,
    pic: string,
    name: string,
    price: number,
    sales: number
}

export interface cartBook {
    book: book;
    number: number;
    selected: false;
}