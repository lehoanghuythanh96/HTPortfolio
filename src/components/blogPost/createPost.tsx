import React, {useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ClayCard} from "../UI_Components/ClayCard";
import {UI_Input} from "../UI_Components/UI_Input";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {BasicButton, SuccessButton} from "../UI_Components/Buttons";
import JoditEditor from "jodit-react";
import {cdnUrl, globalSettings} from "../../environments/environments";
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import {apiPostData, apiPostFile} from "../../environments/apiHandler";
import {toggleSnackbar} from "../UI_Components/UI_Snackbar";
import {imgShowCaseItem$, postimg, PostImgShowCase} from "./imgShowCase";
import {MyBreadCrumb} from "../UI_Components/UI_Breadcrumbs";
import {gradientBgOne} from "../UI_Components/GradientBgOne";
import {Subject, takeUntil} from "rxjs";

interface PostInfo {
    post_title: string
    post_category: string
    post_content: string
    post_urlName: string
}

const postInfo$ = new Subject()

export const CreateBlogPost = () => {

    let destroy$ = new Subject<boolean>();

    let [postInfo, setPostInfo] = useState<PostInfo>({
        post_title: "",
        post_content: "",
        post_category: "Lifestyle",
        post_urlName: ""
    })

    let [post_imgs, set_post_imgs] = useState<postimg[]>([])

    useEffect(() => {
        postInfo$.pipe(
            takeUntil(destroy$)
        ).subscribe(
            res => {
                let val = {...postInfo}
                Object.assign(val, res)
                setPostInfo(val)
                console.log(postInfo)
            }
        )

        imgShowCaseItem$.pipe(
            takeUntil(destroy$)
        ).subscribe(
            res => {
                let initial = [...post_imgs]
                initial.push(res)
                set_post_imgs(initial)
            }
        )

        return () => {
            destroy$.next(false);
            destroy$.unsubscribe()
        }
    })


    let addFileRef = useRef<any>()
    let joditeditor = useRef<any>()

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

    let uploadPostimg = (e: any) => {
        const data = new FormData()
        data.append('upload', e.target.files[0])
        let url = `blog/post/uploadimg/`;

        apiPostFile(url, data).then(
            res => {
                if (!res.data || !res.data.media_path) {
                    return
                }
                let newItem = {source: `${cdnUrl}/${res.data.media_path}`, media_name: res.data.media_name}
                imgShowCaseItem$.next(newItem)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    let PostEditor = () => {
        return (
            <Row className="py-3">
                <Col>
                    <JoditEditor
                        ref={joditeditor}
                        value={postInfo.post_content}
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
                            postInfo$.next({post_content: newContent})
                        }}
                    />
                </Col>
            </Row>
        )
    }


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
                                        <UI_Input label="Title"
                                                  onBlur={(e: any) => {
                                                      let name = e.target.value
                                                      let urlName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                                      urlName = urlName.replace(/[^a-zA-Z0-9]/g, '-')
                                                      postInfo$.next({post_urlName: urlName, post_title: name})
                                                  }}
                                        />
                                    </Col>
                                    <Col>
                                        <FormControl fullWidth style={{paddingBottom: '1rem'}}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                label="Category"
                                                value={postInfo.post_category}
                                                onChange={(e: any) => {
                                                    postInfo$.next({post_category: e.target.value})
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

                                {PostEditor()}
                                <PostImgShowCase/>

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

                                <Row className="py-3">
                                    <Col className="text-center">
                                        <BasicButton onClick={submitPost}>Submit</BasicButton>
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