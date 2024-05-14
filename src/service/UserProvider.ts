import {store} from "../reduxLogic/store";

export function getUserData(){
    return store.getState().user;
}