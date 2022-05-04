import {UserInfo} from "../models/userinfo.interface";
import {BehaviorSubject} from "rxjs";
import { configureStore } from "@reduxjs/toolkit";
import {userInfoSlice} from "./reducers/userinfo.reducer";

export const CoreStore = {
    userInfo$: new BehaviorSubject<UserInfo | null>(null),
}

export const reduxStore = configureStore({
    reducer: {
        userInfo: userInfoSlice.reducer,
    },
})