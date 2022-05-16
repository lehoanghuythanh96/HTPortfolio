import React, {createRef, useEffect, useRef, useState} from "react";

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

export const LandingPageHeader = () => {

    let topNavEl = React.useRef(null)
    let bottomNavEl = React.useRef(null)
    let [bottomNavVal, setBottomNavVal] = useState(0),
        lastScrollY = 0,
        navWrapper = gsap.utils.selector(topNavEl),
        oldScroll = window.innerWidth

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
        dialogContent.next(AuthenticationLoginCard)
    }

    let menuClick = (id: number) => {
        if (id === 2) {
            toggleDialog.next(true)
            dialogContent.next(userCard)
        }
        if (id === 3) {
        }
    }

    let navScroller = () => {
        let tl = gsap.timeline()
        if (oldScroll > window.scrollY) {
            tl.to(bottomNavEl.current, {y: 0})
        } else {
            tl.to(bottomNavEl.current, {y: 200})
        }
        oldScroll = window.scrollY;
        if (window.scrollY >= 50) {
            gsap.to(topNavEl.current, {background: "transparent"})
        } else {
            gsap.to(topNavEl.current, {background: "white"})
        }
    }

    useEffect(
        () => {
            window.addEventListener('scroll', navScroller, true)

            let tl = gsap.timeline()
            // Target ALL descendants with the class of .box
            tl.fromTo(navWrapper(".nav-btn"), {y: 100}, {y: 0, stagger: 0.33});
            tl.set(navWrapper(".nav-btn"), {clearProps: "transform"})
        }
    )


    let MainNav = styled(`div`)`
      overflow: inherit;
    `

    return (
        <Box>
            <Container fluid ref={topNavEl}
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
                                                 onClick={() => {
                                                     ToggleLandingPageLefSidebar.next(true)
                                                 }}
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
            <AppBar className="d-md-none" ref={bottomNavEl} position="fixed" color="primary"
                    style={{top: "auto", bottom: 0, zIndex: 1000}}>
                <BottomNavigation
                    value={bottomNavVal}
                    onChange={(event, newValue) => {
                        setBottomNavVal(newValue)
                    }}
                >
                    {MenuItems.map((item, i) => (
                        <BottomNavigationAction key={i} label={item.name}
                                                icon={HTMLReactParser(item.icon)} onClick={() => {
                            return menuClick(item.id)
                        }}/>
                    ))}
                </BottomNavigation>
            </AppBar>
        </Box>
    )

};