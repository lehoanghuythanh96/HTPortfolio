import {apiUrl, fileUploadApi} from "./environments";
import {toggleSnackbar} from "../components/UI_Components/UI_Snackbar";
import {CoreStore} from "../store/core.store";

const axios = require("axios");

export const apiPostData = async (urlsuffix, data) => {

    return await axios.post(`${apiUrl}/${urlsuffix}`, data, {
        timeout: 5000,
        withCredentials: true
    })

}

export const apiPostFile = async (urlsuffix, data) => {

    return await axios.post(`${fileUploadApi}/${urlsuffix}`, data, {
        timeout: 10000,
        withCredentials: true
    })

}

axios.interceptors.response.use(
    (res) => {
        if (res.data) {
            if (res.data.message) {
                toggleSnackbar.next(res.data.message)
            }
        }
        return res
    }, async (error) => {
        if (error.config && error.response) {
            if (error.response.status === 401) {
                let refresher = await refreshToken()
                if (refresher.status === 200) {
                    let newToken = refresher.data.access_token
                    let newBearer = `Bearer ${newToken}`
                    let resCheck = await verifyToken(newToken)
                    if (resCheck.status === 200) {
                        error.config.headers.Authorization = newBearer
                        return axios.request(error.config);
                    } else {
                        return Promise.reject(resCheck.data);
                    }
                }
                if (refresher.status === 401) {
                    return Promise.reject(refresher);
                }
            }
            console.log(error.response)
            if (error.response.data && error.response.data.message) {
                let msg = error.response.data.message
                toggleSnackbar.next(msg)
            }
            return Promise.reject(error.response);
        } else {
            console.log(error)
            return Promise.reject(error);
        }
    });

export const verifyToken = async (newToken) => {
    const checker = axios.create({
        baseURL: apiUrl,
        timeout: 5000,
        withCredentials: true
    })
    let resCheck = await checker.post(`auth/token/verify/`,{token: newToken})
        .then(res => res).catch(error => error.response)
    if(resCheck.status === 200) {
        CoreStore.userInfo$.next(resCheck.data)
    }
    if(resCheck.status === 401) {
        console.log(resCheck.data)
        CoreStore.userInfo$.next(null)
    }
    return resCheck
}

export const refreshToken = async () => {

    const getRefresher = axios.create({
        baseURL: apiUrl,
        timeout: 5000,
        withCredentials: true
    })

    return await getRefresher.post(`auth/token/refresh/`, {}, {
        withCredentials: true
    }).then(
        (res) => {
            if(res.data && res.data.access_token) {
                let newToken = res.data.access_token
                let newBearer = `Bearer ${newToken}`
                axios.defaults.headers.common['Authorization'] = newBearer;
            }
            return res
        }
    ).catch(
        (error) => {
            if (error.response) {
                console.log(error.response)
                let msg = "Your log in session is expired, please log in again"
                toggleSnackbar.next(msg)
                return error.response
            } else {
                console.log(error)
                return error
            }
            return error
        }
    )
}