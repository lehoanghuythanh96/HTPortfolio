import React, {useEffect, useRef} from "react";
import {Col, Row} from "react-bootstrap";
import JoditEditor from "jodit-react";
import {postimg, PostImgShowCase} from "../../UI_Components/imgShowCase";
import {apiPostData, apiPostFile} from "../../../environments/apiHandler";
import {toggleSnackbar} from "../../UI_Components/UI_Snackbar";
import {BasicButton, SuccessButton} from "../../UI_Components/Buttons";
import {cdnUrl} from "../../../environments/environments";
import {PostInfo} from "./createPost";
import {UI_Input} from "../../UI_Components/UI_Input";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export let MyPostEditor = (props: {
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

export let SubmitPost = (props: {
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
        <Row className="py-3">
            <Col className="text-center">
                <BasicButton onClick={submitPost}>Submit</BasicButton>
            </Col>
        </Row>
    )
}

export let AddBlogPostImage = (props: {
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
                            <i className="fa-light fa-image-polaroid me-2"></i> Add photos
                        </SuccessButton>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export let PostTitle = (props: {
    postTitle: string,
    setPostInfo: React.Dispatch<any>
}) => {

    let {postTitle, setPostInfo} = props

    return (
        <UI_Input
            label="Title"
            value={postTitle}
            onChange={(e) => setPostInfo(
                (prev: PostInfo) => {
                    let name = e.target.value
                    let urlName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    urlName = urlName.replace(/[^a-zA-Z0-9]/g, '-')
                    let newVal = {...prev, post_title: name, post_urlName: urlName}
                    return newVal
                }
            )}
        />
    )
}

export let PostCategory = (props: {
    postCategory: string,
    setPostInfo: React.Dispatch<any>
}) => {

    let {postCategory, setPostInfo} = props

    return (
        <FormControl fullWidth style={{paddingBottom: '1rem'}}>
            <InputLabel>Category</InputLabel>
            <Select
                label="Category"
                value={postCategory}
                onChange={(e: any) => {
                    setPostInfo(
                        (prev: PostInfo) => {
                            return {...prev, post_category: e.target.value}
                        }
                    )
                }}
            >
                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                <MenuItem value="Information Technology">Information
                    Technology</MenuItem>
            </Select>
        </FormControl>
    )
}

export let AddPostAvatarBtn = () => {

}

export let PostNameOnUrl = (props: {
    postUrlName: string
}) => {
    let {postUrlName} = props

    return (
        <UI_Input label="Post name on url"
                  value={postUrlName}
                  disabled
        />
    )
}