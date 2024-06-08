import {store} from "../util/store";
import {MainPage} from "../page/mainPage";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../page/user/home";
import {BookPage} from "../page/user/bookPage";
import Cart from "../page/cart";
import {OrderPage} from "../page/order";
import {RankingPage} from "../page/user/rank";
import {ProfilePage} from "../page/user/profile";
import {BannedPage} from "../page/banned/bannedPage";
import {BookManagement} from "../page/admin/bookManagement";
import {UserManagement} from "../page/admin/userManagement";
import {RankingManagement} from "../page/admin/rankManagement";

export function ProtectedRouter() {
    switch (store.getState().authority) {
        case "USER":
            return (
                <Routes>
                    <Route path="/" element={<MainPage/>}>
                        <Route path="home" element={<HomePage/>}/>
                        <Route path="book/:id" element={<BookPage/>}/>
                        <Route path="cart" element={<Cart/>}/>
                        <Route path="order" element={<OrderPage/>}/>
                        <Route path="rank" element={<RankingPage/>}/>
                        <Route path="profile" element={<ProfilePage/>}/>
                    </Route>
                </Routes>
            )
        case "ADMIN":
            return (
                <Routes>
                    <Route path="/" element={<MainPage/>}>
                        <Route path="home" element={<BookManagement/>}/>
                        <Route path="order" element={<OrderPage/>}/>
                        <Route path="rankManage" element={<RankingManagement/>}/>
                        <Route path="userManage" element={<UserManagement/>}/>
                    </Route>
                </Routes>
            )
        case "BANNED":
            return (
                <Routes>
                    <Route path="/home" element={<BannedPage/>}/>
                </Routes>
            )
        default:
            return (
                <Routes>
                    <Route path="/*" element={<Navigate to={"/"}/>}/>
                </Routes>
            )
    }
}