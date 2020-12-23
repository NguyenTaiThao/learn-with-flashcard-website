import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER } from '../constants/Constant';
import { Row, Col, Button } from "react-bootstrap"
import reactotron from '../ReactotronConfig';
import CanvasJSReact from '@assets/canvasjs-3.2.5/canvasjs.react';
import "@styles/UserHome.css"
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }
    render() {
        const options = {
            animationEnabled: true,
            subtitles: [{
                text: "Hoàn thành 15%",
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
                    { name: "Hoàn thành", y: 5, color: "green" },
                    { name: "Chưa hoàn thành", y: 31, color: "#f0f0f0" },
                ]
            }]
        }

        const { loading } = this.state;

        return (
            <>
                <Row className="w-75 py-4 px-4">
                    <Col>
                        <Row className="float-div suggested-folder">
                            <Col md={3}>
                                <CanvasJSChart options={options} />
                            </Col>
                            <Col md={9} className="d-flex flex-column justify-content-center">
                                <Row>
                                    <span className="title">IT日本語②ー総合</span>
                                </Row>
                                <Row>
                                    <span className="banner">Tiếp tục luyện tập với chế độ Học và cải thiện kiến thức của bạn.</span>
                                </Row>
                                <Row>
                                    <Button
                                        variant="secondary"
                                        className="typical-btn change-mode mt-3"
                                    >
                                        Dùng chế độ học
                                    </Button>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col className="text-left px-0">
                                <b>Gần đây</b>
                            </Col>
                            <Col className="text-right px-0">
                                <b className="typical-text">Xem tất cả <i class="fas fa-chevron-right"></i></b>
                            </Col>
                        </Row>

                        <Row className="justify-content-between">
                            {/* <Col md={5} className="float-div py-3 px-3">
                                <Row>
                                    <b>IT midterm</b>
                                </Row>
                                <Row>
                                    99 thuật ngữ
                                </Row>
                                <Row className="mt-5">
                                    thaont
                                </Row>
                            </Col>
                            <Col md={5} className="float-div py-3 px-3">
                                <Row>
                                    <b>IT midterm</b>
                                </Row>
                                <Row>
                                    99 thuật ngữ
                                </Row>
                                <Row className="mt-5">
                                    thaont
                                </Row>
                            </Col> */}
                            <Card
                                style={{ width: 400, marginTop: 16 }}
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Skeleton loading={loading} avatar active>
                                    <Card.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title="IT midterm"
                                        description="99 thuật ngữ"
                                    />
                                </Skeleton>
                            </Card>

                            <Card
                                style={{ width: 400, marginTop: 16 }}
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Skeleton loading={loading} avatar active>
                                    <Card.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title="IT midterm"
                                        description="99 thuật ngữ"
                                    />
                                </Skeleton>
                            </Card>

                            <Card
                                style={{ width: 400, marginTop: 16 }}
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Skeleton loading={loading} avatar active>
                                    <Card.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title="IT midterm"
                                        description="99 thuật ngữ"
                                    />
                                </Skeleton>
                            </Card>

                            <Card
                                style={{ width: 400, marginTop: 16 }}
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Skeleton loading={loading} avatar active>
                                    <Card.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title="IT nihongo"
                                        description="133 thuật ngữ"
                                    />
                                </Skeleton>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}
