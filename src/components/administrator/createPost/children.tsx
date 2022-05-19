import React, {useEffect, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import JoditEditor from "jodit-react";
import {postimg, PostImgShowCase} from "../../UI_Components/imgShowCase";
import {apiPostData, apiPostFile} from "../../../environments/apiHandler";
import {toggleSnackbar} from "../../UI_Components/UI_Snackbar";
import {BasicButton, SuccessButton} from "../../UI_Components/Buttons";
import {cdnUrl} from "../../../environments/environments";
import {PostInfo} from "./createPost";
import {UI_Input} from "../../UI_Components/UI_Input";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import { normalizeText } from 'normalize-text';

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
    post_imgs: postimg[],
    post_avatar: postimg
}) => {

    let {postInfo, post_imgs, post_avatar} = props

    let submitPost = async () => {

        apiPostData('blog/post/savenewpost/',
            {
                postInfo,
                post_imgs,
                post_avatar
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
                if (!res.data || !res.data.media_file) {
                    console.log("No response data or response file")
                    return
                }
                let newItem : postimg = {id: res.data.id, source: `${cdnUrl}${res.data.media_file}`, media_name: res.data.media_name}
                setPostImgs(
                    (prev: postimg[]) => {
                        return [...prev, newItem]
                    }
                )
            }
        ).catch(
            error => {
                if(error.data) {
                    toggleSnackbar.next(JSON.stringify(error.data))
                }
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
    setPostInfo: React.Dispatch<any>
}) => {

    let {setPostInfo} = props

    let [myTitle, setMyTitle] = useState<string>("")

    return (
        <UI_Input
            label="Title"
            value={myTitle}
            onChange={(e) => setMyTitle(e.target.value)}
            onBlur={(e) => setPostInfo(
                (prev: PostInfo) => {
                    let name = e.target.value.trim()
                    let urlName = normalizeText(name)
                    urlName = urlName.replace(/[^a-zA-Z0-9]/g, '-')
                    let newVal = {...prev, post_title: name}
                    if (
                        urlName != "" &&
                        prev.post_url_name != urlName &&
                        window.confirm("Apply url name?")
                    ) {
                        newVal = {...prev, post_title: name, post_url_name: urlName}
                    }
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

export let AddPostAvatarBtn = (props: {
    setPostAvatar: React.Dispatch<any>
}) => {

    let {setPostAvatar} = props

    let addFileRef = useRef<any>();

    let uploadPostimg = (e: any) => {
        const data = new FormData()
        data.append('upload', e.target.files[0])
        data.set('imgCategory', "blogPostAvatar")
        let url = `blog/post/uploadimg/`;

        apiPostFile(url, data).then(
            res => {
                if (!res.data || !res.data.media_file) {
                    console.log("No response data or response file")
                    return
                }
                let newItem : postimg = {id: res.data.id, source: `${cdnUrl}${res.data.media_file}`, media_name: res.data.media_name}
                setPostAvatar(newItem)
            }
        ).catch(
            error => {
                if(error.data) {
                    toggleSnackbar.next(JSON.stringify(error.data))
                }
                console.log(error)
            }
        )
    }


    return (
        <Box>
            <input ref={addFileRef} hidden type="file" name="upload"
                   onChange={(e) => {
                       uploadPostimg(e)
                   }}/>
            <SuccessButton onClick={() => addFileRef.current.click()}>
                <i className="fa-regular fa-image me-2"></i> Post Avatar
            </SuccessButton>
        </Box>
    )
}

export let PostNameOnUrl = (props: {
    postUrlName: string,
    setPostInfo: React.Dispatch<any>
}) => {
    let {postUrlName, setPostInfo} = props

    let [myUrlName, setMyUrlName] = useState<string>("")

    useEffect(
        () => {
            setMyUrlName(postUrlName)
        }, [postUrlName]
    )

    return (
        <UI_Input label="Post name on url"
                  value={myUrlName}
                  onChange={
                      (e) => {
                          setMyUrlName(e.target.value)
                      }
                  }
                  onBlur={(e) => {
                      setPostInfo(
                          (prev: PostInfo) => {
                              return {...prev, post_url_name: e.target.value}
                          }
                      )
                  }}
        />
    )
}