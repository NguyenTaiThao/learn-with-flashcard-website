import React, { Component } from 'react'
import "@styles/Header.css"
import { Col, Row, Button } from 'react-bootstrap'
import { Modal, Form, Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons'


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
                            <FacebookOutlined className="mr-1" />
                            <b>Login with Facebook</b>
                        </Row>
                    </Button>

                    <Button
                        variant="outline-danger"
                        className="w-100 mb-4"
                    >
                        <Row className="align-items-center justify-content-center">
                            <GoogleOutlined className="mr-1" />
                            <b>Login with Google</b>
                        </Row>
                    </Button>

                    <div className="text-center mb-4 or-option">
                        <b>HOẶC</b>
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
                                placeholder="Username"
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
                                placeholder="Password"
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
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        )
    }
}
