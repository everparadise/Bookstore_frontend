import {useState} from "react";
import {PrivateFetch} from "../../service/PrivateFetch";

export function SelfInfo({user}) {
    const [name, setName] = useState(user ? user.username : "chiikawa")
    const [notes, setNotes] = useState(user ? user.slogan : "这是chiikawa的SE sophomore web书城项目web-bookStore,使用技术栈为前端react,后端Java spring数据库mangoDB nosql等");
    const [modify, setModify] = useState(false);

    async function handleSave() {

        user.username = name;
        user.slogan = notes;
        try {
            await userModify("user", user);
        } catch (error) {

        }

        setModify(false);
    }

    async function userModify(endpoint, userInfo) {
        try {
            await PrivateFetch(endpoint, "PUT", null, userInfo);
        } catch (e) {
            user = PrivateFetch(`user`, "GET");
            setName(user.username);
            setNotes(user.slogan);
        }
    }

    function handleCancel() {
        setName(user ? user.username : "chiikawa");
        setNotes(user ? user.slogan : "这是chiikawa的SE sophomore web书城项目web-bookStore,使用技术栈为前端react,后端Java spring等")
        setModify(false);
    }

    function handleModify() {
        setModify(true);
    }

    const saveButton = (
        <div className="info-button">
            <button className="info-save" onClick={handleSave}>save</button>
            <button className="info-cancel" onClick={handleCancel}>cancel</button>
        </div>
    )
    const modifyButton = (
        <div className="info-button">
            <button className="info-modify" onClick={handleModify}>modify</button>
        </div>
    )
    return (
        <div className="selfInfo-card">
            <span className="info-name">
                <p className="info-title">Name:</p>
                <input className="info-content" disabled={!modify} value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </span>
            <span className="info-money">
                <p className="info-title">pocket:</p>
                <p className="info-content info-moneyNum">{user.remainMoney / 100}</p>
            </span>
            <div className="info-slogan">
                <p className="info-title">Notes:</p>
                <textarea className="slogan-text" disabled={!modify} value={notes} onChange={(e) => {
                    setNotes(e.target.value)
                }} placeholder="请输入个人签名"/>
            </div>
            {modify ? saveButton : modifyButton}
        </div>
    )
}