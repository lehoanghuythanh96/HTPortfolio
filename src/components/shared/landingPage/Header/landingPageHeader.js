import React, {createRef, useEffect, useRef} from "react";

import {gsap} from "gsap";
import {Col, Container, Row} from "react-bootstrap";
import {BottomNavigation, BottomNavigationAction, Box, Button, styled, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {MenuItems} from "../../../../models/menuItems";
import {BasicButton} from "../../../UI_Components/Buttons";
import HTMLReactParser from "html-react-parser";
import {ClayCard} from "../../../UI_Components/ClayCard";
import {dialogContent, toggleDialog} from "../../../UI_Components/UI_Dialog";
import {AuthenticationLoginCard} from "../../authenticationShared/logincard";
import {ToggleLandingPageLefSidebar} from "../LeftSidebar/landingPageLeftSidebar";
import {globalSettings} from "../../../../environments/environments";

export class LandingPageHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bottomNavVal: 0,
            lastScrollY: 0
        }

        this.topNavEl = React.createRef()
        this.bottomNavEl = React.createRef()

        // topNav
        this.navWrapper = gsap.utils.selector(this.topNavEl);

        // endTopNav

        const userCard = () => {
            return (
                <ClayCard style={{width: "fit-content"}}>
                    <Row>
                        <Col>
                            <Button onClick={() => {
                                return showLoginCard()
                            }}>Log In</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button>Sign Up</Button>
                        </Col>
                    </Row>
                </ClayCard>
            )
        }

        const showLoginCard = () => {
            dialogContent.next(<AuthenticationLoginCard/>)
        }

        this.menuClick = (id) => {
            if (id === 2) {
                toggleDialog.next(true)
                dialogContent.next(userCard())
            }
            if (id === 3) {
            }
        }
    }

    navScroller = () => {
        let tl = gsap.timeline()
        if (window.oldScroll > window.scrollY) {
            tl.to(this.bottomNavEl.current, {y: 0})
        } else {
            tl.to(this.bottomNavEl.current, {y: 200})
        }
        window.oldScroll = window.scrollY;
        if (window.scrollY >= 50) {
            gsap.to(this.topNavEl.current, {background: "transparent"})
        } else {
            gsap.to(this.topNavEl.current, {background: "white"})
        }
    }

    componentDidMount() {

        window.addEventListener('scroll', this.navScroller, true)

        let tl = gsap.timeline()
        // Target ALL descendants with the class of .box
        tl.fromTo(this.navWrapper(".nav-btn"), {y: 100}, {y: 0, stagger: 0.33});
        tl.set(this.navWrapper(".nav-btn"), {clearProps: "transform"})
    }

    render() {

        let MainNav = styled(`div`)`
          overflow: inherit;
        `

        return (
            <Box>
                <Container fluid ref={this.topNavEl}
                           style={{position: "fixed", top: 0, zIndex: 1000, background: "white"}}>
                    <Row className="justify-content-between align-items-center py-2">
                        <Col xs="auto">
                            <img src="/thanhlogo.png" width={'40px'} height={'40px'}/>
                        </Col>
                        <Col xs="auto" style={{height: 'fit-content'}}>
                            <Typography variant="h5" color={globalSettings.secondaryTextColor}>
                                My Portfolio
                            </Typography>
                        </Col>
                        <Col xs="auto">
                            <MainNav className="d-none d-md-flex">
                                <Row>
                                    <Col>
                                        <BasicButton className="nav-btn"
                                                     onClick={() => {ToggleLandingPageLefSidebar.next(true)}}
                                        >
                                            <Typography variant="h5">
                                                <i className="fa-solid fa-ellipsis-stroke"></i>
                                            </Typography>
                                        </BasicButton>
                                    </Col>
                                </Row>
                            </MainNav>
                        </Col>
                    </Row>
                </Container>
                <AppBar className="d-md-none" ref={this.bottomNavEl} position="fixed" color="primary"
                        style={{top: "auto", bottom: 0, zIndex: 1000}}>
                    <BottomNavigation
                        value={this.state.bottomNavVal}
                        onChange={(event, newValue) => {
                            this.setState({bottomNavVal: newValue})
                        }}
                    >
                        {MenuItems.map((item, i) => (
                            <BottomNavigationAction key={i} label={item.name}
                                                    icon={HTMLReactParser(item.icon)} onClick={() => {
                                return this.menuClick(item.id)
                            }}/>
                        ))}
                    </BottomNavigation>
                </AppBar>
            </Box>
        )
    }
};