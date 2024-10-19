import {base} from "../service/PrivateFetch";

export function websocketFactory(endpoint, onMessage, onOpen, onClose, onError){
    const ws = new WebSocket(`${base}${endpoint}`);
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onerror = onError;
    ws.onmessage = onMessage;
    return ws;
}