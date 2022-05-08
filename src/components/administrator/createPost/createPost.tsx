import React, {useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ClayCard} from "../../UI_Components/ClayCard";
import {UI_Input} from "../../UI_Components/UI_Input";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {BasicButton, SuccessButton} from "../../UI_Components/Buttons";
import JoditEditor from "jodit-react";
import {cdnUrl, globalSettings} from "../../../environments/environments";
import {apiPostData, apiPostFile} from "../../../environments/apiHandler";
import {toggleSnackbar} from "../../UI_Components/UI_Snackbar";
import {postimg, PostImgShowCase} from "../../UI_Components/imgShowCase";
import {MyBreadCrumb} from "../../UI_Components/UI_Breadcrumbs";
import {gradientBgOne} from "../../UI_Components/GradientBgOne";
import {Subject, takeUntil} from "rxjs";
import {AddBlogPostImage, MyPostEditor, PostCategory, PostNameOnUrl, PostTitle, SubmitPost} from "./children";

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
                                        <PostTitle postTitle={postInfo.post_title} setPostInfo={setPostInfo} />
                                    </Col>
                                    <Col>
                                        <PostCategory postCategory={postInfo.post_category} setPostInfo={setPostInfo} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <PostNameOnUrl postUrlName={postInfo.post_urlName} />
                                    </Col>
                                    <Col xs="auto">

                                    </Col>
                                </Row>

                                <MyPostEditor content={postInfo.post_content} setContent={setPostInfo}/>
                                <AddBlogPostImage postImgs={postImgs} setPostImgs={setPostImgs}/>
                                <SubmitPost postInfo={postInfo} post_imgs={postImgs}/>
                            </Container>
                        </ClayCard>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}