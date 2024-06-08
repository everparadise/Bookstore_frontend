import {Link} from "react-router-dom";
import "../../css/bookListContainer.css"
import {Pagination} from "antd";
import Search from "antd/es/input/Search";

import {useEffect, useState} from "react";
import {PrivateFetch} from "../../service/PrivateFetch";
import {PAGE_SIZE} from "../../constant/constant";

export default function BookListContainer() {
    const [page, setPage] = useState(1);
    const [bookList, setBookList] = useState(null);
    const [totalElements, setTotalElements] = useState(1);
    const [value, setValue] = useState("");
    let bookcards = null;

    async function getBooks(page, value) {
        const pageRequest = {
            "value": value,
            "page": page - 1
        }
        const bookPage = await PrivateFetch(`book/books`, "POST", null, pageRequest);
        setTotalElements(bookPage.totalElements);
        setBookList(bookPage.content);
    }


    function searchHandler(value) {
        setValue(value);
    }

    useEffect(() => {
        getBooks(page, value);
    }, [page, value]);

    if (bookList) {
        bookcards = bookList.map((book) => (
            <BookCards book={book} key={book.bid}/>
        ))
    }


    return (
        <SearchAndPageContainer page={page} setPage={setPage} searchHandler={searchHandler}
                                totalElements={totalElements}>
            <div className="bookListContainer">
                {bookcards}
            </div>
        </SearchAndPageContainer>
    )
}

function BookCards({book}) {
    return (
        <div className="bookcardsLink">

            <div className="picsContainer">
                <Link to={`/book/${book.bid}`}><img className="bookPic" src={book.pic} alt={book.name}/></Link>
            </div>
            <div className="bookName">{book.name}</div>

            <div className="bookLighter">价格：￥{book.price / 100}</div>
            <button className="purchaseButton">购买</button>

        </div>

    )
}

export function SearchAndPageContainer({searchHandler, totalElements, page, setPage, children}) {
    return (
        <div className="bookControlContainer">
            <Search style={{
                marginTop: "24px",
                lineHeight: "1.2",
            }} size="large" onSearch={searchHandler}></Search>
            {children}
            <Pagination current={page} total={totalElements} pageSize={PAGE_SIZE} style={{
                marginTop: "12px",
                textAlign: "center",
            }} onChange={(value) => {
                setPage(value)
            }}/>

        </div>
    )
}