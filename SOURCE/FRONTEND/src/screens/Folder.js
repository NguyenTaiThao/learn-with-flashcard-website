import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap"
import { Avatar, Radio, Divider } from 'antd'
import { Link, withRouter } from "react-router-dom"
import "@styles/Folder.css"
import { ROUTER } from "@constants/Constant"

class Folder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: this.props.screen,
            recentActivities: [1, 2, 3, 4, 5],
            learned: [1, 2, 3, 4, 5],
            made: [1, 2, 3, 4, 5],
            folder: [1, 2, 3, 4, 5],
        }
    }

    render() {
        return (
            <>
                <Row className="bg-white p-4 folder">
                    <Col md={2} className="py-3 d-flex justify-content-center align-items-center">
                        <Avatar
                            style={{ "background": "red" }}
                            size={110}
                        >
                            T
                        </Avatar>
                    </Col>
                    <Col md={9} className="d-flex flex-column justify-content-center">
                        <Row>
                            <span className="username">Nguyễn Tài Thao</span>
                        </Row>
                        <Row className="mt-2">
                            <Radio.Group value={this.state.filter} onChange={(e) => this.handleFilter(e)}>
                                <Radio.Button
                                    value="recent-activities"
                                // onClick={() => this.pushRef(ROUTER.)}
                                >
                                    <span className="txt-btn m-2">Hoạt động gần đây</span>
                                </Radio.Button>
                                <Radio.Button
                                    value="made"
                                    onClick={() => this.pushRef(ROUTER.SET)}
                                >
                                    <span className="txt-btn m-2">Đã tạo</span>
                                </Radio.Button>
                                <Radio.Button
                                    value="learned"
                                    onClick={() => this.pushRef(ROUTER.SET_LEARNED)}
                                >
                                    <span className="txt-btn m-2">Đã học</span>
                                </Radio.Button>
                                <Radio.Button
                                    value="folder"
                                    onClick={() => this.pushRef(ROUTER.FOLDER)}
                                >
                                    <span className="txt-btn m-2">Thư mục</span>
                                </Radio.Button>
                            </Radio.Group>
                        </Row>
                    </Col>
                </Row>

                <Row className="my-4 px-md-4">
                    <Col md={8}>
                        <Divider orientation="left" className="count-divider" plain>
                            <span className="element-count">
                                Tổng có: <span className="font-number">{this.state[this.props.screen].length}</span>
                            </span>
                        </Divider>
                        {this.state[this.props.screen].map((ele) => this.renderContent(ele))}
                    </Col>
                </Row>
            </>
        )
    }

    handleFilter = (event) => {
        this.setState({
            filter: event.target.value
        })
    }

    renderContent() {
        let screen = this.props.screen
        if (screen == "folder") {
            return (
                <>
                    <Row
                        className="float-div folder-element py-md-2 mt-3"
                        onClick={() => this.pushRef(ROUTER.FOLDER_CONTENT)}
                    >
                        <Col md={12}>
                            <span className="info">2 thuật ngữ</span>
                        </Col>
                        <Col md={12}>
                            <i class="fal fa-folder element-name-icon"></i>
                            <span className="element-name">IT nihongo 1</span>
                        </Col>
                    </Row>
                </>
            )
        } else if (screen == "recentActivities") {
            return (
                <>
                    <Row className="float-div folder-element py-md-2 mt-3 cursor"
                        onClick={() => this.pushRef(ROUTER.FOLDER_CONTENT)}
                    >
                        <Col md={12}>
                            <span className="info">2 thuật ngữ</span>
                        </Col>
                        <Col md={12}>
                            <i class="fal fa-folder element-name-icon"></i>
                            <span className="element-name">IT nihongo 1</span>
                        </Col>
                    </Row>
                </>
            )
        } else if (screen == "made") {
            return (
                <>
                    <Row className="float-div folder-element py-md-2 mt-3 cursor"
                        onClick={() => this.pushRef(ROUTER.LEARN)}
                    >
                        <Col md={12}>
                            <span className="info">2 thuật ngữ</span>
                        </Col>
                        <Col md={12}>
                            <i class="fal fa-bookmark element-name-icon"></i>
                            <span className="element-name">Bài 1</span>
                        </Col>
                    </Row>
                </>
            )
        } else if (screen == "learned") {
            return (
                <>
                    <Row className="float-div folder-element py-md-2 mt-3 cursor"
                        onClick={() => this.pushRef(ROUTER.LEARN)}
                    >
                        <Col md={12}>
                            <span className="info">2 thuật ngữ</span>
                        </Col>
                        <Col md={12}>
                            <i class="far fa-check element-name-icon"></i>
                            <span className="element-name">Learned 1</span>
                        </Col>
                    </Row>
                </>
            )
        }

    }

    pushRef(link) {
        this.props.history.push(link)
    }
}

export default withRouter(Folder);
