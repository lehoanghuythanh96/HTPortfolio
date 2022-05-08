import React, {useEffect, useState} from "react";
import {Subject, takeUntil} from "rxjs";
import {Col, Row} from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Scrollbar, A11y, Mousewheel} from 'swiper';
import {Box} from "@mui/material";
import Zoom from 'react-medium-image-zoom'

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
                set_post_imgs(currentImgs)
            }
        )
        return () => {
            destroy$.next(true)
            destroy$.unsubscribe()
        }
    })

    if (post_imgs.length > 0) {
        return (
            <Row className="justify-content-center py-4">
                <Col style={{maxWidth: 500}}>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        modules={[Scrollbar, A11y, Mousewheel]}
                        scrollbar={true}
                        mousewheel={{
                            forceToAxis: true
                        }}
                    >
                        {
                            post_imgs.map(
                                (item, i) => (
                                    <SwiperSlide key={i}>
                                        <Box
                                            sx={{
                                                maxWidth: "100%",
                                                width: 300,
                                                height: "15vh",
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Zoom>
                                                <img
                                                    alt="Blog post img"
                                                    src={item.source}
                                                    style={{maxWidth: "100%"}}
                                                />
                                            </Zoom>
                                        </Box>
                                    </SwiperSlide>
                                )
                            )
                        }
                    </Swiper>
                </Col>
            </Row>
        )
    } else {
        return <Row></Row>
    }

}