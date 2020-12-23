import React, { Component } from 'react';
import { TextField } from '@material-ui/core/'
import { Row, Col } from "react-bootstrap"
import { Button } from "antd"
import "@styles/CreateFolder.css"

class CreateFolder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    render() {
        return (
            <>
                <>
                    <Row>
                        <Col md={9} className="float-div p-5">
                            <Row className="justify-content-center create-folder-title">
                                <span className="typical-text">Tạo thư mục</span>
                            </Row>
                            <Row>
                                <TextField
                                    id="title"
                                    className="w-100 py-3"
                                    label="Tiêu đề"
                                />
                            </Row>
                            <Row>
                                <TextField
                                    id="discription"
                                    className="w-100 py-3"
                                    label="Mô tả"
                                />
                            </Row>
                            <Row className="mt-4">
                                <Button type="primary" className="w-100">Tạo thư mục</Button>
                            </Row>

                        </Col>
                    </Row>
                </>
            </>
        )
    }
}

export default CreateFolder;
