import React, { Component } from 'react'
import "@styles/Header.css"
import { Col, Row, Button } from 'react-bootstrap'

export default class Header extends Component {
    render() {
        return (
            <>
                <Row>
                    <Col xs={12} className="header-wrapper d-flex align-items-center justify-content-between">
                        <Row className="w-100">
                            <Col md={6} className="logo">
                                LET'S LEARN
                            </Col>
                            <Col md={6} className="button">
                                <Row className="align-items-center justify-content-center justify-content-md-end">
                                    <a href="#" className="login-link">Đăng nhập</a>
                                    <Button variant="info register-btn">Đăng ký</Button>
                                </Row>
                            </Col>
                        </Row>
                    </Col>    
                </Row> 
            </>
        )
    }
}
