import {Route, Routes, BrowserRouter} from "react-router-dom"
import Login from "../page/login"
import HomePage from "../page/home";
import {RegisterContainer} from "./login/registerContainer";
import {LoginContainer} from "./login/loginContainer";
import {BookPage} from "../page/bookPage";
import {NotFound} from "../page/notFound";
import {PasswordFinder} from "./login/passwrodFinder";
import Cart from "../page/cart";
import {OrderPage} from "../page/order";
import {RankingPage} from "../page/rank";
import {MainPage} from "../page/mainPage";
import {ProfilePage} from "../page/profile";


export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Login />} >
                    <Route index element = {<LoginContainer/>} />
                    <Route path = "register" element = {<RegisterContainer />} />
                    <Route path = "findPwd" element = {<PasswordFinder/>} />
                </Route>
                <Route path = "/" element = {<MainPage/>}>
                    <Route path = "home" element = {<HomePage />} />
                    <Route path = "book/:id" element = {<BookPage/>}/>
                    <Route path = "cart" element = {<Cart/>}/>
                    <Route path = "order" element = {<OrderPage/>}/>
                    <Route path = "rank" element = {<RankingPage/>} />
                    <Route path = "profile" element = {<ProfilePage/>}/>
                </Route>
                <Route path = "*" element = {<NotFound/>}/>

            </Routes>
        </BrowserRouter>
    )
}