import {store} from "../util/store";

export function getUserData() {
    return store.getState().user;
}