import Footer from "./footer"
import Navbar from "./header"
import {useEffect, useState} from "react"
import "../../css/layout.css"

export function BackgroundFlexLayout({children}){
    const [background, setBackground] = useState(1);
    async function timelySet(){
        setBackground(background);
    }
    return(
        <>

            <div className = "flexLayout" style = {{
                    backgroundImage: `url(/src/background/background${background}.jpg)`,
                    boxSizing: "border-box",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "fixed",
                }}>
                <Content>
                    {children}
                </Content>
                <Footer></Footer>
            </div>
        </>
    )
}
export function PrivateLayout({children}){
    return(
        <div className = "privateLayout">
            <Navbar user = {{remainMoney: 0}}></Navbar>
            <div className = "w-full">
                {children}
            </div>
            <Footer></Footer>
        </div>
    )

}
export function GridLayout({children}){
    const [background, setBackground] = useState(1);
    async function timelySet(){
        setBackground(background);
    }
    return(
        <>
            <Navbar user = {{remainMoney: 0}}></Navbar>

                <GridContent>
                    {children}
                </GridContent>

            <Footer></Footer>
        </>


    )
}

export function GridContent({children}){
    return(
        <div className = "gridcontent">{children}</div>
    )
}
export function Content({children}){
    return(
        <div className = "content">{children}</div>
    )
}