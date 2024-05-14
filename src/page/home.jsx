import {Carousel} from "../components/homepage/carousel"
import BookListContainer from "../components/homepage/bookCards";
import "../css/layout.css"
export default function HomePage(){
    return(
            <div className = "home">
                <Carousel></Carousel>
                <BookListContainer></BookListContainer>
            </div>
    )

}