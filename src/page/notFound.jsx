import {BackgroundFlexLayout} from "../components/layout/layout";
import "../css/notFound.css"
import {Link, useLocation} from "react-router-dom";
export function NotFound(){
    const location = useLocation();
    return(
        <BackgroundFlexLayout>
            <div className = "loginContainer">
                <p className = "detail">{location.pathname}页面还未完成...前面的区域以后再来探索吧！</p>
                <Link className = "backToMain" to="/home">回到主界面</Link>
            </div>
        </BackgroundFlexLayout>
    )
}