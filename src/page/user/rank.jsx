import {Column} from '@ant-design/plots';
import "../../css/cart.css"
import {Button, DatePicker, List, Modal, Pagination, Select} from "antd";

import {useFetch} from "../../service/useFetch";
import {useEffect, useMemo, useState} from "react";
import {PAGE_SIZE} from "../../constant/constant";
import {PrivateFetch} from "../../service/PrivateFetch";
import {Detail, OrderHeader, OrderItem} from "../../components/order/orderList";
import {PrivateEmpty} from "../../components/404page/privateEmpty";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import "../../css/rankPage.css"

export function RankingPage() {
    //fetch sortedData() to rankingData
    const [rankingData, setRankingData] = useState(null);
    const [tmpStartDate, setTmpStartDate] = useState("");
    const [tmpEndDate, setTmpEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const options = [
        {value: "salesPolygon", label: "历史订单统计"},
    ]

    function changeDate(dates, dateStrings){
        if (dates === null) {
            setTmpStartDate(dateStrings[0]);
            setTmpEndDate(dateStrings[1]);
            return;
        }

        if (dates[0] !== null) {
            setTmpStartDate(dates[0].toISOString());
            console.log("timeStamp format", dates[0].toISOString())
        } else setTmpStartDate("");

        if (dates[1] !== null) {
            setTmpEndDate(dates[1].toISOString());
        } else setTmpEndDate("");
    }

    function handleSubmit(){
        setModalShow(false);
        setStartDate(tmpStartDate);
        setEndDate(tmpEndDate);
    }

    function handleCancel(){
        setModalShow(false);
        setTmpStartDate("");
        setTmpEndDate("");
    }

    async function getRanking(){
        const result = await PrivateFetch("ranking/book", "POST", null, {
            "startDateTime": startDate,
            "endDateTime": endDate
        })
        setRankingData(result);
    }

    useEffect(() => {
        getRanking();
    }, [startDate, endDate]);

    return (

        <div className="cartItem marginTop">
            <div className = "rankingFilter">
                <Select width="200" defaultValue="salesPolygon" options={options} style = {{
                    height: "40px"
                }}></Select>
                <Button className="filter-button marginLeft" onClick={()=>setModalShow(true)}>筛选</Button>
            </div>
            <Modal centered={true} title={"请选择时间段"} open={modalShow} footer={null} closable={false}>
                <DatePicker.RangePicker size="large" style={{
                    margin: "24px",
                    lineHeight: "1.2",
                }} showTime onChange={changeDate}/>
                <div className="modalGrid">
                    <button className="submit" onClick={handleSubmit}>确定</button>
                    <button className="cancel" onClick={handleCancel}>取消</button>
                </div>
            </Modal>
            {rankingData && <RankingOrder rankingData={rankingData}></RankingOrder>}
        </div>

    )
}

function RankingOrder({rankingData}){
    const [page, setPage] = useState(0);
    const [totalConsuming, setTotalConsuming] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [showData, setShowData] = useState(rankingData.slice( 0 , PAGE_SIZE));
    useEffect(()=>{
        rankingData.forEach((item)=>{
            setTotalConsuming((totalConsuming)=>{
                return totalConsuming + item.price * item.sales;
            })
            setTotalSales((totalSales) => {
                return totalSales + item.sales;
            })
        })
    },[rankingData])
    return(
        <>
            <p className = "listHeader">{`统计: 选定时间内，总共购买了 ${totalSales} 本书，累计花费 ${totalConsuming /100} 元`}</p>
            <List dataSource={showData}
                          renderItem={(dataItem) => <BookRankingItem item={dataItem}></BookRankingItem>}
                          renderEmpty={{emptyText: <PrivateEmpty/>}}
                          header={<BookRankingHeader/>}
            ></List>
            <Pagination current={page} total={rankingData.length} pageSize={PAGE_SIZE} style={{
                marginTop: "12px",
                textAlign: "center",
            }} onChange={(value) => {
                setPage(value);
                setShowData(rankingData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE));
            }}/>
        </>
    )
}

function BookRankingItem({item}){
    const [detail, setDetail] = useState(false);

    function handleDetail() {
        setDetail(!detail);
    }

    return (
        <>
            <div className="BookItemGrid">
                <button className="detailSpan" onClick={handleDetail}><FontAwesomeIcon icon={faPlus}/></button>
                <p className="orderItemFont">{item.name}</p>
                <p className="orderItemFont">{item.sales}</p>
                <p className="orderItemFont">{item.price / 100}</p>
                <p className="orderItemFont">{item.price * item.sales / 100}</p>
            </div>
            {detail ? <Detail item={item}></Detail> : null}
        </>

    )
}

function BookRankingHeader(){
    return (
        <div className="BookHeaderGrid">
            <p></p>
            <p className="listHeader">书名</p>
            <p className="listHeader">本数</p>
            <p className="listHeader">单价</p>
            <p className="listHeader">总计</p>
        </div>
    )
}