import React, {useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ClayCard} from "../UI_Components/ClayCard";
import {UI_Input} from "../UI_Components/UI_Input";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {BasicButton, SuccessButton} from "../UI_Components/Buttons";
import JoditEditor from "jodit-react";
import {cdnUrl, globalSettings} from "../../environments/environments";
import {apiPostData, apiPostFile} from "../../environments/apiHandler";
import {toggleSnackbar} from "../UI_Components/UI_Snackbar";
import {postimg, PostImgShowCase} from "./imgShowCase";
import {MyBreadCrumb} from "../UI_Components/UI_Breadcrumbs";
import {gradientBgOne} from "../UI_Components/GradientBgOne";
import {Subject, takeUntil} from "rxjs";

interface PostInfo {
    post_title: string
    post_category: string
    post_content: string
    post_urlName: string
}

let MyPostEditor = (props: {
    content: string,
    setContent: React.Dispatch<any>
}) => {

    let {content, setContent} = props

    return (
        <Row className="py-3">
            <Col>
                <JoditEditor
                    value={content}
                    config={{
                        buttons: [
                            'source', '|',
                            'bold',
                            'strikethrough',
                            'underline',
                            'italic', '|',
                            'ul',
                            'ol', '|',
                            'outdent', 'indent', '|',
                            'font',
                            'fontsize',
                            'brush',
                            'paragraph', '|',
                            'image',
                            'video',
                            'table',
                            'link', '|',
                            'align', 'undo', 'redo', '|',
                            'hr',
                            'eraser',
                            'copyformat', '|',
                            'symbol',
                            'print',
                            'about'
                        ],
                        readonly: false,
                        toolbarAdaptive: false
                    }}
                    onBlur={newContent => {
                        setContent((prev: PostInfo) => {
                            return {...prev, post_content: newContent}
                        })
                    }}
                />
            </Col>
        </Row>
    )
}

let SubmitPost = (props: {
    postInfo: PostInfo,
    post_imgs: postimg[]
}) => {

    let {postInfo, post_imgs} = props

    let submitPost = async () => {

        console.log(postInfo)
        console.log(post_imgs)


        apiPostData('blog/post/savenewpost/',
            {
                postInfo,
                post_imgs
            }
        ).then(
            res => {
                console.log(res)
            }
        ).catch(
            (error) => {
                if (error.data && typeof (error.data) == "object") {
                    let keys = Object.keys(error.data)
                    let vals = Object.values(error.data)
                    if (keys.length > 0) {
                        let key = JSON.stringify(keys[0])
                        let val = JSON.stringify(vals[0])
                        let msg = `${key}: ${val}`
                        toggleSnackbar.next(msg)
                    }
                }
            }
        )
    }

    return (
        <BasicButton onClick={submitPost}>Submit</BasicButton>
    )
}

let AddBlogPostImage = (props: {
    postImgs: postimg[],
    setPostImgs: React.Dispatch<any>
}) => {

    let {postImgs, setPostImgs} = props

    let addFileRef = useRef<any>()

    let uploadPostimg = (e: any) => {
        const data = new FormData()
        data.append('upload', e.target.files[0])
        data.set('imgCategory', "blogPostImage")
        let url = `blog/post/uploadimg/`;

        apiPostFile(url, data).then(
            res => {
                if (!res.data || !res.data.media_path) {
                    return
                }
                let newItem = {source: `${cdnUrl}/${res.data.media_path}`, media_name: res.data.media_name}
                setPostImgs(
                    (prev: postimg[]) => {
                        return [...prev, newItem]
                    }
                )
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    return (
        <Row>
            <Col>
                <PostImgShowCase postImgs={postImgs}/>

                <Row className="py-3">
                    <Col>
                        <input ref={addFileRef} hidden type="file" name="upload"
                               onChange={(e) => {
                                   uploadPostimg(e)
                               }}/>
                        <SuccessButton onClick={() => addFileRef.current.click()}>
                            Add photos
                        </SuccessButton>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
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
                                        <UI_Input
                                            label="post title"
                                            value={postInfo.post_title}
                                            onChange={(e) => setPostInfo(
                                                (prev) => {
                                                    let name = e.target.value
                                                    let urlName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                                    urlName = urlName.replace(/[^a-zA-Z0-9]/g, '-')
                                                    let newVal = {...prev, post_title: name, post_urlName: urlName}
                                                    return newVal
                                                }
                                            )}
                                            onBlur={() => console.log(postInfo)}
                                        />
                                    </Col>
                                    <Col>
                                        <FormControl fullWidth style={{paddingBottom: '1rem'}}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                label="Category"
                                                value={postInfo.post_category}
                                                onChange={(e: any) => {
                                                    setPostInfo({...postInfo, post_category: e.target.value})
                                                }}
                                            >
                                                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                                                <MenuItem value="Information Technology">Information
                                                    Technology</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <UI_Input label="Post name on url"
                                                  value={postInfo.post_urlName}
                                                  disabled
                                        />
                                    </Col>
                                </Row>

                                <MyPostEditor content={postInfo.post_content} setContent={setPostInfo}/>
                                <AddBlogPostImage postImgs={postImgs} setPostImgs={setPostImgs}/>

                                <Row className="py-3">
                                    <Col className="text-center">
                                        <SubmitPost postInfo={postInfo} post_imgs={postImgs}/>
                                    </Col>
                                </Row>
                            </Container>
                        </ClayCard>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}