import {UserInfo} from "../../models/userinfo.interface";

export interface AppState {
    userInfo: {
        data: UserInfo | null
    }
}