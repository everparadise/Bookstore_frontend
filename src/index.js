import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./util/store"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/login";
import {LoginContainer} from "./components/login/loginContainer";
import {RegisterContainer} from "./components/login/registerContainer";
import {PasswordFinder} from "./components/login/passwrodFinder";

import {NotFound} from "./page/notFound";
import {ProtectedRouter} from "./components/ProtectedRouter";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}>
                        <Route index element={<LoginContainer/>}/>
                        <Route path="register" element={<RegisterContainer/>}/>
                        <Route path="findPwd" element={<PasswordFinder/>}/>
                    </Route>
                    <Route path="/*" element={<ProtectedRouter/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
