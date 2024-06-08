import {BackgroundFlexLayout} from "../../components/layout/layout";
import "../../css/notFound.css"
import {Link} from "react-router-dom";

export function BannedPage() {
    return (
        <BackgroundFlexLayout>
            <div className="loginContainer">
                <div className="detail">该账号已被禁用！</div>
                <Link className="backToMain" to="/">返回</Link>
            </div>
        </BackgroundFlexLayout>
    )
}