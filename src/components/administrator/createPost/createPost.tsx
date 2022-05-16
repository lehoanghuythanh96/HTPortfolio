import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ClayCard} from "../../UI_Components/ClayCard";
import {Box, Typography} from "@mui/material";
import {globalSettings} from "../../../environments/environments";
import {postimg} from "../../UI_Components/imgShowCase";
import {MyBreadCrumb} from "../../UI_Components/UI_Breadcrumbs";
import {gradientBgOne} from "../../UI_Components/GradientBgOne";
import {
    AddBlogPostImage,
    AddPostAvatarBtn,
    MyPostEditor,
    PostCategory,
    PostNameOnUrl,
    PostTitle,
    SubmitPost
} from "./children";

export interface PostInfo {
    post_title: string
    post_category: string
    post_content: string
    post_urlName: string
}

export const CreateBlogPost = () => {

    let [postInfo, setPostInfo] = useState<PostInfo>({
        post_title: "",
        post_content: "",
        post_category: "Lifestyle",
        post_urlName: ""
    })

    let [postImgs, setPostImgs] = useState<postimg[]>([])
    let [postAvatar, setPostAvatar] = useState<postimg | null>(null)

    return (
        <Container fluid style={{padding: '100px 0', background: gradientBgOne, minHeight: '100vh'}}>
            <Container>
                <Row className="pb-4">
                    <Col xs="auto">
                        <ClayCard>
                            <MyBreadCrumb/>
                        </ClayCard>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ClayCard>
                            <Container>
                                <Typography variant="h3" className="fw-bold text-center pb-3"
                                            color={globalSettings.secondaryTextColor}>
                                    Create post
                                </Typography>
                                <Row xs={1} md={2}>
                                    <Col>
                                        <PostTitle setPostInfo={setPostInfo} />
                                    </Col>
                                    <Col>
                                        <PostCategory postCategory={postInfo.post_category} setPostInfo={setPostInfo} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <PostNameOnUrl postUrlName={postInfo.post_urlName} setPostInfo={setPostInfo} />
                                    </Col>
                                    <Col xs="auto">
                                        <AddPostAvatarBtn setPostAvatar={setPostAvatar}/>
                                    </Col>
                                </Row>

                                <Row className="py-3 justify-content-center">
                                    <Col xs="auto">
                                        {
                                            postAvatar ? (
                                                <Box
                                                    style={{
                                                        width: 500,
                                                        maxWidth: "100%",
                                                        height: 300,
                                                        background: `url("${postAvatar.source}") no-repeat center center / cover`
                                                    }}
                                                />
                                            ) : (<div/>)
                                        }
                                    </Col>
                                </Row>

                                <MyPostEditor content={postInfo.post_content} setContent={setPostInfo}/>
                                <AddBlogPostImage postImgs={postImgs} setPostImgs={setPostImgs}/>
                                {
                                    postAvatar ? (
                                        <SubmitPost post_avatar={postAvatar} postInfo={postInfo} post_imgs={postImgs}/>
                                    ) : (
                                        <Row>
                                            <Col>
                                                <Typography>
                                                    Please add post avatar before submitting.
                                                </Typography>
                                            </Col>
                                        </Row>
                                    )
                                }
                            </Container>
                        </ClayCard>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}