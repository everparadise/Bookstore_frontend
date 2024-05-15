import {Link} from "react-router-dom";
import "../../css/bookListContainer.css"
import {Pagination} from "antd";
import Search from "antd/es/input/Search";

import {useEffect, useState} from "react";
import {fetchData} from "../../service/fetchAPI";

export default function BookListContainer() {
    const [page, setPage] = useState(0);
    const [bookList, setBookList] = useState(null);
    let bookcards = null;

    async function getBooks(page) {
        const book = await fetchData(`book/books/${page}`);
        setBookList(book);
    }

    useEffect(() => {
        getBooks(page);
    }, [page]);

    if (bookList) {
        bookcards = bookList.map((book) => (
            <BookCards book={book} key={book.bid} handleClick={handlePurchase}/>
        ))
    }

    function handlePurchase(book) {

    }


    return (
        <div className="bookControlContainer">
            <Search style={{
                marginTop: "24px",
                lineHeight: "1.2",
            }} size="large"></Search>
            <div className="bookListContainer">
                {bookcards}
            </div>
            <Pagination current="1" total="10" pageSize="20" style={{
                marginTop: "12px",
                textAlign: "center",
            }}/>

        </div>

    )
}

function BookCards({book, handleClick}) {
    return (
        <div className="bookcardsLink">

            <div className="picsContainer">
                <Link to={`/book/${book.bid}`}><img className="bookPic" src={book.pic} alt={book.name}/></Link>
            </div>
            <div className="bookName">{book.name}</div>

            <div className="bookLighter">价格：￥{book.price}</div>
            <button className="purchaseButton" onClick={handleClick(book)}>购买</button>

        </div>

    )
}