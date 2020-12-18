import React, { Component } from 'react';
import { Row, Col, Button } from "react-bootstrap"
import { TextField, MenuItem, Divider } from "@material-ui/core/"
import { withRouter, Link } from "react-router-dom"
import "@styles/CreateSet.css"

class CreateSet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newSet: [
                {
                    title: "english",
                    meaning: "Tiếng Anh"
                },
                {
                    title: "english",
                    meaning: "Tiếng Anh"
                },
                {
                    title: "english",
                    meaning: "Tiếng Anh"
                },
                {
                    title: "english",
                    meaning: "Tiếng Anh"
                }
            ],
            sets: [1, 2, 3, 4],

        }
    }

    render() {
        const { sets } = this.state
        return (
            <>
                <Row className="justify-content-between px-4 py-4 bg-white pt-5 create-set-header align-items-center">
                    <b className="title">Tạo học phần mới</b>
                    <Button className="typical-btn create-btn">Tạo</Button>
                </Row>

                <Row className="bg-white">
                    <Col>
                        <form noValidate autoComplete="off" className="w-100">
                            <Row>
                                <Col md={6}>
                                    <TextField id="title-set" label="Tiêu đề của Set" className="w-100 py-3" />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <TextField id="discription-set" label="Mô tả" className="w-100 py-3" />
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>

                <Row className="bg-white pt-4 pb-5 align-items-center">
                    <Col>
                        <b className="typical-text">+ Nhập từ Word, Excel, Google Docs, v.v.</b>
                    </Col>
                    <Col>
                        <Row>
                            <Col md={4} className="">
                                <Row>
                                    <b className="">Hiển thị với mọi người</b>
                                </Row>
                                <Row>
                                    <TextField
                                        select
                                        value={1}
                                        className="w-100 typical-text"
                                    >
                                        <MenuItem key={1} value={1} className="typical-text">
                                            Chỉ mình tôi
                                            </MenuItem>
                                        <MenuItem key={2} value={2} className="typical-text">
                                            Mọi người
                                            </MenuItem>
                                    </TextField>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <Row>
                                    <b className="">Chỉ tôi có quyền sửa</b>
                                </Row>
                                <Row>
                                    <TextField
                                        select
                                        value={1}
                                        className="w-100"
                                    >
                                        <MenuItem key={1} value={1} className="typical-text">
                                            Chỉ mình tôi
                                            </MenuItem>
                                        <MenuItem key={2} value={2} className="typical-text">
                                            Mọi người
                                            </MenuItem>
                                    </TextField>
                                </Row>
                            </Col>
                            <Col>
                                <Row></Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {sets.map((element, index) =>
                    <Row className="new-div mt-4 mx-md-5 py-3">
                        <Col className="px-0">
                            <Row className="align-items-center px-3 pb-2">
                                <Col className="text-left">
                                    <span className="card-order">{index + 1}</span>
                                </Col>
                                <Col className="text-right">
                                    <i
                                        class="far fa-trash new-div-icon cursor"
                                        onClick={() => this.removeCard(index)}
                                    >

                                    </i>
                                </Col>
                            </Row>
                            <Divider />
                            <Row className="pt-3">
                                <Col md={6}>
                                    <TextField id="label-set-1" label="Thuật ngữ" className="w-100 py-3" />
                                </Col>
                                <Col md={6}>
                                    <TextField id="meaning-set-1" label="Ý nghĩa của thuật ngữ" className="w-100 py-3" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}

                <Row
                    className="new-div mt-4 mx-md-5 py-4 align-items-center justify-content-center cursor"
                    onClick={() => this.addNewCard()}
                >
                    <b className="new-card-btn"><i class="fas fa-plus"></i> THÊM THẺ MỚI</b>
                </Row>
            </>
        )
    }

    addNewCard() {
        this.setState({
            sets: [...this.state.sets, this.state.sets.length]
        })
    }

    removeCard(index) {
        let oldCard = [...this.state.sets]
        oldCard.splice(index, 1)
        this.setState({
            sets: [...oldCard]
        })
    }
}

export default withRouter(CreateSet);