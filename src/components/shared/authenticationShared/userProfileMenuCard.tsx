import {Col, Container, Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {ClayCard} from "../../UI_Components/ClayCard";
import React from "react";
import {dialogContent, toggleDialog} from "../../UI_Components/UI_Dialog";
import {AuthenticationLoginCard} from "./logincard";
import {CoreStore} from "../../../store/core.store";
import {Subject, takeUntil} from "rxjs";
import {UserInfo, userRoles} from "../../../models/userinfo.interface";
import {Link} from "react-router-dom";

interface MyState {
    userInfo: UserInfo | null
}

export class UserProfileMenuCard extends React.Component {

    state: MyState = {
        userInfo: null
    }

    destroy$ = new Subject();

    componentDidMount() {
        CoreStore.userInfo$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(
            res => {
                this.setState({userInfo: res})
            }
        )
    }

    componentWillUnmount() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    render() {
        return (
            <ClayCard style={{width: "fit-content"}}>
                <Container className="p-0">
                    {this.state.userInfo === null ? (
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
                    {this.state.userInfo?.user_role === userRoles.admin ? (
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

}