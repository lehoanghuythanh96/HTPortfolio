import React from "react";
import {ClayCard} from "../UI_Components/ClayCard";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class __SinglePostView extends React.Component {

    constructor(props) {
        super(props);

        this.params = this.props.params
    }

    render() {
        return (
            <Container fluid style={{padding: "6rem 0"}}>
                <Row>
                    <Col>
                        <ClayCard>
                            {this.params.postName}
                            {this.props.hihi}

                            fdsafsdfs
                        </ClayCard>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export const SinglePostView = withParams(__SinglePostView);