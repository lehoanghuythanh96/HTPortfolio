import React from "react";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {apiPostData} from "../../environments/apiHandler";

export class AdminPanel extends React.Component {

    async requireGraphql() {
        let res = await apiPostData("graphql/",{
            query: 'query {\n' +
                '  allBlogPosts {\n' +
                '      postTitle,\n' +
                '      postContent,\n' +
                '      postAuthor {\n' +
                '          fullName,\n' +
                '          email\n' +
                '      }\n' +
                '  }\n' +
                '}'
        })
        console.log(res)
    }

    render() {
        this.requireGraphql()

        return (
            <Container fluid className="p-0">
                <Outlet/>
            </Container>
        )
    }
}