import React, {useEffect, useState} from "react";
import {Subject, takeUntil} from "rxjs";
import {Col, Row} from "react-bootstrap";
import {myAutoPlay} from "./withAutoplay.d";
import AwesomeSlider from "react-awesome-slider";

export const imgShowCaseItem$ = new Subject<postimg>()

export interface postimg {
    source: string
    media_name: string
}

export const PostImgShowCase = () => {

    const destroy$ = new Subject<boolean>()

    let [post_imgs, set_post_imgs] = useState<postimg[]>([])

    useEffect(() => {
        imgShowCaseItem$.pipe(
            takeUntil(destroy$)
        ).subscribe(
            res => {
                let currentImgs = [...post_imgs]
                currentImgs.push(res)
                console.log(currentImgs)
                set_post_imgs(currentImgs)
            }
        )
        return () => {
            destroy$.next(true)
            destroy$.unsubscribe()
        }
    })

    const AutoplaySlider = myAutoPlay(AwesomeSlider);

    if (post_imgs.length > 0) {
        return (
            <Row className="justify-content-center py-4">
                <Col style={{maxWidth: "500px"}}>
                    <AutoplaySlider
                        mobileTouch={true}
                        play={true}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={2000}
                        animation="cubeAnimation"
                        media={post_imgs}
                        bullets={false}
                    />
                </Col>
            </Row>
        )
    } else {
        return <Row></Row>
    }

}