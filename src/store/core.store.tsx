import {UserInfo} from "../models/userinfo.interface";
import {BehaviorSubject} from "rxjs";
import {AdminPanel} from "./models/adminpanel.interface.ts";

export const CoreStore = {
    userInfo$: new BehaviorSubject<UserInfo | null>(null),
}