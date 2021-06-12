import React, { Component } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { Row, Col } from "react-bootstrap";
import "@styles/learn.css";
import {
    Divider,
    Fab,
    Slide,
    Tooltip,
    IconButton,
    TextField,
} from "@material-ui/core";
import ButtonMate from "@material-ui/core/Button";
import {
    Progress,
    Button,
    Select,
    Result,
    Spin,
    Modal,
    Alert,
    Statistic,
    Switch,
} from "antd";
import {
    LoadingOutlined,
    SmileOutlined,
    FrownOutlined,
} from "@ant-design/icons";
import { withRouter, Redirect } from "react-router-dom";
import { ROUTER, GAME_TYPE } from "@constants/Constant";
import {
    requestSetDetail,
    requestGame,
    requestUpdateCard,
} from "@constants/Api";
import _ from "lodash";
import NotifyContext from "@context/NotifyContext";

const selectGameDefaultStatus = {
    currentQuestion: 0,
    point: 0,
    selected: "",
    correct: "",
    deadline: 0,
    timeChallenge: false,
};
class Learn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sets: [],
            cardStatus: [],
            currentCard: 0,
            data: null,
            autoLearn: null,
            gameModal: false,
            gameLoading: false,
            gameType: null,
            selectGame: { ...selectGameDefaultStatus },
            fillGame: {
                currentQuestion: 0,
                point: 0,
                userInput: "",
            },
        };
        this.flippy = [];
    }

    static contextType = NotifyContext;
    TIME_PER_QUES = 10;
    TIME_SHOW = 3000;

    componentDidMount() {
        this.getDetail();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state?.id !== this.props.location.state?.id) {
            this.getDetail();
        }
    }

    updateCard = async () => {
        const card = { ...this.filterCard()[this.state.currentCard] };
        try {
            this.setState({
                loading: true,
            });
            const res = await requestUpdateCard({
                ...card,
                card_id: card.id,
                remember: !card.remember ? 1 : 0,
            });
            const newData = this.state.sets.map((e) =>
                e.id == card.id
                    ? { ...card, remember: !card.remember ? 1 : 0 }
                    : e
            );
            this.setState({
                loading: false,
                sets: newData,
            });
            if (!card.remember) {
                this.setState({
                    data: {
                        ...this.state.data,
                        remembered_cards:
                            parseInt(this.state.data.remembered_cards) + 1,
                    },
                });
            } else {
                this.setState({
                    data: {
                        ...this.state.data,
                        remembered_cards:
                            parseInt(this.state.data.remembered_cards) - 1,
                    },
                });
            }
        } catch (e) {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const id = this.props.location?.state?.id;
        const { data, sets } = this.state;
        if (id) {
            return (
                <>
                    <Row className="h-100 learn">
                        <Col xs={2} className="float-div ml-3 px-0">
                            <Row className="align-items-baseline py-3">
                                <i
                                    className="far fa-chevron-left pl-4 pr-2 typical-text back-icon"
                                    onClick={() => this.props.history.goBack()}
                                ></i>
                                <span
                                    className="back-btn cursor"
                                    onClick={() => this.props.history.goBack()}
                                >
                                    Trở về
                                </span>
                            </Row>

                            <Divider />

                            <Row className="justify-content-center align-items-baseline title py-5">
                                <i className="fad fa-clipboard pr-2 title-icon"></i>
                                <span className="title-text">Thẻ ghi nhớ</span>
                            </Row>

                            <Row className="flex-column justify-content-center align-items-center py-5">
                                <Tooltip
                                    placement="bottom"
                                    title="Tiến độ học của học phần này"
                                >
                                    <Progress
                                        type="circle"
                                        percent={
                                            (data?.remembered_cards /
                                                sets?.length) *
                                                100 || 0
                                        }
                                        format={() =>
                                            (data?.remembered_cards || 0) +
                                            "/" +
                                            (sets?.length || 0)
                                        }
                                    />
                                </Tooltip>
                                <span>Tiến độ</span>
                            </Row>

                            <Row className="px-2 pt-5">
                                <Button
                                    block
                                    disabled={this.state.sets?.length <= 0}
                                    className="my-2"
                                    onClick={() => this.shuffleCard()}
                                >
                                    <span className="typical-text">
                                        Xáo trộn thẻ
                                    </span>
                                </Button>
                            </Row>
                        </Col>

                        <Col
                            xs={8}
                            className="d-flex flex-column justify-content-center hide"
                        >
                            <Row className="justify-content-end mb-2">
                                <Select
                                    defaultValue="all"
                                    style={{ background: "white" }}
                                    bordered={false}
                                    onChange={(value) =>
                                        this.handleFilterChange(value)
                                    }
                                    disabled={this.state.sets?.length <= 0}
                                >
                                    <Select.Option value="all">
                                        <b className="select-type">
                                            Tất cả thẻ
                                        </b>
                                    </Select.Option>
                                    <Select.Option value="learned">
                                        <b className="select-type">
                                            Thẻ đã thuộc
                                        </b>
                                    </Select.Option>
                                    <Select.Option value="learning">
                                        <b className="select-type">
                                            Thẻ chưa thuộc
                                        </b>
                                    </Select.Option>
                                </Select>
                            </Row>

                            <Row className="">
                                {this.filterCard().length > 0 ? (
                                    this.filterCard().map((ele, index) => (
                                        <Slide
                                            direction="down"
                                            in={
                                                this.state.currentCard === index
                                            }
                                            mountOnEnter
                                            unmountOnExit
                                            timeout={{
                                                enter: 650,
                                                exit: 0,
                                            }}
                                            style={
                                                this.state.currentCard === index
                                                    ? {}
                                                    : { display: "none" }
                                            }
                                        >
                                            <Flippy
                                                flipOnHover={false} // default false
                                                flipOnClick={true} // default false
                                                flipDirection="horizontal" // horizontal or vertical
                                                ref={(r) =>
                                                    (this.flippy[index] = r)
                                                } // to use toggle method like this.flippy.toggle()
                                                style={{
                                                    width: "100%",
                                                    height: "450px",
                                                }} /// these are optional style, it is not necessary
                                            >
                                                <FrontSide
                                                    style={{
                                                        backgroundColor: "#fff",
                                                    }}
                                                    className="d-flex flex-column align-items-center justify-content-center px-0"
                                                >
                                                    <Row className="fixed-top">
                                                        <Col
                                                            xs={8}
                                                            className="offset-2 text-center"
                                                        >
                                                            <span>
                                                                {this.state
                                                                    .currentCard +
                                                                    1}
                                                                /
                                                                {
                                                                    this.filterCard()
                                                                        .length
                                                                }
                                                            </span>
                                                        </Col>
                                                        <Col
                                                            xs={2}
                                                            className="text-right"
                                                        >
                                                            <Tooltip
                                                                placement="bottom"
                                                                title={
                                                                    ele?.remember
                                                                        ? "Bạn đã thuộc thẻ này"
                                                                        : "Bạn vẫn chưa thuộc thẻ này"
                                                                }
                                                            >
                                                                <i
                                                                    className={`fad fa-bookmark remember-icon mr-2 
                                                            ${
                                                                ele?.remember
                                                                    ? "text-success"
                                                                    : "text-secondary"
                                                            } cursor`}
                                                                    onClick={() =>
                                                                        this.updateCard()
                                                                    }
                                                                ></i>
                                                            </Tooltip>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <span className="card-front">
                                                            {ele?.front_side}
                                                        </span>
                                                    </Row>
                                                    <Row className="w-100 bg-dark text-white justify-content-center py-1 fixed-bottom">
                                                        <span>
                                                            Nhấn để xem định
                                                            nghĩa 👆
                                                        </span>
                                                    </Row>
                                                </FrontSide>

                                                <BackSide
                                                    style={{
                                                        backgroundColor: "#fff",
                                                    }}
                                                    className="d-flex flex-column align-items-center justify-content-center px-0"
                                                >
                                                    <Row className="fixed-top">
                                                        <Col
                                                            xs={8}
                                                            className="offset-2 text-center"
                                                        >
                                                            <span>
                                                                {this.state
                                                                    .currentCard +
                                                                    1}
                                                                /
                                                                {
                                                                    this.filterCard()
                                                                        .length
                                                                }
                                                            </span>
                                                        </Col>
                                                        <Col
                                                            xs={2}
                                                            className="text-right"
                                                        >
                                                            <Tooltip
                                                                placement="bottom"
                                                                title={
                                                                    ele?.remember
                                                                        ? "Bạn đã thuộc thẻ này"
                                                                        : "Bạn vẫn chưa thuộc thẻ này"
                                                                }
                                                            >
                                                                <i
                                                                    className={`fad fa-bookmark remember-icon ml-2 
                                                            ${
                                                                ele?.remember
                                                                    ? "text-success"
                                                                    : "text-secondary"
                                                            } cursor`}
                                                                ></i>
                                                            </Tooltip>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <span className="card-back">
                                                            {ele?.back_side}
                                                        </span>
                                                    </Row>
                                                    <Row className="w-100 bg-dark text-white justify-content-center py-1 fixed-bottom">
                                                        <span>
                                                            Nhấn để xem thuật
                                                            ngữ 👆
                                                        </span>
                                                    </Row>
                                                </BackSide>
                                            </Flippy>
                                        </Slide>
                                    ))
                                ) : (
                                    <Flippy
                                        style={{
                                            width: "100%",
                                            height: "450px",
                                        }} /// these are optional style, it is not necessary
                                        flipOnHover={false} // default false
                                        flipOnClick={false} // default false
                                    >
                                        <FrontSide
                                            style={{
                                                backgroundColor: "#fff",
                                            }}
                                            className="d-flex flex-column align-items-center justify-content-center px-0"
                                        >
                                            <Row>
                                                {this.state.loading ? (
                                                    <Spin
                                                        size="large"
                                                        indicator={
                                                            <LoadingOutlined
                                                                style={{
                                                                    fontSize:
                                                                        "50px",
                                                                }}
                                                                spin
                                                            />
                                                        }
                                                    />
                                                ) : (
                                                    this.renderEmpty()
                                                )}
                                            </Row>
                                        </FrontSide>
                                    </Flippy>
                                )}
                            </Row>
                            <Row className="navi-btn justify-content-center">
                                <Col
                                    md={5}
                                    className="mt-3 d-flex justify-content-between align-items-center"
                                >
                                    <Tooltip
                                        placement="bottom"
                                        title="Thẻ trước đó"
                                    >
                                        <Fab
                                            color="primary"
                                            aria-label="add"
                                            onClick={() => this.backCard()}
                                            disabled={
                                                this.state.sets?.length <= 0
                                            }
                                        >
                                            <i className="far fa-angle-left"></i>
                                        </Fab>
                                    </Tooltip>

                                    <Tooltip
                                        placement="bottom"
                                        title={
                                            !this.filterCard()[
                                                this.state.currentCard
                                            ]?.remember
                                                ? "Đánh dấu là đã thuộc"
                                                : "Đánh dấu là chưa thuộc"
                                        }
                                    >
                                        <Fab
                                            variant="extended"
                                            className={`text-white ${
                                                !this.filterCard()[
                                                    this.state.currentCard
                                                ]?.remember
                                                    ? "bg-success"
                                                    : "bg-danger"
                                            }`}
                                            aria-label="remembered"
                                            disabled={
                                                this.state.sets?.length <= 0 ||
                                                this.state.loading
                                            }
                                            onClick={() => this.updateCard()}
                                        >
                                            <b>
                                                {!this.filterCard()[
                                                    this.state.currentCard
                                                ]?.remember
                                                    ? "Đã nhớ"
                                                    : "Học lại"}
                                            </b>
                                        </Fab>
                                    </Tooltip>

                                    <Tooltip
                                        placement="bottom"
                                        title="Thẻ tiếp theo"
                                    >
                                        <Fab
                                            color="primary"
                                            aria-label="add"
                                            onClick={() => this.forwardCard()}
                                            disabled={
                                                this.state.sets?.length <= 0
                                            }
                                        >
                                            <i className="far fa-angle-right"></i>
                                        </Fab>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            );
        } else {
            return <Redirect to={ROUTER.MADE} />;
        }
    }

    handleFilterChange = (value) => {
        const backup = this.state.sets;
        this.setState({
            filter: value,
            loading: true,
            currentCard: 0,
            sets: [],
        });
        window.setTimeout(
            () =>
                this.setState({
                    loading: false,
                    sets: [...backup],
                }),
            100
        );
    };

    filterCard() {
        let value = this.state.filter;
        if (value === "learning") {
            return this.state.sets.filter((e) => e.remember == 0);
        } else if (value === "learned") {
            return this.state.sets.filter((e) => e.remember == 1);
        } else {
            return this.state.sets;
        }
    }

    shuffleCard = () => {
        const backup = [...this.state.sets];
        this.setState({
            loading: true,
            sets: [],
        });
        setTimeout(() => {
            this.setState({
                sets: _.shuffle(backup),
                loading: false,
            });
            this.context(
                "success",
                "Thành công",
                "Tráo danh sách thẻ thành công"
            );
        }, 1000);
    };

    renderEmpty() {
        let filter = this.state.filter;
        if (filter == "all") {
            return (
                <span className="card-front">
                    <Result title="Danh sách rỗng" />
                </span>
            );
        } else if (filter == "learning") {
            return (
                <span className="card-front">
                    <Result
                        status="success"
                        title="Bạn đã học thuộc hết học phần này"
                    />
                </span>
            );
        } else if (filter == "learned") {
            return (
                <span className="card-front">
                    <Result
                        status="warning"
                        title="Bạn chưa học thuộc thuật ngữ nào trong học phần này"
                    />
                </span>
            );
        }
    }

    async getDetail() {
        try {
            this.setState({
                loading: true,
            });
            const res = await requestSetDetail({
                id: this.props.location?.state?.id,
            });
            this.setState({
                loading: false,
                sets: [...res?.data?.cards],
                data: res.data,
            });
        } catch (e) {
            this.setState({
                loading: false,
            });
        }
    }

    forwardCard() {
        if (this.state.currentCard == this.filterCard().length - 1) {
            this.setState({
                currentCard: 0,
            });
        } else {
            this.setState({
                currentCard: this.state.currentCard + 1,
            });
        }
    }

    backCard() {
        if (this.state.currentCard == 0) {
            this.setState({
                currentCard: this.filterCard().length - 1,
            });
        } else {
            this.setState({
                currentCard: this.state.currentCard - 1,
            });
        }
    }
}

export default withRouter(Learn);
