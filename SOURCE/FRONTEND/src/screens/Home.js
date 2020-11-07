import React, {
    Component
} from 'react';
import {
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import "@styles/Home.css"
import { Link } from "react-router-dom"
import { Carousel } from "antd";


class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <Row className="w-100 page-1">
                        <Col md={6} className="left-part">
                            <Row className="target pb-5 mt-5 mt-md-0">
                                <Col md={7} sm={12} className="offset-0 offset-md-2">
                                    <span>Trở thành phiên bản xuất sắc nhất của chính bạn</span>
                                </Col>
                            </Row>

                            <Row className="action pb-5">
                                <Col md={7} sm={12} className="offset-0 offset-md-2">
                                    <span>
                                        Nắm vững mọi môn học, từng bước một
                                    </span>
                                </Col>
                            </Row>
                            <Row className="pb-5">
                                <Col md={7} sm={12} className="offset-0 offset-md-2">
                                    <Button
                                        variant="info"
                                        className="learn-now-btn"
                                    >
                                        Bắt đầu học
                                    </Button>
                                </Col>
                            </Row>

                            <Row className="role-check mb-5 mb-md-0">
                                <Col
                                    md={3}
                                    xs={6}
                                    className="offset-0 offset-md-2 pr-0"
                                >
                                    <Link>Tôi là giáo viên</Link>
                                </Col>
                                <Col
                                    md={4}
                                    xs={6}
                                    className="offset-0 offset-md-2 px-0"
                                >
                                    <Link>Tôi là phụ huynh</Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className="right-part px-0">
                            <Carousel
                                effect="fade"
                                dotPosition="right"
                                autoplay={true}
                                className="w-100"
                            >
                                <div className="slide">
                                    <img src={require("@src/assets/banner_01.png")}  className="w-100"/>
                                </div>
                                <div className="slide">
                                    <img src={require("@src/assets/banner_02.png")}  className="w-100"/>
                                </div>
                                <div className="slide">
                                    <img src={require("@src/assets/banner_03.png")}  className="w-100"/>
                                </div>
                            </Carousel>
                            <p className="target-student mt-3 mb-0">
                                QUIZLET DÀNH CHO CÁC ĐỐI TƯỢNG HỌC SINH SAU
                            </p>
                            <Carousel
                                dotPosition="right"
                                autoplay={true}
                                className="mt-1"
                            >
                                {/* <div className="floating-text-div"> */}
                                    <span className="floating-text">Những học sinh tự nhủ "Mình có thể nhận được điểm cao hơn 10 không nhỉ?"</span>
                                {/* </div> */}
                                {/* <div className="floating-text-div"> */}
                                    <span className="floating-text">Những học sinh tự nhủ "Giờ mình càng chăm học, thì càng thoải mái tận hưởng kỳ nghỉ."</span>
                                {/* </div> */}
                                {/* <div className="floating-text-div"> */}
                                    <span className="floating-text">Những học sinh tự nhủ "Đêm nay, mình sẽ làm xong bài tập để cuối tuần có thể đi chơi."</span>
                                {/* </div> */}
                            </Carousel>
                        </Col>
                    </Row>

                    <Row className="page-2 w-100 h-100">

                    </Row>
                </div>
            </>
        )
    }

}


export default HomeScreen