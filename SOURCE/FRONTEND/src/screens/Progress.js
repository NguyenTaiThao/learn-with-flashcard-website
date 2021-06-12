import React, { Component } from "react";
import { Statistic, Button, Card } from "antd";
import { Row, Col } from "react-bootstrap";
import { requestStatistic } from "@constants/Api";
import moment from "moment";

export default class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        try {
            this.setState({
                loading: true,
            });
            const res = await requestStatistic();
            this.setState({
                loading: false,
                data: res.data,
            });
        } catch (err) {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const { data } = this.state;
        return (
            <div>
                <Row className="mx-md-5 my-md-5">
                    <Col md={3}>
                        <Card>
                            <Statistic
                                title="Ngày tham gia"
                                value={moment(data?.created_at).format(
                                    "DD-MM-YYYY"
                                )}
                            />
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <Statistic
                                title="Số học phần"
                                value={data && data.created_sets}
                            />
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Statistic
                                title="Set đã học"
                                value={data && data.completed_sets}
                                precision={0}
                            />
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Statistic
                                title="Đã hoàn thành"
                                value={
                                    data &&
                                    (data.completed_sets / data.created_sets) *
                                        100
                                }
                                precision={2}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row></Row>
            </div>
        );
    }
}
