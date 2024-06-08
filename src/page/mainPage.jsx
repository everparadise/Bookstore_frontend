import {GridLayout} from "../components/layout/layout";
import Sidebar from "../components/layout/sidebar";
import {Outlet} from "react-router-dom";

export function MainPage() {
    //const navigate = useNavigate();
    // useEffect(() => {
    //     const user = store.getState();
    //     if (!user.isAuthenticated) {
    //         navigate("/");
    //     }
    // }, [])


    return (
        <GridLayout>
            <Sidebar></Sidebar>
            <Outlet/>
        </GridLayout>
    )
}