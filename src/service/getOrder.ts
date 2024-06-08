import {PrivateFetch} from "./PrivateFetch";

//返回的是pages，需要解析page数据
export async function getOrder(page: number, value: string, startTimeArg: string | null = null, endTimeArg: string | null = null) {
    const requestBody = {
        page: page - 1,
        name: value,
        startTime: startTimeArg,
        endTime: endTimeArg
    }

    return await PrivateFetch("order/orders", "POST", null, requestBody);

}