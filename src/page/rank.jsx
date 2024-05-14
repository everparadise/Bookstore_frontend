import {GridLayout} from "../components/layout/layout";
import Sidebar from "../components/layout/sidebar";
import { Column } from '@ant-design/plots';
import "../css/cart.css"
import {Select} from "antd";

import {useFetch} from "../service/useFetch";
export function RankingPage(){
    //fetch sortedData() to rankingData
    const rankingData = useFetch("book/ranking");
    const options = [
        {value: "salesPolygon", label: "销量柱形图"},

    ]
    return(

            <div className = "cartItem marginTop">
                <Select width = "200" defaultValue = "salesPolygon" options = {options}></Select>
                {rankingData && <RankingGraph rankingData = {rankingData}></RankingGraph>}
            </div>

    )
}

export function RankingGraph({rankingData}){
    const data = rankingData.map((item) => {
        return {sales: item.sales, name: item.name}
    })
    const config = {
        data,
        xField: 'name',
        yField: 'sales',
        height: 600,
    };
    return <Column {...config} />;
};
