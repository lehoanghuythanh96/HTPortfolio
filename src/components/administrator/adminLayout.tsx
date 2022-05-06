import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";

export const AdminPanel = () => {
    return (
        <Container fluid className="p-0">
            <Outlet/>
        </Container>
    )
}