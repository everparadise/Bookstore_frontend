import {GridLayout} from "../components/layout/layout";
import Sidebar from "../components/layout/sidebar";
import {Outlet, useNavigate} from "react-router-dom";
import {store} from "../reduxLogic/store";
import {useEffect} from "react";

export function MainPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const user = store.getState();
        if (!user.isAuthenticated) {
            navigate("/");
        }
    }, [])


    return (
        <GridLayout>
            <Sidebar></Sidebar>
            <Outlet/>
        </GridLayout>
    )
}