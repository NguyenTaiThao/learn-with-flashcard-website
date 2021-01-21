import React, { Component } from 'react'
import "@styles/Header.css"
import { Col, Row, Button } from 'react-bootstrap'
import { Modal, Form, Input, Checkbox, Avatar, Badge } from 'antd'
import { Button as AntButton } from 'antd'
import {
    UserOutlined,
    LockOutlined,
    FacebookOutlined,
    GoogleOutlined,
    MailOutlined,
    SearchOutlined,
    FolderAddOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons'
import { Link, withRouter } from "react-router-dom"
import "animate.css"
import Cookie from 'js-cookie'
import { IconButton, Popover, List, ListItem, Divider } from '@material-ui/core';
import { ROUTER } from "@constants/Constant"
import { requestRegister, requestLogin, requestLogout, requestSetInCart, requestBuy } from "@constants/Api"
import { connect } from "react-redux";
import { getUserInfo } from "@src/redux/actions";
import reactotron from "reactotron-react-js"
import NotifyContext from "@context/NotifyContext"
import _ from "lodash"
import Loading from "@components/Loading"
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginModal: false,
            registerModal: false,
            cartModal: false,
            cartData: [],
            cartDataDetail: [],
            showSearchBox: false,
            popover: false,
            notifyPopover: false,
            anchorEl: null,
            notifyAnchorEl: null,
            loginLoading: false,
            registerLoading: false,
            loading: false,
            searchBox: "",
            registerForm: {
                email: "",
                password: "",
                repassword: "",
                username: ""
            },

            loginForm: {
                email: "",
                password: ""
            }
        }
    }

    static contextType = NotifyContext

    componentDidMount() {
        if (Cookie.get("SESSION_ID")) {
            this.props.getUserInfo()
        }
        var cart = (Cookie.get("CART"))
        if (cart) {
            cart = cart.split("|")
        } else {
            cart = []
        }
        this.setState({
            cartData: cart
        })
    }

    pushRef(link, data) {
        this.props.history.push({
            pathname: link,
            state: { keyword: data }
        })
    }

    render() {
        return (
            <>
                <Loading open={this.state.loading} />
                {/* hiển thị header */}
                {this.renderHeader()}

                {/* hiện thị Modal đăng ký */}
                {this.renderRegisterModal()}

                {/* hiển thị Modal đăng nhập */}
                {this.renderLoginModal()}

                {this.renderCartModal()}
            </>
        )
    }

    renderHeader() {
        return (
            <>
                <Row>
                    <Col xs={12} className="header-wrapper d-flex align-items-center justify-content-between">
                        <Row className="w-100 align-items-center">
                            <Col md={2} className="logo pt-1 text-md-left text-center">
                                <Link to="">
                                    LET'S LEARN
                                </Link>
                            </Col>

                            {this.state.showSearchBox ? this.renderSearchBox() : this.renderUtilBar()}
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }

    renderUtilBar() {
        return (
            <>
                <Col md={3} xs={6} className="util-bar-col">
                    <Row>
                        <Col className="util-bar">
                            <Link
                                onClick={() => this.setState({ showSearchBox: true })}
                            >
                                <SearchOutlined className="mr-1" />
                                <span className="font-weight-bold">Tìm kiếm</span>
                            </Link>
                        </Col>
                        <span className="text-black-50">|</span>
                        <Col className="util-bar">
                            <Link onClick={() => this.props.history.push(ROUTER.CREATE_SET)}>
                                <FolderAddOutlined className="mr-1" />
                                <span className="font-weight-bold">Tạo mới</span>
                            </Link>
                        </Col>
                    </Row>
                </Col>

                {this.renderAuthenButton()}
            </>
        )
    }

    renderAuthenButton() {
        if (Cookie.get("SESSION_ID")) {
            const info = this.props.userState.data

            return (
                <Col md={7} className="button">
                    <Row className="align-items-center justify-content-center justify-content-md-end">
                        <IconButton
                            className="mr-1"
                            onClick={(e) => this.handlePopover(e, "notifyPopover", "notifyAnchorEl")}
                        >
                            <Badge
                                count={4}
                            >
                                <i
                                    className="fas fa-bell text-white"
                                    style={{ fontSize: "20px" }}
                                ></i>
                            </Badge>
                        </IconButton>

                        <IconButton
                            className="mr-1"
                            onClick={() => this.handleShow("cartModal", true)}
                        >
                            <Badge
                                count={this.state?.cartData?.length || 0}
                                style={{ backgroundColor: '#52c41a' }}
                            >
                                <i
                                    className="fas fa-shopping-cart text-white"
                                    style={{ fontSize: "20px" }}
                                ></i>
                            </Badge>
                        </IconButton>
                        <IconButton
                            className="avatar-button"
                        >
                            <Avatar
                                style={{ "background": "red" }}
                                onClick={(e) => this.handlePopover(e, "popover", "anchorEl")}
                                size="large"
                            >
                                <span className="text-uppercase">{info && info?.name?.charAt(0)}</span>
                            </Avatar>
                        </IconButton>

                        <Popover
                            open={this.state.popover}
                            onClose={(e) => this.handlePopover(e, "popover", "anchorEl")}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            className="mt-3"
                        >
                            <Row
                                className="py-4"
                                style={{
                                    width: "250px"
                                }}
                            >
                                <Col xs={4}>
                                    <Avatar
                                        style={{ "background": "red" }}
                                        size={50}
                                    >
                                        <span className="text-uppercase">{info && info?.name?.charAt(0)}</span>
                                    </Avatar>
                                </Col>
                                <Col xs={8} className="pl-2">
                                    <Row>
                                        <b>{info && info?.name}</b>
                                    </Row>
                                    <Row>
                                        <Link
                                            onClick={() => this.props.history.push(ROUTER.SET)}
                                        >
                                            Xem hồ sơ
                                        </Link>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider />
                            <List className="py-0">
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i className="far fa-cog user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="user-utils-text">Cài đặt</b>
                                        </Col>
                                    </Row>
                                </ListItem>
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i className="far fa-comment-alt user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="user-utils-text">Trung tâm hỗ trợ</b>
                                        </Col>
                                    </Row>
                                </ListItem>
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i className="fas fa-shield-alt user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="user-utils-text">Quyền riêng tư</b>
                                        </Col>
                                    </Row>
                                </ListItem>

                                <Divider />

                                <ListItem
                                    button
                                    className="py-4"
                                    onClick={() => this.handleLogout()}
                                >
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i className="fas fa-sign-out-alt user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="logout-text user-utils-text">Đăng xuất</b>
                                        </Col>
                                    </Row>
                                </ListItem>
                            </List>
                        </Popover>

                        <Popover
                            open={this.state.notifyPopover}
                            onClose={(e) => this.handlePopover(e, "notifyPopover", "notifyAnchorEl")}
                            anchorEl={this.state.notifyAnchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            className="mt-3"
                        >
                            <List className="py-0">
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i className="far fa-cog user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="user-utils-text">Cài đặt</b>
                                        </Col>
                                    </Row>
                                </ListItem>
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i className="far fa-comment-alt user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="user-utils-text">Trung tâm hỗ trợ</b>
                                        </Col>
                                    </Row>
                                </ListItem>
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i className="fas fa-shield-alt user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="user-utils-text">Quyền riêng tư</b>
                                        </Col>
                                    </Row>
                                </ListItem>
                            </List>
                        </Popover>
                    </Row>
                </Col>
            )
        } else {
            return (
                <Col md={7} className="button">
                    <Row className="align-items-center justify-content-center justify-content-md-end">
                        <a
                            className="login-link font-weight-bold"
                            onClick={() => this.handleShow("loginModal", true)}
                        >
                            Đăng nhập
                        </a>
                        <Button
                            variant="info register-btn font-weight-bold"
                            onClick={() => this.handleShow("registerModal", true)}
                        >
                            Đăng ký
                        </Button>
                    </Row>
                </Col>
            )
        }
    }

    renderSearchBox() {
        return (
            <>
                <Col
                    md={10}
                    className={`animate__animated animate__fadeInDown ${this.state.searchBoxGo ? "animate__fadeOutUp" : null}`}
                >
                    <Row>
                        <Col md={11}>
                            <Input
                                size="large"
                                placeholder="Tìm kiếm"
                                prefix={<SearchOutlined />}
                                className="search-box"
                                autoFocus={true}
                                value={this.state.searchBox}
                                onChange={(event) => this.onChangeSearch(event.target.value)}
                                onKeyPress={(e) => this.handleSearchKeyPress(e)}
                            />
                        </Col>
                        <CloseCircleOutlined
                            style={{
                                fontSize: "35px",
                                color: "#fff"
                            }}
                            onClick={() => this.hideSearchBox()}
                        />
                    </Row>
                </Col>

            </>
        )
    }

    renderCartModal() {
        const cart = this.state.cartData
        const { cartDataDetail } = this.state
        return (
            <>
                <Modal
                    title="Giỏ hàng"
                    centered
                    keyboard={false}
                    maskClosable={false}
                    visible={this.state.cartModal}
                    onOk={() => this.handleShow("cartModal", false)}
                    onCancel={() => this.handleShow("cartModal", false)}
                    width={700}
                    footer={null}
                    bodyStyle={{ background: "#f6f7fb" }}
                >
                    <Row className="justify-content-center cart">
                        <Col className="">
                            {cartDataDetail?.sets?.length > 0 ? cartDataDetail?.sets?.map((e, index) =>
                                <Row className="align-items-center cart-item mb-2">
                                    <Col xs={1}>
                                        <span className="stt">#{index + 1}</span>
                                    </Col>
                                    <Col xs={9}>
                                        <Row>
                                            <span className="item">{e && e?.title}</span>
                                        </Row>
                                        <Row>
                                            <span className="price">${e && e?.price}</span>
                                        </Row>
                                    </Col>
                                    <Col xs={1} className="text-right">
                                        <i class="fad fa-heart icon-like cursor"></i>
                                    </Col>
                                    <Col xs={1} className="text-right">
                                        <i
                                            class="fad fa-times-circle icon-del cursor"
                                            onClick={() => this.removeCartItem(e?.id)}
                                        ></i>
                                    </Col>
                                </Row>
                            )
                                :
                                null
                            }
                        </Col>
                    </Row>

                    <Row className="m-2 pt-3">
                        <Col>
                            <Divider />
                        </Col>
                    </Row>

                    <Row className="payment">
                        <Col className="d-flex justify-content-between">
                            <span className="title">Tổng cộng:</span>
                            <span className="total">${cartDataDetail && cartDataDetail?.total_price}</span>
                        </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center">
                        <AntButton
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={() => this.buy()}
                            loading={this.state.cartLoading}
                        >
                            <span>Thanh toán</span>
                        </AntButton>
                    </Row>
                </Modal>
            </>
        )
    }

    buy = async () => {
        try {
            this.setState({
                cartLoading: true
            })

            await requestBuy({
                cart: this.state.cartData,
                total_price: this.state.cartDataDetail.total_price
            })

            this.setState({
                cartLoading: false,
                cartData: [],
                cartDataDetail: {},
            })
            Cookie.set("CART", "")
        } catch (err) {
            this.setState({
                cartLoading: false
            })
            this.context("error", "Thất bại", err.msg)
        }
    }

    removeCartItem = (id) => {
        var newCart = this.state.cartData.filter((e) => e != id)
        var newCartDetail = this.state.cartDataDetail?.sets?.filter((e) => e.id != id)
        this.setState({
            cartData: newCart,
            cartDataDetail: {
                ...this.state.cartDataDetail,
                sets: newCartDetail
            }
        }, () => {
            Cookie.set("CART", newCart.join("|"))
        }
        )

    }

    handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.pushRef(ROUTER.SEARCH, this.state.searchBox)
        }
    }

    handlePopover = (e, popover, anchor) => {
        reactotron.log(popover, anchor)
        this.setState({
            [popover]: !this.state[popover],
            [anchor]: e?.currentTarget || null,
        })
    }

    handleShow(modal, visible) {
        if (modal == "cartModal" && visible) {
            var cart = (Cookie.get("CART"))
            if (cart) {
                cart = cart.split("|")
            } else {
                cart = []
            }
            this.getCartData()
            this.setState({
                [modal]: visible,
                cartData: cart
            })
        } else {
            this.setState({
                [modal]: visible
            })
        }
    }

    getCartData = async () => {
        if (this.state.cartData.length > 0) {
            try {
                this.setState({
                    cartLoading: true
                })
                const res = await requestSetInCart(this.state.cartData)
                this.setState({
                    cartLoading: false,
                    cartDataDetail: res.data
                })
            } catch (err) {
                this.setState({
                    cartLoading: false
                })
                this.context("error", "Thất bại", err.msg)
            }
        }
    }

    onChangeSearch = (value) => {
        this.setState({
            searchBox: value
        })
    }

    onChangeRegister = (field, value) => {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                [field]: value
            }
        })
    }

    onChangeLogin = (field, value) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [field]: value
            }
        })
    }

    handleLogout = async () => {
        this.setState({
            popover: false,
            anchorEl: null,
            loading: true
        })
        await requestLogout()
        this.setState({ loading: false })
        Cookie.remove("SESSION_ID")
        Cookie.remove("CART")
        this.props.history.push("/")
        this.context("success", "Thành công", "Đăng xuất thành công.")
    }

    handleLogin = async () => {
        this.setState({ loginLoading: true })
        let { loginForm } = this.state
        try {
            let res = await requestLogin({ ...loginForm });
            Cookie.set("SESSION_ID", res.data.remember_token)
            this.setState({
                loginModal: false
            })
            this.props.getUserInfo();
            this.props.history.push(ROUTER.USER_HOME)
            this.setState({ loginLoading: false })
        } catch (e) {
            this.setState({ loginLoading: false })
            reactotron.log("err login", e)
            this.context("error", "Đăng nhập thất bại.", e?.msg)
        }

    }

    handleRegister = async () => {
        this.setState({ registerLoading: true })
        let { registerForm } = this.state
        try {
            let res = await requestRegister({ ...registerForm, repassword: this.state.registerForm.password });
            this.setState({
                registerModal: false
            })
            this.setState({ registerLoading: false })
            this.context("success", "Thành công", "Đăng kí tài khoản thành công.")
        } catch (e) {
            this.setState({ registerLoading: false })
            reactotron.log("err register", e, registerForm)
            this.context("error", "Thất bại", "Đăng kí tài khoản thất bại.")
        }
    }

    renderLoginModal() {
        const { loginForm } = this.state
        return (
            <>
                <Modal
                    title="Đăng nhập"
                    visible={this.state.loginModal}
                    confirmLoading={this.state.loginLoading}
                    okText="Đăng nhập"
                    cancelText="Hủy bỏ"
                    onOk={this.handleLogin}
                    onCancel={() => this.handleShow("loginModal", false)}
                >
                    <Button
                        variant="outline-primary"
                        className="w-100 mb-4"
                    >
                        <Row className="align-items-center justify-content-center">
                            <FacebookOutlined
                                className="mr-1"
                                style={{
                                    fontSize: "25px",
                                }}
                            />
                            <b>Đăng nhập với Facebook</b>
                        </Row>
                    </Button>

                    <Button
                        variant="outline-danger"
                        className="w-100 mb-4"
                    >
                        <Row className="align-items-center justify-content-center">
                            <GoogleOutlined
                                className="mr-1"
                                style={{
                                    fontSize: "25px",
                                }}
                            />
                            <b>Đăng nhập với Google</b>
                        </Row>
                    </Button>

                    <div className="text-center mb-4 or-option">
                        <b>HOẶC EMAIL</b>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Tên người dùng"
                                className="login-input"
                                value={loginForm.email}
                                onChange={(event) => this.onChangeLogin("email", event.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Mật khẩu"
                                className="login-input"
                                value={loginForm.password}
                                onChange={(event) => this.onChangeLogin("password", event.target.value)}
                            />
                        </Form.Item>
                        <Form.Item className="login-option">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot">
                                Quên mật khẩu?
                            </a>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }

    renderRegisterModal() {
        const { registerForm } = this.state
        return (
            <>
                <Modal
                    title="Đăng ký"
                    visible={this.state.registerModal}
                    confirmLoading={this.state.registerLoading}
                    okText="Đăng ký"
                    onOk={this.handleRegister}
                    onCancel={() => this.handleShow("registerModal", false)}
                >
                    <Row className="mb-4">
                        <Col md={6} className="px-0 mb-4 mb-md-0">
                            <Button
                                variant="outline-primary"
                                className="w-100  mr-md-1"
                            >
                                <Row className="align-items-center justify-content-center">
                                    <FacebookOutlined
                                        className="mr-1"
                                        style={{
                                            fontSize: "25px",
                                        }}
                                    />
                                    <b>Tiếp tục với Facebook</b>
                                </Row>
                            </Button>
                        </Col>

                        <Col md={6} className="px-0">
                            <Button
                                variant="outline-danger"
                                className="w-100 ml-md-1"
                            >
                                <Row className="align-items-center justify-content-center">
                                    <GoogleOutlined
                                        className="mr-1"
                                        style={{
                                            fontSize: "25px",
                                        }}
                                    />
                                    <b>Tiếp tục với Google</b>
                                </Row>
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col className="px-0">
                            <hr className="form-splitter"></hr>
                        </Col>
                        <Col className="text-center px-0 or-option"><b>HOẶC EMAIL</b></Col>
                        <Col className="px-0">
                            <hr className="form-splitter"></hr>
                        </Col>
                    </Row>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    // onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập username!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Tên người dùng"
                                className="login-input"
                                value={registerForm.username}
                                onChange={(event) => this.onChangeRegister("username", event.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                                className="login-input"
                                value={registerForm.email}
                                onChange={(event) => this.onChangeRegister("email", event.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Mật khẩu"
                                className="login-input"
                                value={registerForm.password}
                                onChange={(event) => this.onChangeRegister("password", event.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            // noStyle
                            className="text-left"
                        >
                            <Checkbox>Tôi chấp nhận <span className="text-info">Điều khoản dịch vụ</span> và <span className="text-info">chính sách quyền riêng tư</span></Checkbox>
                        </Form.Item>
                    </Form>

                </Modal>
            </>
        )
    }

    hideSearchBox() {
        this.setState({ searchBoxGo: true })
        setTimeout(
            () => this.setState({ showSearchBox: false, searchBoxGo: false }),
            500
        )
    }
}

const mapStateToProps = (state) => ({
    userState: state.userReducer,
});

const mapDispatchToProps = {
    getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))