import React, { Component } from 'react';
import { ROUTER } from '../constants/Constant';
import { Row, Col, Button } from "react-bootstrap"
import reactotron from 'reactotron-react-js';
import CanvasJSReact from '@assets/canvasjs-3.2.5/canvasjs.react';
import "@styles/UserHome.css"
import { Skeleton, Tooltip, Card, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { requestRecentSets } from "@constants/Api"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        try {
            this.setState({
                loading: true
            })
            const res = await requestRecentSets({ page: 1 });
            this.setState({
                loading: false,
                data: res.data
            })
        } catch (e) {
            reactotron.log("user home err", e)
        }
    }

    render() {
        const { loading, data } = this.state;

        const options = {
            animationEnabled: true,
            subtitles: [{
                text: this.state.loading ? "Loading" : "Hoàn thành " + data[0]?.completed + "%",
                verticalAlign: "center",
                fontSize: 14,
                dockInsidePlotArea: false
            }],
            width: 220,
            height: 220,
            data: [{
                type: "doughnut",
                showInLegend: true,
                yValueFormatString: "#,###'%'",
                dataPoints: [
                    {
                        name: "Hoàn thành",
                        y: data[0]?.completed,
                        color: "green"
                    },
                    {
                        name: "Chưa hoàn thành",
                        y: (1 - data[0]?.completed / 100) * 100,
                        color: "#f0f0f0"
                    },
                ]
            }]
        }

        return (
            <>
                <Row className="w-75 py-4 px-4">
                    <Col>
                        {(data?.length <= 0 && !this.state.loading) ?
                            <Row className="float-div suggested-folder">
                                <Col md={3}>
                                    <i className="fal fa-medal start-icon"></i>
                                </Col>
                                <Col md={9} className="d-flex flex-column justify-content-center">
                                    <Row>
                                        <span className="title">Cùng nhau tạo học phần mới</span>
                                    </Row>
                                    <Row>
                                        <span className="banner">Để luyện tập với chế độ Học và cải thiện kiến thức của bạn.</span>
                                    </Row>
                                    <Row>
                                        <Button
                                            variant="secondary"
                                            className="typical-btn change-mode mt-3"
                                            onClick={() => this.pushRef(ROUTER.CREATE_SET)}
                                        >
                                            Tạo học phần mới
                                    </Button>
                                    </Row>
                                </Col>
                            </Row>
                            :
                            <Row className="float-div suggested-folder">
                                <Col md={3}>
                                    <CanvasJSChart options={options} />
                                </Col>
                                <Col md={9} className="d-flex flex-column justify-content-center">
                                    <Row>
                                        <span className="title">{data && data[0]?.title}</span>
                                    </Row>
                                    <Row>
                                        <span className="banner">Tiếp tục luyện tập với chế độ Học và cải thiện kiến thức của bạn.</span>
                                    </Row>
                                    <Row>
                                        <Button
                                            variant="secondary"
                                            className="typical-btn change-mode mt-3"
                                            onClick={() => this.pushRef(ROUTER.LEARN, data[0]?.id)}
                                        >
                                            Tiếp tục luyện tập
                                    </Button>
                                    </Row>
                                </Col>
                            </Row>
                        }
                        <Row className="mt-4">
                            <Col className="text-left px-0">
                                <b>Gần đây</b>
                            </Col>
                            <Col className="text-right px-0">
                                <b
                                    className="typical-text"
                                    onClick={() => this.props.history.push(ROUTER.RECENT_ACT)}
                                >
                                    Xem tất cả <i class="fas fa-chevron-right"></i>
                                </b>
                            </Col>
                        </Row>

                        <Row className="justify-content-between">
                            {!loading ? data && data?.filter((e1, i1) => i1 != 0)?.map((e, index) =>
                                <Card
                                    style={{ width: 400, marginTop: 16 }}
                                    actions={[
                                        <Tooltip
                                            placement="bottom"
                                            title="Học"
                                        >
                                            <BookOutlined
                                                key="learn"
                                                onClick={() => this.pushRef(ROUTER.LEARN, e?.id)}
                                            />
                                        </Tooltip>,
                                        <Tooltip
                                            placement="bottom"
                                            title="Chỉnh sửa"
                                        >
                                            <EditOutlined
                                                key="edit"
                                                onClick={() => this.pushRef(ROUTER.LEARN, e?.id)}
                                            />
                                        </Tooltip>,
                                        <Tooltip
                                            placement="bottom"
                                            title="Xóa"
                                        >
                                            <DeleteOutlined key="delete" />
                                        </Tooltip>,
                                    ]}
                                >
                                    <Skeleton loading={loading} avatar active>
                                        <Card.Meta
                                            title={e && e?.title}
                                            description={`${e && e?.cards.length} thuật ngữ`}
                                        />
                                    </Skeleton>
                                </Card>
                            )
                                :
                                <>
                                    {[1, 2, 3, 4].map(e =>
                                        <Card
                                            style={{ width: 400, marginTop: 16 }}
                                            actions={[
                                                <Tooltip
                                                    placement="bottom"
                                                    title="Học"
                                                >
                                                    <BookOutlined
                                                        key="learn"
                                                        onClick={() => this.pushRef(ROUTER.LEARN, e?.id)}
                                                    />
                                                </Tooltip>,
                                                <Tooltip
                                                    placement="bottom"
                                                    title="Chỉnh sửa"
                                                >
                                                    <EditOutlined
                                                        key="edit"
                                                        onClick={() => this.pushRef(ROUTER.LEARN, e?.id)}
                                                    />
                                                </Tooltip>,
                                                <Tooltip
                                                    placement="bottom"
                                                    title="Xóa"
                                                >
                                                    <Popconfirm
                                                        title="Bạn muốn xóa học phần này và tất cả các thẻ card trong nó?"
                                                        onConfirm={this.removeSet}
                                                        // onCancel={cancel}
                                                        okText="Đồng ý"
                                                        cancelText="Hủy"
                                                    >
                                                        <DeleteOutlined key="delete" />
                                                    </Popconfirm>
                                                </Tooltip>,
                                            ]}
                                        >
                                            <Skeleton loading={loading} avatar active>
                                                <Card.Meta />
                                            </Skeleton>
                                        </Card>
                                    )}

                                </>
                            }
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }

    pushRef(link, id) {
        this.props.history.push({
            pathname: link,
            state: { id: id }
        })
    }

    removeSet = async () => {
        try {

        } catch (e) {
            reactotron.log("remove set err", e)
        }
    }
}

export default connect(null, null)(withRouter(UserHome))