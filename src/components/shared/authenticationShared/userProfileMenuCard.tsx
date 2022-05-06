import {Col, Container, Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {ClayCard} from "../../UI_Components/ClayCard";
import React, {useEffect} from "react";
import {dialogContent, toggleDialog} from "../../UI_Components/UI_Dialog";
import {AuthenticationLoginCard} from "./logincard";
import {Subject, takeUntil} from "rxjs";
import {UserInfo} from "../../../models/userinfo.interface";
import {Link} from "react-router-dom";
import {AppState} from "../../../store/models/corestore.interface";
import { useSelector } from "react-redux";

export const UserProfileMenuCard = () => {

    let userInfo$ = useSelector((state: AppState) => state.userInfo.data)

    return (
        <ClayCard style={{width: "fit-content"}}>
            <Container className="p-0">
                {userInfo$ === null ? (
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Button onClick={() => {
                                        dialogContent.next(AuthenticationLoginCard)
                                    }}>Log In</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button>Sign Up</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ) : <div></div>}
                {userInfo$?.is_superuser ? (
                    <Row>
                        <Col>
                            <Link
                                to="/admin/panel"
                                style={{color: 'inherit', textDecoration: 'none'}}
                                onClick={() => toggleDialog.next(false)}
                            >
                                <Button>Administrator</Button>
                            </Link>
                        </Col>
                    </Row>
                ) : <div/>}
            </Container>
        </ClayCard>
    )

}