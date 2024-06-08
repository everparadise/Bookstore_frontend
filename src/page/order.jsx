import {Button, DatePicker, List, Modal, Pagination} from "antd";
import {OrderHeader, OrderItem} from "../components/order/orderList";
import {PrivateEmpty} from "../components/404page/privateEmpty";
import "../css/cart.css"
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {getOrder} from "../service/getOrder";
import {PAGE_SIZE} from "../constant/constant";

export function OrderPage() {

    const [data, setData] = useState(null);
    const [value, setValue] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [tmpStartDate, setTmpStartDate] = useState("");
    const [tmpEndDate, setTmpEndDate] = useState("");

    async function getOrderData() {
        const pages = await getOrder(page, value, startDate, endDate);
        setData(pages.content);
        setTotalElements(pages.totalElements)
    }

    function searchOrder(value) {
        setValue(value);
    }

    function showModal() {
        setModalShow(true);
    }

    function handleCancel() {
        setModalShow(false);
        setTmpStartDate(startDate);
        setTmpEndDate(endDate);
    }

    function handleSubmit() {
        setModalShow(false);
        setPage(1);
        setStartDate(tmpStartDate);
        setEndDate(tmpEndDate);
    }

    function changeDate(dates, dateStrings) {
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

    useEffect(() => {
        getOrderData();
    }, [value, startDate, endDate])
    return (
        <>
            <div className="cartItem">
                <div className="orderFilter">
                    <Search style={{
                        margin: "24px",
                        lineHeight: "1.2",
                    }} size="large" onSearch={searchOrder} placeholder="请输入图书名称"></Search>
                    <Button className="filter-button" onClick={showModal}>筛选</Button>
                </div>

                {data ? <List dataSource={data}
                              renderItem={(dataInfo) => <OrderItem item={dataInfo}></OrderItem>}
                              renderEmpty={{emptyText: <PrivateEmpty/>}}
                              header={<OrderHeader/>}
                ></List> : null}
                <Pagination current={page} total={totalElements} pageSize={PAGE_SIZE} style={{
                    marginTop: "12px",
                    textAlign: "center",
                }} onChange={(value) => {
                    setPage(value)
                }}/>
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
        </>

    )
}