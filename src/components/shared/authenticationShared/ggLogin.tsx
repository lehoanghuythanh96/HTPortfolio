import React from "react";
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import {apiUrl} from "../../../environments/environments";
import {toggleSnackbar} from "../../UI_Components/UI_Snackbar";
import {loginSuccess} from "./logincard";
import {setUserInfo} from "../../../store/reducers/userinfo.reducer";
import { useDispatch } from "react-redux";

export const GgLoginBtn = () => {

    let dispatcher = useDispatch()

    const responseGoogle = (response: any) => {
        if (response && response.accessToken) {

            let loginInfo = {"token": response.accessToken}

            axios.post(`${apiUrl}/auth/google/tokenid/verify/`, loginInfo,
                {
                    withCredentials: true // allow server to set httponly cookie
                })
                .then(async res => {
                    let success = await loginSuccess(res)
                    if (success) {
                        dispatcher(setUserInfo(success))
                    }
                }).catch((error) => {})
        } else {
            toggleSnackbar.next("Can not get GG access token, sign in by GG failed.")
        }
    }

    return (
        <GoogleLogin
            clientId="230100438513-6dgma9i07f03fmo737oeuk07v49dt9qr.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}