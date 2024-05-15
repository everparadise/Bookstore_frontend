import {BackgroundFlexLayout} from "../components/layout/layout"
import {Outlet} from "react-router-dom";

export default function Login() {
    return (
        <BackgroundFlexLayout>
            <Outlet/>
        </BackgroundFlexLayout>
    );
}

