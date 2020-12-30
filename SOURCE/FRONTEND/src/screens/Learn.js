import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Row, Col } from "react-bootstrap"
import "@styles/learn.css"
import { Divider, Fab, Slide } from "@material-ui/core"
import { Progress, Button } from 'antd';
import {withRouter} from "react-router-dom"
class Learn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sets: [
                {
                    front: "environment",
                    back: "Môi trường",
                    remember: 0,
                },
                {
                    front: "Ape",
                    back: "Khỉ, vượn, loài linh trưởng",
                    remember: 0,
                },
                {
                    front: "Age",
                    back: "Thời kì, thời đại",
                    remember: 0,
                },
                {
                    front: "Vulnerable",
                    back: "Dễ tổn thương, có thể thể bị tổn thương",
                    remember: 0,
                }
            ],
            currentCard: 0,
        }
    }

    render() {
        return (
            <>
                <Row className="h-100 learn">
                    <Col xs={2} className="float-div ml-3 px-0">
                        <Row
                            className="align-items-baseline py-3"
                        >
                            <i
                                class="far fa-chevron-left pl-4 pr-2 typical-text back-icon"
                                onClick={() => this.props.history.goBack()}
                            ></i>
                            <span 
                                className="back-btn cursor"
                                onClick={() => this.props.history.goBack()}    
                            >
                                Trở về
                            </span>
                        </Row>

                        <Divider />

                        <Row className="justify-content-center align-items-baseline title py-5">
                            <i class="fad fa-clipboard pr-2 title-icon"></i>
                            <span className="title-text">Thẻ ghi nhớ</span>
                        </Row>

                        <Row className="flex-column justify-content-center align-items-center py-5">
                            <Progress
                                type="circle"
                                percent={75}
                                format={() => "75/100"}
                            />
                            <span>Tiến độ</span>
                        </Row>

                        <Row className="px-2 pt-5">
                            <Button block className="my-2">
                                <span className="typical-text">
                                    Bắt đầu
                                </span>
                            </Button>
                            <Button block className="my-2">
                                <span className="typical-text">
                                    Xáo trộn thẻ
                                </span>
                            </Button>
                            <Button block className="my-2">
                                <span className="typical-text">
                                    Chơi game
                                </span>
                            </Button>
                        </Row>
                    </Col>


                    <Col xs={9} className="d-flex flex-column justify-content-center hide">
                        <Row>
                            {this.state.sets.map((ele, index) =>
                                <Slide direction="left" in={this.state.currentCard === index} mountOnEnter unmountOnExit>
                                    <Flippy
                                        flipOnHover={true} // default false
                                        flipOnClick={true} // default false
                                        flipDirection="horizontal" // horizontal or vertical
                                        ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                                        style={{ width: '800px', height: '500px' }} /// these are optional style, it is not necessary
                                    >
                                        <FrontSide
                                            style={{
                                                backgroundColor: '#fff',
                                            }}
                                            className="d-flex flex-column align-items-center justify-content-center px-0"
                                        >
                                            <Row>
                                                <span className="card-front">
                                                    {ele?.front}
                                                </span>
                                            </Row>
                                            <Row className="w-100 bg-dark text-white justify-content-center py-1 fixed-bottom">
                                                <span>Nhấn để xem định nghĩa 👆</span>
                                            </Row>
                                        </FrontSide>
                                        <BackSide
                                            style={{ backgroundColor: '#fff' }}
                                            className="d-flex flex-column align-items-center justify-content-center px-0"
                                        >
                                            <Row>
                                                <span className="card-back">
                                                    {ele?.back}
                                                </span>
                                            </Row>
                                            <Row className="w-100 bg-dark text-white justify-content-center py-1 fixed-bottom">
                                                <span>Nhấn để xem thuật ngữ 👆</span>
                                            </Row>
                                        </BackSide>
                                    </Flippy>
                                </Slide>
                            )}

                        </Row>
                        <Row className="navi-btn">
                            <Col md={5} className="offset-md-3 mt-3 d-flex justify-content-between align-items-center">
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    onClick={() => this.backCard()}
                                >
                                    <i class="far fa-angle-left"></i>
                                </Fab>
                                <Fab
                                    variant="extended"
                                    className="bg-success text-white"
                                    aria-label="remembered"
                                >
                                    <b><i class="far fa-check"></i> Đã nhớ</b>
                                </Fab>
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    onClick={() => this.forwardCard()}
                                >
                                    <i class="far fa-angle-right"></i>
                                </Fab>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </>
        )
    }
    forwardCard() {
        if (this.state.currentCard == (this.state.sets.length - 1)) {
            this.setState({
                currentCard: 0
            })
        } else {
            this.setState({
                currentCard: this.state.currentCard + 1
            })
        }
    }

    backCard() {
        if (this.state.currentCard == 0) {
            this.setState({
                currentCard: this.state.sets.length - 1
            })
        } else {
            this.setState({
                currentCard: this.state.currentCard - 1
            })
        }
    }
}

export default withRouter(Learn);
