import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {apiPostData} from "../../environments/apiHandler";
import {gql, useQuery} from "@apollo/client";

const AdminPanelQuery = gql`
    query {
        adminPanel {
            allBlogPosts {
                postTitle,
                postContent,
                postAuthor {
                    fullName,
                    email
                }
            }
        }
    }
`

export const AdminPanel = () => {

    let queryA = useQuery(AdminPanelQuery);

    useEffect(() => {
        console.log(queryA.data, queryA.error)
    }, [queryA])

    return (
        <Container fluid className="p-0">
            <Outlet/>
        </Container>
    )
}