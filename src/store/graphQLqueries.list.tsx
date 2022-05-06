import {gql} from "@apollo/client";

export const graphQLqueries = {
    AdminPanelQuery: gql`
        query {
            adminPanel {
                allBlogPosts {
                    id,
                    postTitle,
                    postContent,
                    postDate,
                    postAuthor {
                        fullName,
                        email
                    }
                }
            }
        }
    `
}