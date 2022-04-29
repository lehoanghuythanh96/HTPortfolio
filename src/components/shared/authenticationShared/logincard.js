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

export async function loginSuccess(res) {
    if (res.data && res.data.message) {
        toggleSnackbar.next(res.data.message)
        toggleDialog.next(false)
    }
    if (res.data && res.data.access_token) {
        await verifyToken(res.data.access_token)
        return
    } else {
        toggleSnackbar.next("No access token received")
    }
}

export class AuthenticationLoginCard extends React.Component {

    constructor(props) {
        super(props);

        this.loginAction = () => {

            axios.post(`${apiUrl}/auth/userlogin/`, this.loginInfo,
                {
                    withCredentials: true // allow server to set httponly cookie
                })
                .then(async res => {
                    await loginSuccess(res)
                }).catch((error) => {})

        }

    }

    loginInfo = {
        email: "",
        password: ""
    }

    render() {
        const LoginCard = styled(ClayCard)`
          max-width: 400px;
        `

        return (
            <LoginCard>
                <Typography variant="h3" className="text-center pb-3 fw-bold" color={globalSettings.secondaryTextColor}>Sign
                    In</Typography>
                <UI_Input label={"Email"} onBlur={(e) => {
                    this.loginInfo.email = e.target.value
                }}/>
                <UI_Input label={"Password"} onBlur={(e) => {
                    this.loginInfo.password = e.target.value
                }}/>
                <Row>
                    <Col className="text-end">
                        <BasicButton onClick={() => this.loginAction()}><i
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
}