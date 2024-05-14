import {BackgroundFlexLayout} from "../components/layout/layout"
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Login(){
    return(
            <BackgroundFlexLayout>
                <Outlet />
            </BackgroundFlexLayout>
    );
}

