import React, { Component } from 'react';
import "@styles/Search.css"
import { withRouter } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core/';
import { Avatar, Card, Select } from "antd"
import Flippy, { FrontSide, BackSide } from 'react-flippy';

class SearchScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
        }
    }

    render() {
        return (
            <>
                <Row className="search py-md-4">
                    <Col md={2} className="">
                        <Row className="flex-column ml-5 my-5 py-5">
                            <div className="filter-group">
                                <span className="filter-label">Giá</span>
                                <RadioGroup
                                    aria-label="prize"
                                    name="prize"
                                    defaultValue="all"
                                >
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="all"
                                        control={<Radio />}
                                        label="Tất cả"
                                    />
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="free"
                                        control={<Radio />}
                                        label="Miễn phí"
                                    />
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="fee"
                                        control={<Radio />}
                                        label="Trả phí"
                                    />
                                </RadioGroup>
                            </div>
                            <div className="filter-group">
                                <span className="filter-label">Loại</span>
                                <RadioGroup
                                    aria-label="type"
                                    name="type"
                                    defaultValue="set"
                                >
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="set"
                                        control={<Radio />}
                                        label="Học phần"
                                    />
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="user"
                                        control={<Radio />}
                                        label="Người dùng"
                                    />
                                </RadioGroup>
                            </div>
                        </Row>
                    </Col>
                    <Col md={7}>
                        <Row className="search">
                            <Col>
                                <span className="search-keyword">"IT"</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Select defaultValue="default" style={{ width: 150 }}>
                                    <Select.Option value="default">Thứ tự mặc định</Select.Option>
                                    <Select.Option value="asc">
                                        <i className="fas fa-sort-amount-up-alt mr-1"></i>
                                        <span>Giá tăng dần</span>
                                    </Select.Option>
                                    <Select.Option value="desc">
                                        <i className="fas fa-sort-amount-down-alt mr-1"></i>
                                        <span>Giá giảm dần</span>
                                    </Select.Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                {[1, 2, 3, 4].map(e => this.renderItem())}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }

    renderItem() {
        return (
            <>
                <Row className="item mb-4">
                    <Col>
                        <Row>
                            <Col md={2}>
                                <span className="count">143 Thuật ngữ</span>
                            </Col>
                            <Col md={4}>
                                <Avatar
                                    style={{ "background": "red" }}
                                    size={26}
                                >
                                    <span className="text-uppercase">T</span>
                                </Avatar>
                                <span className="typical-text owner">thaonguyentai</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span className="title">IT nihongo 1</span>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Card>
                                    {[1, 2, 3].map((e) =>
                                        <Card.Grid>
                                            <Flippy
                                                flipOnHover={true} // default false
                                                flipOnClick={true} // default false
                                                flipDirection="horizontal" // horizontal or vertical
                                                ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                                                style={{ height: "100px" }}
                                            >
                                                <FrontSide
                                                    style={{
                                                        backgroundColor: '#fff',
                                                    }}
                                                    className="d-flex flex-column align-items-center justify-content-center px-0"
                                                >
                                                    <Row>
                                                        <span className="card-front">
                                                            front
                                                    </span>
                                                    </Row>
                                                </FrontSide>
                                                <BackSide
                                                    style={{ backgroundColor: '#fff' }}
                                                    className="d-flex flex-column align-items-center justify-content-center px-0"
                                                >
                                                    <Row>
                                                        <span className="card-back">
                                                            back
                                                    </span>
                                                    </Row>
                                                </BackSide>
                                            </Flippy>
                                        </Card.Grid>
                                    )
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}

export default withRouter(SearchScreen)
