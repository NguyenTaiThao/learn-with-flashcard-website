import React, { Component } from 'react'
import "@styles/Header.css"
import { Col, Row, Button } from 'react-bootstrap'
import { Modal, Form, Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, FacebookOutlined, GoogleOutlined, MailOutlined } from '@ant-design/icons'


export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginModal: false,
            registerModal: false,
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
                <Row>
                    <Col xs={12} className="header-wrapper d-flex align-items-center justify-content-between">
                        <Row className="w-100">
                            <Col md={6} className="logo pt-1 text-md-left text-center">
                                LET'S LEARN
                            </Col>
                            <Col md={6} className="button">
                                <Row className="align-items-center justify-content-center justify-content-md-end">
                                    <a
                                        className="login-link"
                                        onClick={() => this.handleShow("loginModal", true)}
                                    >
                                        Đăng nhập
                                    </a>
                                    <Button
                                        variant="info register-btn"
                                        onClick={() => this.handleShow("registerModal", true)}
                                    >
                                        Đăng ký
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* hiện thị Modal đăng ký */}
                {this.renderRegisterModal()}

                {/* hiển thị Modal đăng nhập */}
                {this.renderLoginModal()}
            </>
        )
    }

    renderLoginModal() {
        return (
            <>
                <Modal
                    title="Đăng nhập"
                    visible={this.state.loginModal}
                    confirmLoading={true}
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
                    confirmLoading={true}
                    okText="Đăng ký"
                    onOk={this.handleOk}
                    onCancel={() => this.handleShow("registerModal", false)}
                >
                    <Row className="mb-4">
                        <Col className="px-0 pr-md-1">
                            <Button
                                variant="outline-primary"
                                className="w-100"
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

                        <Col className="px-0 ml-md-1">
                            <Button
                                variant="outline-danger"
                                className="w-100"
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
}
