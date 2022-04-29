import React from "react";

import {UI_Snackbar} from "../UI_Components/UI_Snackbar";
import {LandingPageLefSidebar} from "../shared/landingPage/LeftSidebar/landingPageLeftSidebar";
import {LandingPageHeader} from "../shared/landingPage/Header/landingPageHeader";
import {Outlet} from "react-router-dom";
import {Container} from 'react-bootstrap';
import {UI_Dialog} from "../UI_Components/UI_Dialog";

export const MainLandingPage = () => {

    return (
        <main>
            <LandingPageLefSidebar/>
            <LandingPageHeader/>
            <UI_Snackbar/>
            <UI_Dialog/>
            <Container fluid className="p-0">
                <Outlet/>
            </Container>
        </main>
    )
}