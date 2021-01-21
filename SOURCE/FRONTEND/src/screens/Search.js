import React, { Component } from 'react';
import "@styles/Search.css"
import { withRouter } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core/';
import { Avatar, Card, Select, Empty, Skeleton, Space, notification } from "antd"
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { requestSearch } from "@constants/Api"
import reactotron from "reactotron-react-js"
import Pagination from '@material-ui/lab/Pagination';
import Cookie from "js-cookie"
import NotifyContext from "@context/NotifyContext"
import { ROUTER } from '@constants/Constant';

const defaultState = {
    loading: false,
    data: {},
    price: "-2",
    type: "1",
    sort: "0",
    page: 1,
}
class SearchScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...defaultState
        }
    }

    static contextType = NotifyContext

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state?.keyword !== this.props.location.state?.keyword) {
            this.setState({
                page: 1
            }, () => this.getData())
        }

    }

    getData = async (page) => {
        try {
            this.setState({
                loading: true
            })
            const res = await requestSearch({
                page: this.state.page,
                keyword: this.props.location.state?.keyword,
                price: this.state.price,
                type: this.state.type,
                sort: this.state.sort

            })
            this.setState({
                data: { ...res?.data },
                loading: false
            })
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }

    handleFieldChange(field, value) {
        this.setState({
            [field]: value,
            page: 1,
        }, () => this.getData())
    }

    render() {
        const { data } = this.state
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
                                    value={this.state.price}
                                    onChange={(e) => this.handleFieldChange("price", e.target.value)}
                                >
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="-2"
                                        control={<Radio />}
                                        label="Tất cả"
                                    />
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="0"
                                        control={<Radio />}
                                        label="Miễn phí"
                                    />
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="-1"
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
                                    value={this.state.type}
                                    onChange={(e) => this.handleFieldChange("type", e.target.value)}
                                >
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="1"
                                        control={<Radio />}
                                        label="Học phần"
                                    />
                                    <FormControlLabel
                                        className="radio-btn-div"
                                        value="2"
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
                                <span className="search-keyword">"{this.props.location.state?.keyword}"</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Select
                                    style={{ width: 150 }}
                                    value={this.state.sort}
                                    onChange={(selected) => this.handleFieldChange("sort", selected)}
                                >
                                    <Select.Option value="0">Thứ tự mặc định</Select.Option>
                                    <Select.Option value="1">
                                        <i className="fas fa-sort-amount-up-alt mr-1"></i>
                                        <span>Giá tăng dần</span>
                                    </Select.Option>
                                    <Select.Option value="2">
                                        <i className="fas fa-sort-amount-down-alt mr-1"></i>
                                        <span>Giá giảm dần</span>
                                    </Select.Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            {this.state.loading ?
                                <Row className="mb-5">
                                    <Space className="w-100">
                                        <Skeleton.Button style={{ width: 200 }} active={this.state.loading} size="large" shape="default" />
                                        <Skeleton.Avatar active={this.state.loading} size="large" shape="circle" />
                                        <Skeleton.Button style={{ width: 200 }} active={this.state.loading} size="large" shape="default" />
                                        <Skeleton.Input style={{ width: 200 }} active={this.state.loading} size="large" />
                                    </Space>
                                    <br />
                                    <Space className="w-100 mt-2">
                                        <Skeleton.Input style={{ width: 200 }} active={this.state.loading} size="large" />
                                    </Space>
                                    <br />
                                    <Space className="w-100 d-flex justify-content-between mt-2">
                                        <Skeleton.Image size="large" style={{ width: 200 }} />
                                        <Skeleton.Image size="large" style={{ width: 200 }} />
                                        <Skeleton.Image size="large" style={{ width: 200 }} />
                                    </Space>
                                </Row>
                                :
                                <Col>
                                    {data?.paginate?.total_items > 0 ?
                                        this.renderResult(data)
                                        :
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            description={
                                                <b>
                                                    Không có kết quả nào phù hợp
                                            </b>
                                            }
                                        />
                                    }
                                </Col>
                            }
                        </Row>
                        <Row className="justify-content-center mt-4">
                            <Pagination
                                count={Math.ceil(data?.paginate?.total_items / data?.paginate?.items_per_page)}
                                color="primary"
                                size="large"
                                page={this.state.page}
                                disabled={this.state.loading}
                                onChange={(e, page) => this.handlePagi(page)}
                            />
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }

    handlePagi(page) {
        this.setState({
            page: page
        }, () => this.getData())
    }

    renderResult(data) {
        if (this.state.type == "1") {
            return (
                data?.sets?.map(e => this.renderItem(e))
            )
        } else {
            return (
                data?.users?.map(e => this.renderItem(e))
            )
        }
    }

    renderItem(e) {
        if (this.state.type == "1") {
            return (
                <>
                    <Row
                        className="item mb-4 cursor"
                        onClick={() => this.addCart(e?.id)}
                    >
                        <Col>
                            <Row>
                                <Col md={2}>
                                    <span className="count">{e && e?.number_of_cards} Thuật ngữ</span>
                                </Col>
                                <Col md={4}>
                                    <Avatar
                                        style={{ "background": "red" }}
                                        size={26}
                                    >
                                        <span className="text-uppercase">{e && e?.author.charAt(0)}</span>
                                    </Avatar>
                                    <span className="typical-text owner">{e && e?.author}</span>
                                </Col>
                                <Col md={6} className="text-right">
                                    <b className="text-success">{e.price == 0 ? "free" : `$${e.price}`}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className="title">{e && e?.title}</span>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <Card>
                                        {e.cards?.slice(0, 3).map((e) =>
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
                                                                {e?.front_side}
                                                            </span>
                                                        </Row>
                                                    </FrontSide>
                                                    <BackSide
                                                        style={{ backgroundColor: '#fff' }}
                                                        className="d-flex flex-column align-items-center justify-content-center px-0"
                                                    >
                                                        <Row>
                                                            <span className="card-back">
                                                                {e?.back_side}
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
        } else {
            return (
                <>
                    <Row className="item mb-4 cursor">
                        <Col>
                            <Row className="align-items-center">
                                <Col md={8} className="d-flex align-items-center">
                                    <Avatar
                                        style={{ "background": "red" }}
                                        size={26}
                                    >
                                        <span className="text-uppercase">{e && e?.name.charAt(0)}</span>
                                    </Avatar>
                                    <span className="typical-text owner text-uppercase" style={{ fontSize: "25px" }}>{e && e?.name}</span>
                                </Col>
                                <Col md={4} className="text-right">
                                    <span className="count">{e && e?.sets?.length} học phần</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )
        }
    }

    addCart = (id) => {
        var cart = Cookie.get("CART")
        if (cart) {
            var cart_arr = cart.split("|")
            if (cart_arr.includes(id.toString())) {
                this.context("warning", "Đã tồn tại", "Học phần này đã nằm trong giỏ hàng.")
            } else {
                Cookie.set("CART", [...cart_arr, id].join("|"))
                this.context("success", "Thành công", "Học phần được thêm vào giỏ hàng hàng công.")
            }
        } else {
            Cookie.set("CART", "")
            Cookie.set("CART", id.toString())
            this.context("success", "Thành công", "Học phần được thêm vào giỏ hàng hàng công.")
        }
    }

}

export default withRouter(SearchScreen)
