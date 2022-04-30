import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {BasicButton, SuccessButton} from "../UI_Components/Buttons";
import {Link} from "react-router-dom";
import {apiPostData} from "../../environments/apiHandler";
import {MyBreadCrumb} from "../UI_Components/UI_Breadcrumbs";
import {gql, useQuery} from "@apollo/client";

const GET_POSTS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

export const AdminHomePage = () => {

    const deleteAlltrashMedia = async () => {
        return await apiPostData('blog/media/deleteall/',{})
    }

    return (
        <Container style={{
            padding:"6rem 0"
        }}>
            <Row className="pb-4">
                <Col>
                    <MyBreadCrumb />
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
            </Row>
        </Container>
    )
}