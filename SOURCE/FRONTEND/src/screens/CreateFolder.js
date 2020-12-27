import React, { Component } from 'react';
import { TextField } from '@material-ui/core/'
import { Row, Col } from "react-bootstrap"
import { Button } from "antd"
import "@styles/CreateFolder.css"
import {requestCreateFolder} from "@constants/Api"
import NotifyContext from "@context/NotifyContext"
import reactotron from "reactotron-react-js"

const defaultState = {
    open: false,
    form: {
        id: 0,
        name: "",
        discription: ""
    },
    loading:false
}

class CreateFolder extends Component {

    constructor(props) {
        super(props)
        this.state = {...defaultState}
    }

    static contextType = NotifyContext

    render() {
        const { form } = this.state
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
                                    value={form.name}
                                    onChange={(e) => this.handleChange("name", e.target.value)}
                                />
                            </Row>
                            <Row>
                                <TextField
                                    id="discription"
                                    className="w-100 py-3"
                                    label="Mô tả"
                                    value={form.discription}
                                    onChange={(e) => this.handleChange("discription", e.target.value)}
                                />
                            </Row>
                            <Row className="mt-4">
                                <Button
                                    type="primary"
                                    className="w-100"
                                    onClick={() => this.handleCreate()}
                                    loading={this.state.loading}
                                >
                                    Tạo thư mục
                                </Button>
                            </Row>

                        </Col>
                    </Row>
                </>
            </>
        )
    }

    handleChange(field, value) {
        this.setState({
            form: {
                ...this.state.form,
                [field]: value
            }
        })
    }

    async handleCreate(){
        try{
            this.setState({loading:true})
            const res = await requestCreateFolder({...this.state.form})
            this.setState({
                loading:false,
                form: {...defaultState.form}
            })
            this.context("success", "Thành công", "Thêm mới thư mục thành công.")
        }catch(e){
            reactotron.log("them folder", e)
            this.context("error", "Thất bại", e.msg)
            this.setState({loading:false})
        }
    }
}

export default CreateFolder;
