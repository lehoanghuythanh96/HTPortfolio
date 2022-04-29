import React, {createRef} from "react";
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
import styled from "@emotion/styled";
import {imgShowCaseItem$, postimg, PostImgShowCase} from "./imgShowCase";
import {MyBreadCrumb} from "../UI_Components/UI_Breadcrumbs";
import {gradientBgOne} from "../UI_Components/GradientBgOne";

interface postInfo {
    post_title: string
    post_category: string
    post_content: string
    post_urlName: string
}

export class CreateBlogPost extends React.Component {

    postInfo: postInfo = {
        post_title: "",
        post_category: "Lifestyle",
        post_content: "",
        post_urlName: "",
    }
    post_imgs: postimg[] = []

    addFileRef = createRef<any>()
    joditeditor = createRef<any>()

    submitPost = async () => {

        console.log(this.postInfo)
        console.log(this.post_imgs)

        let postInfo = this.postInfo

        apiPostData('blog/post/savenewpost/',
            {
                postInfo,
                post_imgs: this.post_imgs
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

    uploadPostimg = (e: any) => {
        const data = new FormData()
        data.append('upload', e.target.files[0])
        let url = `blog/post/uploadimg/`;

        apiPostFile(url, data).then(
            res => {
                if (!res.data || !res.data.media_path) {
                    return
                }
                let newItem = {source: `${cdnUrl}/${res.data.media_path}`, media_name: res.data.media_name}
                this.post_imgs.push(newItem)
                imgShowCaseItem$.next(newItem)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    PostEditor = () => {
        return (
            <Row className="py-3">
                <Col>
                    <JoditEditor
                        ref={this.joditeditor}
                        value={this.postInfo.post_content}
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
                        onChange={newContent => {
                            this.postInfo.post_content = newContent
                        }}
                    />
                </Col>
            </Row>
        )
    }


    render() {

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
                                                          this.postInfo.post_urlName = urlName
                                                          this.postInfo.post_title = name
                                                      }}
                                            />
                                        </Col>
                                        <Col>
                                            <FormControl fullWidth style={{paddingBottom: '1rem'}}>
                                                <InputLabel>Category</InputLabel>
                                                <Select
                                                    label="Category"
                                                    value={this.postInfo.post_category}
                                                    onChange={(e: any) => {
                                                        this.postInfo.post_category = e.target.value
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
                                                      value={this.postInfo.post_urlName}
                                                      disabled
                                            />
                                        </Col>
                                    </Row>

                                    {this.PostEditor()}
                                    <PostImgShowCase/>

                                    <Row className="py-3">
                                        <Col>
                                            <input ref={this.addFileRef} hidden type="file" name="upload"
                                                   onChange={(e) => {
                                                       this.uploadPostimg(e)
                                                   }}/>
                                            <SuccessButton onClick={() => this.addFileRef.current.click()}>
                                                Add photos
                                            </SuccessButton>
                                        </Col>
                                    </Row>

                                    <Row className="py-3">
                                        <Col className="text-center">
                                            <BasicButton onClick={this.submitPost}>Submit</BasicButton>
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
}