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

                    {this.renderPage1()}

                    {this.renderPage2()}
                </div>
            </>
        )
    }

    renderPage1() {
        return (
            <Row className="w-100 page-1">
                <Col md={6} className="left-part">
                    <Row className="target pb-5 mt-5">
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

                    <Row className="role-check mb-5">
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
                            <img src={require("@src/assets/banner_01.png")} className="w-100" />
                        </div>
                        <div className="slide">
                            <img src={require("@src/assets/banner_02.png")} className="w-100" />
                        </div>
                        <div className="slide">
                            <img src={require("@src/assets/banner_03.png")} className="w-100" />
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
                        <div>
                            <h3 className="floating-text">Những học sinh tự nhủ "Mình có thể nhận được điểm cao hơn 10 không nhỉ?"</h3>
                        </div>
                        <div>
                            <h3 className="floating-text">Những học sinh tự nhủ "Giờ mình càng chăm học, thì càng thoải mái tận hưởng kỳ nghỉ."</h3>
                        </div>
                        <div>
                            <h3 className="floating-text">Những học sinh tự nhủ "Đêm nay, mình sẽ làm xong bài tập để cuối tuần có thể đi chơi."</h3>
                        </div>
                    </Carousel>
                </Col>
            </Row>
        )
    }

    renderPage2() {
        return (
            <Row className="page-2 w-100">
                <Col xs={12} className="my-5 py-5">
                    <Row className="title my-5">
                        <p className="text-center w-100"><em>90%</em>người dùng Quizlet cho biết họ đã cải thiện được điểm số</p>
                    </Row>
                </Col>
                <Col xs={12} className="px-5 home-element">
                    <Row>
                        <Col md={6} className="text">
                            <p className="title">Bạn chỉ cần động não, còn mọi thứ khác đã có chúng tôi lo.</p>
                            <p className="content">Từ các thẻ ghi nhớ giúp bạn học tiếng Anh,
                            đến các trò chơi giúp học lịch sử dễ dàng,
                            bạn có thể sử dụng nhiều loại công cụ để chinh phục mọi thử thách.
                            </p>
                        </Col>
                        <Col md={6} className="picture">
                            <img src={require("@assets/effective.png")} className="w-100"></img>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} className="mt-1 home-element">
                    <Row>
                        <Col md={6} className="picture">
                            <img src={require("@assets/success.png")} className="w-100"></img>
                        </Col>
                        <Col md={6} className="text">
                            <p className="title">Thành công tiếp theo của bạn đang ở rất gần rồi.</p>
                            <p className="content">Mỗi kiến thức mới bạn học là một thành tích.
                            Quizlet chia nhỏ các chủ đề và môn học để bạn tiến bộ từng ngày.
                            </p>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} className="mb-5 pb-5 home-element">
                    <Row>
                        <Col md={6} className="text">
                            <p className="title">Đừng nản lòng. Cùng nỗ lực nào.</p>
                            <p className="content">Khi một bài học nhỏ nhất cũng mang lại cảm giác chiến thắng,
                            bạn sẽ có thêm động lực tiếp bước.
                            </p>
                        </Col>
                        <Col md={6} className="picture">
                            <img src={require("@assets/try.png")} className="w-100"></img>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}


export default HomeScreen