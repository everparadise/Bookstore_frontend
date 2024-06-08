import {useState} from "react";
import {BookModalManager} from "./bookModalManager";
import {message} from "antd";
import {PrivateFetch} from "../../service/PrivateFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {BookListDetail} from "../cart/cart";
import "../../css/bookManagement.css"

export function BookManagementItem({item,  handleChange}) {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(false);

    async function handleSubmit(book){
        const result = await PrivateFetch("book", "PUT", null, {
            "bid": book.bid,
            "pic": book.pic,
            "name": book.name,
            "price": book.price,
            "sales": book.sales,
            "author": book.author,
            "isbn": book.isbn,
            "stock": book.stock,
            "comment": book.comment
        })
        return result;
    }

    async function handleDelete(){
        try{
            await PrivateFetch(`book/${item.bid}`, "DELETE");
            message.success("删除成功");
            handleChange();
        }catch(e){
            message.error("删除失败")
        }
    }

    function submitCallBack(info){
        if(info === "success"){
            message.success("修改成功")
            handleChange();
        }
        else if(info === "failure"){
            message.error("修改失败，请重试")
        }
    }
    return (
        <div>
            <div className="bookListItem">
                <button className="detailSpan" onClick={() => setDetail(!detail)}><FontAwesomeIcon icon={faPlus}/></button>
                <span className="listInfo">{item.name}</span>
                <span className="listInfo">{item.author}</span>
                <span className="listInfo">{item.isbn}</span>
                <span className="listInfo">{item.price}</span>
                <button onClick={() => setOpen(true)} className = "deleteButton detailButton">修改</button>
                <button onClick={handleDelete} className = "deleteButton">删除</button>
            </div>
            {detail && <BookListDetail item={item}/>}
            {open && <BookModalManager book={item} newBook={false} openState={{open, setOpen}} submitCallBack={submitCallBack} handleSubmit={handleSubmit}></BookModalManager>}
        </div>

    )
}

export function BookManagementHeader({totalElements, setTotalElements, handleChange}) {

    const [open, setOpen] = useState(false);

    function submitCallBack(info) {
        if (info === "success") {
            setTotalElements(totalElements + 1);
            message.success("添加成功");
            handleChange();
        } else if (info === "failure") {
            message.error("添加失败，请重试")
        }
    }

    async function handleSubmit(book) {
        return await PrivateFetch("book", "POST", null, {
            "pic": book.pic,
            "name": book.name,
            "price": book.price,
            "sales": book.sales,
            "author": book.author,
            "isbn": book.isbn,
            "stock": book.stock,
            "comment": book.comment
        });
    }

    return (
        <>
            <div className="bookList">
                <span/>
                <span className="listHeader">书名</span>
                <span className="listHeader">作者</span>
                <span className="listHeader">ISBN</span>
                <span className="listHeader">价格</span>
                <button className="deleteButton detailButton" onClick={() => setOpen(true)}>添加</button>
                <span/>
            </div>
            {open &&
                <BookModalManager newBook={true} openState={{open, setOpen}} submitCallBack={submitCallBack}
                                  handleUpload={handleSubmit} handleSubmit={handleSubmit}>

                </BookModalManager>}
        </>

    )
}