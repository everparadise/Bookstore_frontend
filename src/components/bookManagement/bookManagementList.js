import {useEffect, useState} from "react";
import {PrivateFetch} from "../../service/PrivateFetch";
import {List} from "antd";
import {BookManagementHeader, BookManagementItem} from "./bookManagementItem";

export function BookManagementList({page,setPage, value, setTotalElements, totalElements}) {

    const [bookList, setBookList] = useState(null);

    async function getBooks(page, value) {
        const pageRequest = {
            "value": value,
            "page": page - 1 >= 0 ? page - 1 : 0
        }
        const bookPage = await PrivateFetch(`book/books`, "POST", null, pageRequest);
        if(bookPage.content.length === 0){
            if(page !== 0)
                setPage(page-1);
            return;
        }
        setTotalElements(bookPage.totalElements);
        setBookList(bookPage.content);
    }
    function handleChange(){
        getBooks(page, value);
    }
    useEffect(() => {
        getBooks(page, value);
    }, [totalElements, page, value]);
    //
    return (
        <div className="cartItem">
            <div>
                {bookList ? <List dataSource={bookList}
                                  header={<BookManagementHeader totalElements={totalElements}
                                                                setTotalElements={setTotalElements} handleChange={handleChange}/>}
                                  renderItem={(item, index) => {
                                      return <BookManagementItem item={item} handleChange={handleChange}></BookManagementItem>
                                  }}></List> : null
                }
            </div>
        </div>
    )
}