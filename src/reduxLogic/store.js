import {createSlice, configureStore} from "@reduxjs/toolkit"
import {putData} from "../service/putAPI";

const init = {
    user: null,
    isAuthenticated: false
}
export function loginUser(user){
    return {
        type: "LOGIN",
        payload: user
    }
}
export function modifyUserInfo(user){
    putData("user/userInfo", user);
    return{
        type: "MODIFY",
        payload: user
    }
}
export function logoutUser(){
    return {
        type: "LOGOUT"
    }
}

export function rootReducer(state, action){
    switch(action.type){
        case "LOGIN":
            return {
                isAuthenticated: true,
                user: action.payload
            }
        case "LOGOUT":
            return {
                isAuthenticated: false,
                user: null
            }
        default: return state;
    }
}
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: init
})

