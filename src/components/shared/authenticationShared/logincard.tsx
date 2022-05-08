import React from "react";
import {ClayCard} from "../../UI_Components/ClayCard";
import styled from "@emotion/styled";
import {UI_Input} from "../../UI_Components/UI_Input";
import {Col, Row} from "react-bootstrap";
import {BasicButton} from "../../UI_Components/Buttons";
import axios from 'axios';
import {apiUrl, globalSettings} from "../../../environments/environments";
import {toggleSnackbar} from "../../UI_Components/UI_Snackbar";
import {toggleDialog} from "../../UI_Components/UI_Dialog";
import {GgLoginBtn} from "./ggLogin";
import {Divider, Typography} from "@mui/material";
import {verifyToken} from "../../../environments/apiHandler";
import {UserInfo} from "../../../models/userinfo.interface";
import {setUserInfo} from "../../../store/reducers/userinfo.reducer";
import { useDispatch } from "react-redux";

export const loginSuccess = async (res: any) : Promise<UserInfo | null> => {
    if (res.data && res.data.message) {
        toggleSnackbar.next(res.data.message)
        toggleDialog.next(false)
    }
    if (res.data && res.data.access_token) {
        let checker = await verifyToken(res.data.access_token)
        if (checker.status === 200 && checker.data) {
            return checker.data
        } else {
            return null
        }
    } else {
        toggleSnackbar.next("No access token received")
        return null
    }
}

export const AuthenticationLoginCard = () => {

    let dispatcher = useDispatch()

    let loginAction = () => {

        axios.post(`${apiUrl}/auth/userlogin/`, loginInfo,
            {
                withCredentials: true // allow server to set httponly cookie
            })
            .then(async res => {
                let success = await loginSuccess(res)
                if (success) {
                    dispatcher(setUserInfo(success))
                }
            }).catch((error) => {
        })

    }

    let loginInfo = {
        email: "",
        password: ""
    }

    const LoginCard = styled(ClayCard)`
      max-width: 400px;
    `

    return (
        <LoginCard>
            <Typography variant="h3" className="text-center pb-3 fw-bold" color={globalSettings.secondaryTextColor}>Sign
                In</Typography>
            <UI_Input label={"Email"} onBlur={(e: any) => {
                loginInfo.email = e.target.value
            }}/>
            <UI_Input label={"Password"} onBlur={(e: any) => {
                loginInfo.password = e.target.value
            }}/>
            <Row>
                <Col className="text-end">
                    <BasicButton onClick={() => loginAction()}><i
                        className="fa-solid fa-check"/> OK</BasicButton>
                </Col>
            </Row>
            <Row className="py-3">
                <Col>
                    <Divider></Divider>
                </Col>
            </Row>
            <Row xs="auto" className="justify-content-center">
                <Col>
                    <GgLoginBtn></GgLoginBtn>
                </Col>
            </Row>
        </LoginCard>
    )
}