import "../../css/profilePage.css"
import {Upload} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

export function Avatar({user}) {
    return (
        <div className="profile-avatar">
            <img className="avatar-img" src={user.avatar}/>
            <Upload className="avatar-upload">
                <FontAwesomeIcon icon={faCloudArrowUp}/>
                <button className="upload-button">click to upload</button>
            </Upload>
        </div>

    )
}