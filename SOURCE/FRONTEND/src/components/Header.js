import React, { Component } from "react";
import "@styles/Header.css";
import { Col, Row, Button } from "react-bootstrap";
import { Modal, Form, Input, Checkbox, Avatar, Badge } from "antd";
import { Button as AntButton, Empty } from "antd";
import {
    UserOutlined,
    LockOutlined,
    FacebookOutlined,
    GoogleOutlined,
    MailOutlined,
    SearchOutlined,
    FolderAddOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import "animate.css";
import Cookie from "js-cookie";
import {
    IconButton,
    Popover,
    List,
    ListItem,
    Divider,
} from "@material-ui/core";
import { ROUTER } from "@constants/Constant";
import {
    requestRegister,
    requestLogin,
    requestLogout,
    requestSetInCart,
    requestBuy,
} from "@constants/Api";
import { connect } from "react-redux";
import { getUserInfo } from "@src/redux/actions";
import reactotron from "reactotron-react-js";
import NotifyContext from "@context/NotifyContext";
import Loading from "@components/Loading";

class Header extends Component {
    constructor(props) {
        super(props);
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
                username: "",
            },

            loginForm: {
                email: "",
                password: "",
            },
        };
    }

    static contextType = NotifyContext;

    componentDidMount() {
        if (Cookie.get("SESSION_ID")) {
            this.props.getUserInfo();
        }
        var cart = Cookie.get("CART");
        if (cart) {
            cart = cart.split("|");
        } else {
            cart = [];
        }
        this.setState({
            cartData: cart,
        });
    }

    pushRef(link, data) {
        this.props.history.push({
            pathname: link,
            state: { keyword: data },
        });
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
            </>
        );
    }

    renderHeader() {
        return (
            <>
                <Row>
                    <Col
                        xs={12}
                        className="header-wrapper d-flex align-items-center justify-content-between"
                    >
                        <Row className="w-100 align-items-center">
                            <Col
                                md={2}
                                className="logo pt-1 text-md-left text-center"
                            >
                                <Link to="">LET'S LEARN</Link>
                            </Col>

                            {this.renderUtilBar()}
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }

    renderUtilBar() {
        return (
            <>
                <Col md={4} xs={6} className="util-bar-col">
                    <Row className="d-flex flex-row justify-content-center align-items-center">
                        <Col className="util-bar">
                            <Input
                                size="large"
                                placeholder="Tìm kiếm"
                                prefix={<SearchOutlined />}
                                className="search-box"
                                autoFocus={true}
                                value={this.state.searchBox}
                                onChange={(event) =>
                                    this.onChangeSearch(event.target.value)
                                }
                                onKeyPress={(e) => this.handleSearchKeyPress(e)}
                            />
                        </Col>
                    </Row>
                </Col>

                {this.renderAuthenButton()}
            </>
        );
    }

    renderAuthenButton() {
        if (Cookie.get("SESSION_ID")) {
            const info = this.props.userState.data;

            return (
                <Col md={6} className="button">
                    <Row className="align-items-center justify-content-center justify-content-md-end">
                        <IconButton className="avatar-button">
                            <Avatar
                                style={{ background: "red" }}
                                onClick={(e) =>
                                    this.handlePopover(e, "popover", "anchorEl")
                                }
                                size="large"
                            >
                                <span className="text-uppercase">
                                    {info && info?.name?.charAt(0)}
                                </span>
                            </Avatar>
                        </IconButton>

                        <Popover
                            open={this.state.popover}
                            onClose={(e) =>
                                this.handlePopover(e, "popover", "anchorEl")
                            }
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            className="mt-3"
                        >
                            <List className="py-0" style={{ width: "150px" }}>
                                <ListItem
                                    button
                                    className="py-3"
                                    onClick={() => this.handleLogout()}
                                >
                                    <Row className="w-100">
                                        <Col xs={12} className="px-0">
                                            <b className="logout-text user-utils-text">
                                                Đăng xuất
                                            </b>
                                        </Col>
                                    </Row>
                                </ListItem>
                            </List>
                        </Popover>
                    </Row>
                </Col>
            );
        } else {
            return (
                <Col md={7} className="button">
                    <Row className="align-items-center justify-content-center justify-content-md-end">
                        <span
                            className="login-link font-weight-bold"
                            onClick={() => this.handleShow("loginModal", true)}
                        >
                            Đăng nhập
                        </span>
                        <Button
                            variant="info register-btn font-weight-bold"
                            onClick={() =>
                                this.handleShow("registerModal", true)
                            }
                        >
                            Đăng ký
                        </Button>
                    </Row>
                </Col>
            );
        }
    }

    handleSearchKeyPress = (e) => {
        if (e.key === "Enter") {
            this.pushRef(ROUTER.SEARCH, this.state.searchBox);
        }
    };

    handlePopover = (e, popover, anchor) => {
        reactotron.log(popover, anchor);
        this.setState({
            [popover]: !this.state[popover],
            [anchor]: e?.currentTarget || null,
        });
    };

    handleShow(modal, visible) {
        this.setState({
            [modal]: visible,
        });
    }

    onChangeSearch = (value) => {
        this.setState({
            searchBox: value,
        });
    };

    onChangeRegister = (field, value) => {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                [field]: value,
            },
        });
    };

    onChangeLogin = (field, value) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [field]: value,
            },
        });
    };

    handleLogout = async () => {
        this.setState({
            popover: false,
            anchorEl: null,
            loading: true,
        });
        await requestLogout();
        this.setState({ loading: false });
        Cookie.remove("SESSION_ID");
        Cookie.remove("CART");
        this.props.history.push("/");
        this.context("success", "Thành công", "Đăng xuất thành công.");
    };

    handleLogin = async () => {
        this.setState({ loginLoading: true });
        let { loginForm } = this.state;
        try {
            let res = await requestLogin({ ...loginForm });
            Cookie.set("SESSION_ID", res.data.remember_token);
            this.setState({
                loginModal: false,
            });
            this.props.getUserInfo();
            this.props.history.push(ROUTER.USER_HOME);
            this.setState({ loginLoading: false });
        } catch (e) {
            this.setState({ loginLoading: false });
            reactotron.log("err login", e);
            this.context("error", "Đăng nhập thất bại.", e?.msg);
        }
    };

    handleRegister = async () => {
        this.setState({ registerLoading: true });
        let { registerForm } = this.state;
        try {
            let res = await requestRegister({
                ...registerForm,
                repassword: this.state.registerForm.password,
            });
            this.setState({
                registerModal: false,
            });
            this.setState({ registerLoading: false });
            this.context(
                "success",
                "Thành công",
                "Đăng kí tài khoản thành công."
            );
        } catch (e) {
            this.setState({ registerLoading: false });
            reactotron.log("err register", e, registerForm);
            this.context("error", "Thất bại", "Đăng kí tài khoản thất bại.");
        }
    };

    renderLoginModal() {
        const { loginForm } = this.state;
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
                                    message: "Vui lòng nhập email!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Tên người dùng"
                                className="login-input"
                                value={loginForm.email}
                                onChange={(event) =>
                                    this.onChangeLogin(
                                        "email",
                                        event.target.value
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Mật khẩu"
                                className="login-input"
                                value={loginForm.password}
                                onChange={(event) =>
                                    this.onChangeLogin(
                                        "password",
                                        event.target.value
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item className="login-option">
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot">Quên mật khẩu?</a>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }

    renderRegisterModal() {
        const { registerForm } = this.state;
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
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập username!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Tên người dùng"
                                className="login-input"
                                value={registerForm.username}
                                onChange={(event) =>
                                    this.onChangeRegister(
                                        "username",
                                        event.target.value
                                    )
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <MailOutlined className="site-form-item-icon" />
                                }
                                placeholder="Email"
                                className="login-input"
                                value={registerForm.email}
                                onChange={(event) =>
                                    this.onChangeRegister(
                                        "email",
                                        event.target.value
                                    )
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Mật khẩu"
                                className="login-input"
                                value={registerForm.password}
                                onChange={(event) =>
                                    this.onChangeRegister(
                                        "password",
                                        event.target.value
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            // noStyle
                            className="text-left"
                        >
                            <Checkbox>
                                Tôi chấp nhận{" "}
                                <span className="text-info">
                                    Điều khoản dịch vụ
                                </span>{" "}
                                và{" "}
                                <span className="text-info">
                                    chính sách quyền riêng tư
                                </span>
                            </Checkbox>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }

    hideSearchBox() {
        this.setState({ searchBoxGo: true });
        setTimeout(
            () => this.setState({ showSearchBox: false, searchBoxGo: false }),
            500
        );
    }
}

const mapStateToProps = (state) => ({
    userState: state.userReducer,
});

const mapDispatchToProps = {
    getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
