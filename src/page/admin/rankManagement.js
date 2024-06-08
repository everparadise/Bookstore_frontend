import {Column} from '@ant-design/plots';
import "../../css/cart.css"
import {Button, DatePicker, Modal, Select} from "antd";

import {useFetch} from "../../service/useFetch";
import {useEffect, useState} from "react";
import {PrivateFetch} from "../../service/PrivateFetch";
import {RANKING_NUMBER} from "../../constant/constant";
import {DateRangeModal} from "../order";

export function RankingManagement() {
    //fetch sortedData() to rankingData
    const [rankingData, setRankingData] = useState(null);
    const [tmpStartDate, setTmpStartDate] = useState("");
    const [tmpEndDate, setTmpEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [mode, setMode] = useState("book");
    const [modalShow, setModalShow] = useState(false);
    const options = [
        {value: "book", label: "销量柱形图"},
        {value: "user", label: "用户消费图"}
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

    function changeMode(value){
        setMode(value)
    }

    async function getRanking(){
        const body = {
            "number": RANKING_NUMBER,
            "startDateTime": startDate,
            "endDateTime": endDate
        }
        const result = await PrivateFetch(`ranking/${mode}`, "POST", null, body);
        console.log("result",result);
        if(mode === "book"){
            const data = result.map((item)=>{
                return{
                    "name": item.name,
                    "sales": item.sales,
                }
            });
            console.log("parseData", data);
            setRankingData(data);
        }
        else if(mode === "user"){
            const data = result.map((item)=>{
                return{
                    "username": item.username,
                    "consuming": item.consuming
                }
            });
            console.log("parseData", data);
            setRankingData(data);
        }
    }

    useEffect(()=>{
        getRanking();
    },[mode,startDate, endDate]);

    return (

        <div className="cartItem marginTop">
            <div>
                <Select width="200" defaultValue="book" options={options} onChange = {changeMode}/>
                <Button className="filter-button" onClick={()=>setModalShow(true)}>筛选</Button>
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
            {rankingData && <RankingGraph data = {rankingData} xField={mode === "book" ? "name" : "username"} yField={mode === "book" ? "sales" : "consuming"}></RankingGraph>}
        </div>

    )
}

export function RankingGraph({data, xField, yField}) {
    console.log("data",data);
    const config = {
        data,
        xField: `${xField}`,
        yField: `${yField}`,
        height: 600,
    };
    return <Column {...config} />;
};
