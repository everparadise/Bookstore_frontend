import {useEffect, useRef, useState} from "react"

import "../../css/carousel.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {carouselData} from "../../service/datas.ts";

export function Carousel() {
    const [active, setActive] = useState(1);
    const maxIndex = carouselData.length;
    let nextActive = active;
    const carouselRef = useRef();
    const pics = carouselData.map((item, index) => {
        return (
            <div className="carouselPics" key={index} style={{
                backgroundImage: `url(${item.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundPosition: "center"
            }}
            />)
    })
    const indexList = carouselData.map((item, index) => {
        return (
            <span className={`dot ${index === active - 1 ? 'dotactive' : ''}`} key={index}></span>
        )
    })
    useEffect(() => {
        const id = setInterval(() => {
            handleRight();
        }, 4000);
        //let ScrollTop = carouselRef.scrollTop;
        //carouselRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        //carouselRef.scrollTop = ScrollTop;
        carouselRef.current.scrollLeft = active * 530;
        return () => {
            clearTimeout(id);
        }

    }, [active])

    function handleLeft() {
        if (active == 1) {
            nextActive = maxIndex;
            setActive(maxIndex);
        } else {
            nextActive = active - 1;
            setActive(active - 1);
        }

    }

    function handleRight() {
        if (active == maxIndex) {
            nextActive = 1;
            setActive(1);

        } else {
            nextActive = active + 1;
            setActive(active + 1);
        }
    }

    return (
        <div className="carouselContainer">
            <button className="carouselButton buttonLeft" onClick={handleLeft}><FontAwesomeIcon icon={faAngleLeft}/>
            </button>
            <button className="carouselButton buttonRight" onClick={handleRight}><FontAwesomeIcon icon={faAngleRight}/>
            </button>
            <div className="carouselPicContainer" ref={carouselRef}>
                <div className="empty-placeholder"/>
                {pics}
                <div className="empty-placeholder"/>
            </div>
            <div className="dotsContainer">
                {indexList}
            </div>
        </div>
    )
}
