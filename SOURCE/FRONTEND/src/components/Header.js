import React, { Component } from 'react'
import "@styles/Header.css"
import { Col, Row, Button } from 'react-bootstrap'
import { Modal, Form, Input, Checkbox, Avatar } from 'antd'
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
import { IconButton, Popover, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginModal: false,
            registerModal: false,
            showSearchBox: false,
            popover: false,
            anchorEl: null,
        }
    }

    handleShow(modal, visible) {
        this.setState({
            [modal]: visible
        })
    }

    render() {
        return (
            <>
                {/* hiển thị header */}
                {this.renderHeader()}

                {/* hiện thị Modal đăng ký */}
                {this.renderRegisterModal()}

                {/* hiển thị Modal đăng nhập */}
                {this.renderLoginModal()}
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
                            <Link>
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

    handlePopover = (e) => {
        this.setState({
            popover: !this.state.popover,
            anchorEl: e?.currentTarget || null,
        })
    }

    renderAuthenButton() {
        if (Cookie.get("SESSION_ID")) {
            return (
                <Col md={7} className="button">
                    <Row className="align-items-center justify-content-center justify-content-md-end">
                        <IconButton
                            className="avatar-button"
                        >
                            <Avatar
                                style={{ "background": "orange" }}
                                onClick={(e) => this.handlePopover(e)}
                                size="large"
                            >
                                T
                            </Avatar>
                        </IconButton>
                        <Popover
                            open={this.state.popover}
                            onClose={(e) => this.handlePopover(e)}
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
                            <Row className="py-4">
                                <Col xs={3}>
                                    <Avatar
                                        style={{ "background": "orange" }}
                                        size={50}
                                    >
                                        T
                                    </Avatar>
                                </Col>
                                <Col xs={9}>
                                    <Row>
                                        <b>Nguyen Tai Thao</b>
                                    </Row>
                                    <Row>
                                        <Link>Xem hồ sơ</Link>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider />
                            <List className="py-0">
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i class="far fa-cog user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="user-utils-text">Cài đặt</b>
                                        </Col>
                                    </Row>
                                </ListItem>
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i class="far fa-comment-alt user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="user-utils-text">Trung tâm hỗ trợ</b>
                                        </Col>
                                    </Row>
                                </ListItem>
                                <ListItem button className="py-3">
                                    <Row className="w-100">
                                        <Col xs={3} className="px-2">
                                            <i class="fas fa-shield-alt user-utils-icon"></i>
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
                                            <i class="fas fa-sign-out-alt user-utils-icon"></i>
                                        </Col>
                                        <Col xs={9} className="px-0">
                                            <b className="logout-text user-utils-text">Đăng xuất</b>
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

    handleLogout = () => {
        this.setState({
            popover: false,
            anchorEl: null,
        })
        Cookie.remove("SESSION_ID");
        this.props.history.push("/");
    }

    handleOk = () => {
        Cookie.set("SESSION_ID", "abc")
        this.setState({
            loginModal: false
        })
        this.props.history.push("/Home");
    }

    renderLoginModal() {
        return (
            <>
                <Modal
                    title="Đăng nhập"
                    visible={this.state.loginModal}
                    // confirmLoading={false}
                    okText="Đăng nhập"
                    cancelText="Hủy bỏ"
                    onOk={this.handleOk}
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
        return (
            <>
                <Modal
                    title="Đăng ký"
                    visible={this.state.registerModal}
                    // confirmLoading={true}
                    okText="Đăng ký"
                    onOk={this.handleOk}
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


export default withRouter(Header)