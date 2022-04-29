import React from "react";
import {Subject, takeUntil} from "rxjs";
import {Col, Row} from "react-bootstrap";
import {myAutoPlay} from "./withAutoplay.d";
import AwesomeSlider from "react-awesome-slider";

export const imgShowCaseItem$ = new Subject<postimg>()

export interface postimg {
    source: string
    media_name: string
}

export class PostImgShowCase extends React.Component<any, any> {

    destroy$ = new Subject<boolean>()

    state: {
        post_imgs: postimg[]
    } = {
        post_imgs: []
    }

    componentDidMount() {

        imgShowCaseItem$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(
            res => {
                let currentImgs = [...this.state.post_imgs]
                currentImgs.push(res)
                console.log(currentImgs)
                this.setState({post_imgs: currentImgs})

            }
        )
    }

    componentWillUnmount() {
        this.destroy$.next(true)
        this.destroy$.unsubscribe()
    }

    render() {

        const AutoplaySlider = myAutoPlay(AwesomeSlider);

        if (this.state.post_imgs.length > 0) {
            return (
                <Row className="justify-content-center py-4">
                    <Col style={{maxWidth: "500px"}}>
                        <AutoplaySlider
                            mobileTouch={true}
                            play={true}
                            cancelOnInteraction={false} // should stop playing on user interaction
                            interval={2000}
                            animation="cubeAnimation"
                            media={this.state.post_imgs}
                            bullets={false}
                        />
                    </Col>
                </Row>
            )
        } else {
            return <Row></Row>
        }
    }

}