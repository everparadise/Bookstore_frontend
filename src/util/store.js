import {configureStore} from "@reduxjs/toolkit"

//authority
// 1. UNLOGIN
// 2. USER
// 3. ADMIN
// 4. BANNED
const init = {
    isAuthenticated: false,
    token: null,
    authority: "UNLOGIN",
    avatar: ""
}

export function loginUser(token, authority) {
    return {
        type: "LOGIN",
        payload: {
            token: token,
            authority: authority
        }
    }
}

export function logoutUser() {
    return {
        type: "LOGOUT"
    }
}

export function modifyUserAvatar(url) {
    return {
        type: "AVATAR",
        payload: url
    }
}

export function rootReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                isAuthenticated: true,
                token: action.payload.token,
                authority: action.payload.authority
            }
        case "LOGOUT":
            return {
                isAuthenticated: false,
                token: null,
                authority: "UNLOGIN"
            }
        case "AVATAR":
            const newState = state;
            newState.avatar = action.payload;
            return newState;
        default:
            return state;
    }
}

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: init
})

