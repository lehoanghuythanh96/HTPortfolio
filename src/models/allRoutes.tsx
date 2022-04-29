import {AdminPanel} from "../components/administrator/adminLayout";
import React, {ReactNode} from "react";
import {AdminHomePage} from "../components/administrator/homepanel";
import {CreateBlogPost} from "../components/blogPost/createPost";
import {SinglePostView} from "../components/blogPost/singlePostView";
import {Route} from "react-router-dom";

interface SingleRoute {
    name: string
    path: string
    index?: boolean
    element: ReactNode
    children?: SingleRoute[]
}

export const allRoutes: SingleRoute[] = [
    {
        name: "Admin Panel",
        path: "admin",
        element: <AdminPanel/>,
        children: [
            {
                name: "Home",
                path: "panel",
                index: true,
                element: <AdminHomePage/>
            },
            {
                name: "Create post",
                path: "createpost",
                element: <CreateBlogPost/>
            }
        ]
    },
    {
        name: "Create single post",
        path: "createpost",
        element: <CreateBlogPost/>
    },
    {
        name: "Single post",
        path: "singlepost",
        element: <SinglePostView/>,
        children: [
            {
                name: "View",
                path: ":postName",
                element: <SinglePostView/>
            }
        ]
    }
]

export function childrenRenderer(children: SingleRoute[]) {
    if (children.length === 0) {
        return null
    }
    let result = children.map((single, index) => (
        <Route key={index} path={single.path} element={single.element}/>
    ))
    return result
}

export function findRouteIndex(children: SingleRoute[]) {
    if (children.length === 0) {
        return null
    }
    let foundIndex = children.find(item => item.index)
    if (!foundIndex) return null

    return <Route index element={foundIndex.element} />
}