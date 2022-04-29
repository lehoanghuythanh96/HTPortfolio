import {UserInfo} from "../models/userinfo.interface";
import {BehaviorSubject} from "rxjs";

export const CoreStore = {
    userInfo$: new BehaviorSubject<UserInfo | null>(null)
}