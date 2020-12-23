import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Row, Col } from "react-bootstrap"
import "@styles/learn.css"
import { Divider, Fab } from "@material-ui/core"
import { Progress, Button } from 'antd';
class Learn extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Row className="h-100 learn">
                    <Col xs={2} className="float-div ml-3 px-0">
                        <Row className="align-items-baseline py-3">
                            <i class="far fa-chevron-left pl-4 pr-2 typical-text back-icon"></i>
                            <span className="back-btn cursor">
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
                                    Tùy chọn
                                </span>
                            </Button>
                        </Row>
                    </Col>


                    <Col xs={9} className="d-flex flex-column justify-content-center">
                        <Row>
                            <Flippy
                                flipOnHover={false} // default false
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
                                            Environment
                                    </span>
                                    </Row>
                                    <Row className="w-100 bg-dark text-white justify-content-center py-1 fixed-bottom">
                                        Nhấn để xem định nghĩa 👆
                                </Row>
                                </FrontSide>
                                <BackSide
                                    style={{ backgroundColor: '#fff' }}
                                    className="d-flex flex-column align-items-center justify-content-center px-0"
                                >
                                    <Row>
                                        <span className="card-back">
                                            Môi trường, hoàn cảnh, những vật xung quanh
                                    </span>
                                    </Row>
                                    <Row className="w-100 bg-dark text-white justify-content-center py-1 fixed-bottom">
                                        Nhấn để xem thuật ngữ 👆
                                </Row>
                                </BackSide>
                            </Flippy>
                        </Row>
                        <Row>
                            <Col md={5} className="offset-md-3 mt-3 d-flex justify-content-between">
                                <Fab color="primary" aria-label="add">
                                    <i class="far fa-angle-left"></i>
                                </Fab>
                                <Fab color="primary" aria-label="add">
                                    <i class="far fa-angle-right"></i>
                                </Fab>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </>
        )
    }
}

export default Learn;
