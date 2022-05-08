import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {BasicButton, SuccessButton} from "../UI_Components/Buttons";
import {Link} from "react-router-dom";
import {apiPostData} from "../../environments/apiHandler";
import {MyBreadCrumb} from "../UI_Components/UI_Breadcrumbs";
import {AdminAllPostTable} from "./allPostTable";

export const AdminHomePage = () => {

    let deleteAlltrashMedia = async () => {
        return await apiPostData('blog/media/deleteall/', {})
    }

    let deleteAllBlogPost = async () => {
        return await apiPostData('blog/post/deleteall/', {})
    }

    return (
        <Container style={{
            padding: "6rem 1rem"
        }}>
            <Row className="pb-4">
                <Col>
                    <MyBreadCrumb/>
                </Col>
            </Row>
            <Row>
                <Col xs="auto">
                    <Link to="/admin/createpost">
                        <SuccessButton>
                            <i className="fa-solid fa-plus"></i> Create post
                        </SuccessButton>
                    </Link>
                </Col>
                <Col xs="auto">
                    <BasicButton onClick={() => deleteAlltrashMedia()}>
                        Delete all trash
                    </BasicButton>
                </Col>
                <Col xs="auto">
                    <BasicButton onClick={() => deleteAllBlogPost()}>
                        Delete all blog post
                    </BasicButton>
                </Col>
            </Row>
            <Row className="py-4">
                <Col>
                    <AdminAllPostTable/>
                </Col>
            </Row>
        </Container>
    )
}