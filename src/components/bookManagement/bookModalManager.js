import {InputNumber, Modal} from "antd";
import {useRef, useState} from "react";
import {uploadFile} from "../../service/uploadFile";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

export function BookModalManager({openState, book, newBook, submitCallBack, handleSubmit}) {
    const [name, setName] = useState(book ? book.name : "");
    const [author, setAuthor] = useState(book ? book.author : "");

    const [pic, setPic] = useState(book ? book.pic : "");

    const [isbn, setIsbn] = useState(book ? book.isbn : "");
    const [stock, setStock] = useState(book ? book.stock : "");
    const [price, setPrice] = useState(book ? book.price : 0);
    const [comment, setComment] = useState(book ? book.comment : "");

    async function onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const result = await handleSubmit({
            "bid": newBook ? null : book.bid,
            "pic": pic,
            "name": name,
            "price": price,
            "sales": newBook ? null : book.sales,
            "author": author,
            "isbn": isbn,
            "stock": stock,
            "comment": comment
        })

        console.log("result", result);
        if (result) {
            //setBook(result);
            submitCallBack("success")
            openState.setOpen(false);
            //message.success("修改成功");
        } else {
            submitCallBack("failure")
            //message.error("修改失败")
        }

    }


    function handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();

        openState.setOpen(false);
    }

    async function handleUpload(event) {
        event.stopPropagation();
        if (!event.target.files) {
            return;
        }
        await uploadFile(event.target.files[0], setPic, pic);
        event.target.value = null;
    }

    return (
        <Modal centered={true} closable={false} title={"修改图书信息"} open={openState.open} footer={null}>
            <form className="purchaseForm">
                <ModalText value={name} title={"图书名称"} placeHolder={"请输入图书名称"} setValue={setName}/>
                <ModalText value={author} title={"作者"} placeHolder={"请输入作者"} setValue={setAuthor}/>

                <p className="modalTitle">封面</p>
                <img src={pic} className="modalPic" alt={pic}/>
                <InputAndButton handleUpload={handleUpload}/>

                <ModalText value={isbn} title={"ISBN"} placeHolder={"请输入ISBN"} setValue={setIsbn}/>
                <ModalText value={stock} title={"图书余量"} placeHolder={"请输入余量"} setValue={setStock}/>

                <>
                    <p className="modalTitle">{"请输入图书价格"}</p>
                    <InputNumber style={{
                        height: '35px',
                        margin: 'auto 0'
                    }} min={1} max={100000} defaultValue={price} onChange={(value) => {
                        setPrice(value);
                    }}/>
                </>

                <>
                    <p className="modalTitle">{"请输入图书简介"}</p>
                    <textarea value={comment} className="slogan-text" onChange={(modify) => setComment(modify.target.value)}/>
                </>

                <ModalButtons handleCancel={handleCancel} handleSubmit={onSubmit}/>
            </form>
        </Modal>
    )
}

export function ModalText({title, placeHolder, value, setValue}) {
    return (
        <>
            <p className="modalTitle">{title}</p>
            <input className="input-modal" onChange={e => setValue(e.target.value)}
                   placeholder={placeHolder} value={value}/>
        </>
    )
}

export function ModalButtons({handleSubmit, handleCancel}) {
    return (
        <div className="modalGrid">
            <button className="submit" onClick={handleSubmit}>更改</button>
            <button className="cancel" onClick={handleCancel}>取消</button>
        </div>
    )
}

export function InputAndButton({handleUpload}) {
    const inputRef = useRef(null);

    function handleSelect() {
        inputRef.current.click();
    }

    return (
        <>
            <input onChange={handleUpload} className="fileInput" ref={inputRef} type="file"
                   accept={["image/png", "image/jpeg"]}/>
            <span className="avatar-upload" onClick={handleSelect} style={{
                "cursor": "pointer"
            }}>
                        <FontAwesomeIcon icon={faCloudArrowUp}/>
                        <button className="upload-button">Upload</button>
                </span>
        </>
    )

}