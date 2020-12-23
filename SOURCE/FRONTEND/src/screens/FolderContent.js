import React, { Component } from 'react';
import "@styles/FolderContent.css"
import { Row, Col } from "react-bootstrap"
import { Button, Tooltip } from 'antd';

class FolderContent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Row className="bg-white folder-content px-md-4 py-5">
                    <Col md={8}>
                        <Row>
                            <span className="set-count">1 học phần</span>
                            <span className="vertical-divider">|</span>
                            <span className="made-by">
                                tạo bởi <span className="mader typical-text">Nguyễn Tài Thao</span>
                            </span>
                        </Row>
                        <Row className="align-items-center">
                            <i class="fal fa-folder folder-icon"></i>
                            <span className="title">
                                Thư mục 1
                            </span>
                        </Row>
                        <Row>
                            <span className="discription">
                                Đây là thư mục test
                            </span>
                        </Row>
                    </Col>
                    <Col md={4} className="text-right">
                        <Tooltip placement="bottom" title="Thêm học phần">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<i class="far fa-plus"></i>}
                                size="large"
                                className="function-btn"
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="Học">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<i class="far fa-book-reader"></i>}
                                size="large"
                                className="function-btn"
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="Sửa">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<i class="fal fa-calendar-edit"></i>}
                                size="large"
                                className="function-btn"
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="Xóa">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<i class="far fa-trash"></i>}
                                size="large"
                                className="function-btn"
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </>
        )
    }
}

export default FolderContent;
