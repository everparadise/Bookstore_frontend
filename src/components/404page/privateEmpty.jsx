import {Button, Empty} from "antd";
import {useNavigate} from "react-router-dom";
import "../../css/cart.css"
export function PrivateEmpty(){
    const navigate = useNavigate();
    return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
            <Button onClick = {()=>{
                navigate("/home")
            }} className = "backToMainInCart">回到首页</Button>
        </Empty>
    )
}