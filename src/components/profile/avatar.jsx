import "../../css/profilePage.css"
import {message} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import {uploadFile} from "../../service/uploadFile";

export function Avatar({user}) {
    const inputRef = useRef(null);
    const [select, setSelect] = useState(false);
    const [pic, setPic] = useState(null);
    const [url, setUrl] = useState(user.avatar);

    function handleSelect() {
        inputRef.current.click();
    }

    function handleCancel() {
        setSelect(false);
        setPic(null);
        setUrl(user.avatar);
        inputRef.current.value = null;
    }

    function handleInput(event) {
        if (event.target.files == null) return;
        setSelect(true);
        const file = event.target.files[0];
        setPic(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setUrl(reader.result);

        };
        reader.readAsDataURL(file);
    }

    async function handleUpload() {
        if (!select) {
            message.error("未选择图像")
            return;
        }

        await uploadFile(pic, setUrl, url);

        setSelect(false);
        setPic(null);
        inputRef.current.value = null;
    }

    return (
        <div className="profile-avatar">
            <img className="avatar-img" src={url}/>
            <div>
                <input type="file" className="fileInput" ref={inputRef} onChange={handleInput}
                       accept={["image/png", "image/jpeg"]}/>
                {select ?
                    <span className="avatar-upload" onClick={handleCancel} style={{
                        "cursor": "pointer"
                    }}>
                        <FontAwesomeIcon icon={faXmark}/>
                        <button className="upload-button">Cancel</button>
                    </span> :

                    <span className="avatar-upload" onClick={handleSelect} style={{
                        "cursor": "pointer"
                    }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        <button className="upload-button">click to select</button>
                    </span>
                }

                {
                    select &&
                    <span className="avatar-upload" onClick={handleUpload} style={{
                        "cursor": "pointer"
                    }}>
                        <FontAwesomeIcon icon={faCloudArrowUp}/>
                        <button className="upload-button">Upload!</button>
                    </span>
                }
            </div>

        </div>

    )
}