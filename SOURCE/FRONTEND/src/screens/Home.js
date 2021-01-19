import React, {
    Component
} from 'react';
import {
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import CarouselBootstrap from 'react-bootstrap/Carousel'
import "@styles/Home.css"
import { Link, Redirect } from "react-router-dom"
import {ROUTER} from "@constants/Constant"
import { Carousel, Select } from "antd";
import Divider from '@material-ui/core/Divider';
import {
    YoutubeOutlined,
    FacebookFilled,
    TwitterOutlined,
    InstagramOutlined
} from '@ant-design/icons';
import Cookie from "js-cookie"

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const check = Cookie.get("SESSION_ID") ? true : false

        if (check) {
            return(
                <Redirect to={ROUTER.USER_HOME}/>
            )
        } else {
            return (
                <>
                    <div className="wrap">

                        {this.renderPage1()}

                        {this.renderPage2()}

                        {this.renderFooter()}
                    </div>
                </>
            )
        }
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
                    <CarouselBootstrap
                        indicators={false}
                        controls={false}
                        keyboard={false}
                        fade={true}
                    >
                        <CarouselBootstrap.Item interval={3000}>
                            <img src={require("@src/assets/banner_01.png")} className="w-100" alt="anh-slide" />
                        </CarouselBootstrap.Item>
                        <CarouselBootstrap.Item interval={3000}>
                            <img src={require("@src/assets/banner_02.png")} className="w-100" alt="anh-slide" />
                        </CarouselBootstrap.Item>
                        <CarouselBootstrap.Item interval={3000}>
                            <img src={require("@src/assets/banner_03.png")} className="w-100" alt="anh-slide" />
                        </CarouselBootstrap.Item>
                    </CarouselBootstrap>
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
                            <img src={require("@assets/effective.png")} className="w-100" alt="anh minh hoa"></img>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} className="mt-1 home-element">
                    <Row>
                        <Col md={6} className="picture">
                            <img src={require("@assets/success.png")} className="w-100" alt="anh minh hoa"></img>
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
                            <img src={require("@assets/try.png")} className="w-100" alt="anh minh hoa"></img>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} className="home-element my-3">
                    <CarouselBootstrap
                        indicators={false}
                        controls={false}
                        keyboard={false}
                    >
                        <CarouselBootstrap.Item interval={5000}>
                            <h3 className="user-review">Tôi phát hiện ra Quizlet hồi mới 12 tuổi.
                            Nó đã giúp tôi cải thiện điểm số rất nhiều.
                            Cảm ơn Quizlet đã giúp cho việc học trở nên vui vẻ và hiệu quả!
                            </h3>
                            <p className="user-info">-Nguyễn Tài Thao, 21 tuổi</p>
                        </CarouselBootstrap.Item>
                        <CarouselBootstrap.Item interval={5000}>
                            <h3 className="user-review">Quizlet là một phương pháp học tuyệt vời.
                            Tôi đã giới thiệu nó cho bạn bè và tất cả chúng tôi đang tiến bộ.
                            Bất cứ khi nào nghĩ về Quizlet,
                            tôi lại thấy niềm vui khi học trong vài phút thay vì nhiều giờ.
                            </h3>
                            <p className="user-info">-Trần Đức Trung, 22 tuổi</p>
                        </CarouselBootstrap.Item>
                        <CarouselBootstrap.Item interval={5000}>
                            <h3 className="user-review">Trước đây, khi nói đến việc học, tôi dở vô cùng.
                            Bây giờ tôi đang ở một trường đại học mới và họ giới thiệu tôi với Quizlet.
                            Tôi không còn căng thẳng mỗi khi học và làm bài tập nữa. CẢM ƠN QUIZLET!!!
                            </h3>
                            <p className="user-info">-Phạm Tuấn Dũng, 18 tuổi</p>
                        </CarouselBootstrap.Item>
                    </CarouselBootstrap>
                </Col>

                <Col xs={12} className="text-center confirm-div">
                    <h3 className="question">Bạn đã sẵn sàng cải thiện điểm số?</h3>
                    <Button
                        variant="info"
                        className="learn-now-btn"
                    >
                        Bắt đầu học
                    </Button>
                </Col>

                <Col xs={12} className="teacher-div">
                    <Row>
                        <Col md={6} className="left">
                            <p className="teacher">GIÁO VIÊN</p>
                            <p className="role">Truyền năng lượng cho học sinh của bạn</p>
                            <p className="target">Giúp các em tự tin học bất cứ nội dung nào,
                            dù cho mục tiêu phấn đấu có là gì đi nữa. Sử dụng các học phần miễn phí,
                            chế độ học và trò chơi trong lớp của Quizlet,
                            bạn có thể dễ dàng khích lệ học sinh của mình.
                            </p>
                            <Link className="link">Mang Quizlet đến lớp của bạn</Link>
                        </Col>
                        <Col md={6} className="px-0 right">
                            <img src={require("@src/assets/teacher.png")} className="w-100" alt="anh-slide" />
                        </Col>
                    </Row>
                </Col>
            </Row >
        )
    }
    renderFooter() {
        return (
            <>
                <Row className="footer">
                    <Col md={2} xs={6} className="offset-md-1">
                        <Row className="title">
                            <b>Chủ đề</b>
                        </Row>
                        <Row>
                            <ul>
                                <li>
                                    <Link>Khoa học</Link>
                                </li>
                                <li>
                                    <Link>Khoa học xã hội</Link>
                                </li>
                                <li>
                                    <Link>Khác</Link>
                                </li>
                                <li>
                                    <Link>Nghệ thuật nhân văn</Link>
                                </li>
                                <li>
                                    <Link>Toán học</Link>
                                </li>
                                <li>
                                    <Link>Ngôn ngữ</Link>
                                </li>
                            </ul>
                        </Row>
                    </Col>
                    <Col md={2} xs={6}>
                        <Row className="title">
                            <b>Tính năng</b>
                        </Row>
                        <Row>
                            <ul>
                                <li>
                                    <Link>Quizlet Live</Link>
                                </li>
                                <li>
                                    <Link>Chế độ học</Link>
                                </li>
                                <li>
                                    <Link>Sơ đồ</Link>
                                </li>
                                <li>
                                    <Link>Thẻ ghi nhớ</Link>
                                </li>
                                <li>
                                    <Link>Ứng dụng</Link>
                                </li>
                            </ul>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Row className="title">
                            <b>Hỗ trợ</b>
                        </Row>
                        <Row>
                            <ul>
                                <li>
                                    <Link>Đăng kí</Link>
                                </li>
                                <li>
                                    <Link>Trung tâm hỗ trợ</Link>
                                </li>
                                <li>
                                    <Link>Quy tắc danh dự</Link>
                                </li>
                                <li>
                                    <Link>Nguyễn tắc cộng đồng</Link>
                                </li>
                                <li>
                                    <Link>Giác viên</Link>
                                </li>
                            </ul>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Row className="title">
                            <b>Giới thiệu</b>
                        </Row>
                        <Row>
                            <ul>
                                <li>
                                    <Link>Công ty</Link>
                                </li>
                                <li>
                                    <Link>Blog</Link>
                                </li>
                                <li>
                                    <Link>Báo chí</Link>
                                </li>
                                <li>
                                    <Link>Tuyển dụng</Link>
                                </li>
                                <li>
                                    <Link>Quảng cáo</Link>
                                </li>
                                <li>
                                    <Link>Quyền riêng tư</Link>
                                </li>
                                <li>
                                    <Link>Chính sách quảng cáo và cookie</Link>
                                </li>
                                <li>
                                    <Link>điều khoản dịch vụ</Link>
                                </li>
                            </ul>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Row className="title">
                            <b>Ngôn ngữ</b>
                        </Row>
                        <Row>
                            <Select defaultValue="vi" className="w-100 lang-select">
                                <Select.Option value="vi">Tiếng Việt</Select.Option>
                                <Select.Option value="en">English</Select.Option>
                                <Select.Option value="ja">日本語</Select.Option>
                            </Select>
                        </Row>
                    </Col>
                    <Col xs={10} className="offset-1 divider">
                        <Divider />
                    </Col>
                    <Col xs={10} className="offset-1 contact">
                        <Row>
                            <Col md={6} className="left px-0">
                                <Link>
                                    <FacebookFilled className="contact-icon" />
                                </Link>
                                <Link>
                                    <YoutubeOutlined className="contact-icon" />
                                </Link>
                                <Link>
                                    <TwitterOutlined className="contact-icon" />
                                </Link>
                                <Link>
                                    <InstagramOutlined className="contact-icon contact-icon-last" />
                                </Link>
                            </Col>
                            <Col md={6} className="right px-0">
                                <span className="copyright">© 2020 Quizlet Inc.</span>
                            </Col>
                        </Row>
                    </Col>
                    <div style={{ width: "100%", height: "100px" }}></div>
                </Row>
            </>
        )
    }
    
}

