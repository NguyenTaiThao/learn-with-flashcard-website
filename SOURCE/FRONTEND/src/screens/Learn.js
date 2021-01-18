import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Row, Col } from "react-bootstrap"
import "@styles/learn.css"
import { Divider, Fab, Slide, Tooltip, IconButton } from "@material-ui/core"
import ButtonMate from "@material-ui/core/Button"
import { Progress, Button, Select, Result, Spin, Modal, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { withRouter, Redirect } from "react-router-dom"
import { ROUTER, GAME_TYPE } from "@constants/Constant"
import { requestSetDetail, requestGame } from "@constants/Api"
import _ from "lodash"
import reactotron from "reactotron-react-js"
import NotifyContext from "@context/NotifyContext"

class Learn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sets: [],
            cardStatus: [],
            currentCard: 0,
            data: null,
            autoLearn: null,
            gameModal: false,
            gameLoading: false,
            gameType: null,
            selectGame: {
                currentQuestion: 0,
                point: 0,
            }
        }
        this.flippy = []
    }

    static contextType = NotifyContext

    componentDidMount() {
        this.getDetail()
        this.getGameSelect()
        document.addEventListener("keydown", this.navFunc, false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state?.id !== this.props.location.state?.id) {
            this.getDetail()
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.navFunc, false);
    }

    render() {
        const id = this.props.location?.state?.id
        const { data, sets } = this.state
        if (id) {
            return (
                <>
                    <Row className="h-100 learn">
                        <Col xs={2} className="float-div ml-3 px-0">
                            <Row
                                className="align-items-baseline py-3"
                            >
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
                                <Tooltip placement="bottom" title="Tiến độ học của học phần này">
                                    <Progress
                                        type="circle"
                                        percent={data?.completed || 0}
                                        format={() => (data?.remembered_cards || 0) + "/" + (sets?.length || 0)}
                                    />
                                </Tooltip>
                                <span>Tiến độ</span>
                            </Row>

                            <Row className="px-2 pt-5">
                                <Tooltip placement="bottom" title="Chế độ auto learn">
                                    <Button
                                        block
                                        className="my-2"
                                        disabled={this.state.sets?.length <= 0}
                                        onClick={() => this.autoLearn()}
                                    >
                                        <span className="typical-text">
                                            {this.state.autoLearn ? "Dừng lại" : "Bắt đầu"}
                                        </span>
                                    </Button>
                                </Tooltip>

                                <Button
                                    block
                                    disabled={this.state.sets?.length <= 0}
                                    className="my-2"
                                    onClick={() => this.shuffleCard()}
                                >
                                    <span className="typical-text">Xáo trộn thẻ</span>
                                </Button>
                                <Tooltip placement="bottom" title="Cùng chơi game để học thuộc thuật ngữ">
                                    <Button
                                        block
                                        disabled={this.state.sets?.length <= 0}
                                        className="my-2"
                                        onClick={() => this.showGame(true)}
                                    >
                                        <span
                                            className="typical-text"
                                        >
                                            Chơi game
                                        </span>
                                    </Button>
                                </Tooltip>
                            </Row>
                        </Col>


                        <Col xs={8} className="d-flex flex-column justify-content-center hide">
                            <Row className="justify-content-end mb-2">
                                <Select
                                    defaultValue="all"
                                    style={{ background: "white" }}
                                    bordered={false}
                                    onChange={(value) => this.handleFilterChange(value)}
                                    disabled={this.state.sets?.length <= 0}
                                >
                                    <Select.Option value="all">
                                        <b className="select-type">Tất cả thẻ</b>
                                    </Select.Option>
                                    <Select.Option value="learned">
                                        <b className="select-type">Thẻ đã thuộc</b>
                                    </Select.Option>
                                    <Select.Option value="learning">
                                        <b className="select-type">Thẻ chưa thuộc</b>
                                    </Select.Option>
                                </Select>
                            </Row>

                            <Row className="">
                                {this.filterCard().length > 0 ? this.filterCard().map((ele, index) =>
                                    <Slide
                                        direction="down"
                                        in={this.state.currentCard === index}
                                        mountOnEnter
                                        unmountOnExit
                                        timeout={{
                                            enter: 650,
                                            exit: 0,
                                        }}
                                        style={this.state.currentCard === index ? {} : { display: "none" }}
                                    >
                                        <Flippy
                                            flipOnHover={false} // default false
                                            flipOnClick={true} // default false
                                            flipDirection="horizontal" // horizontal or vertical
                                            ref={(r) => this.flippy[index] = r} // to use toggle method like this.flippy.toggle()
                                            style={{ width: '100%', height: '450px' }} /// these are optional style, it is not necessary
                                        >
                                            <FrontSide
                                                style={{
                                                    backgroundColor: '#fff',
                                                }}
                                                className="d-flex flex-column align-items-center justify-content-center px-0"
                                            >
                                                <Row className="fixed-top justify-content-end">
                                                    <Tooltip placement="bottom" title={ele?.remember ? "Bạn đã thuộc thẻ này" : "Bạn vẫn chưa thuộc thẻ này"}>
                                                        <i
                                                            className={`fad fa-bookmark remember-icon mr-2 
                                                                        ${ele?.remember ? "text-success" : "text-secondary"} cursor`}
                                                        ></i>
                                                    </Tooltip>
                                                </Row>
                                                <Row>
                                                    <span className="card-front">
                                                        {ele?.front_side}
                                                    </span>
                                                </Row>
                                                <Row className="w-100 bg-dark text-white justify-content-center py-1 fixed-bottom">
                                                    <span>Nhấn để xem định nghĩa 👆</span>
                                                </Row>
                                            </FrontSide>

                                            <BackSide
                                                style={{ backgroundColor: '#fff' }}
                                                className="d-flex flex-column align-items-center justify-content-center px-0"
                                            >
                                                <Row className="fixed-top">
                                                    <Tooltip
                                                        placement="bottom"
                                                        title={ele?.remember ? "Bạn đã thuộc thẻ này" : "Bạn vẫn chưa thuộc thẻ này"}
                                                    >
                                                        <i className={`fad fa-bookmark remember-icon ml-2 
                                                            ${ele?.remember ? "text-success" : "text-secondary"} cursor`}></i>
                                                    </Tooltip>
                                                </Row>
                                                <Row>
                                                    <span className="card-back">
                                                        {ele?.back_side}
                                                    </span>
                                                </Row>
                                                <Row className="w-100 bg-dark text-white justify-content-center py-1 fixed-bottom">
                                                    <span>Nhấn để xem thuật ngữ 👆</span>
                                                </Row>
                                            </BackSide>
                                        </Flippy>
                                    </Slide>
                                ) :
                                    <Flippy
                                        style={{ width: '100%', height: '450px' }} /// these are optional style, it is not necessary
                                        flipOnHover={false} // default false
                                        flipOnClick={false} // default false
                                    >
                                        <FrontSide
                                            style={{
                                                backgroundColor: '#fff',
                                            }}
                                            className="d-flex flex-column align-items-center justify-content-center px-0"
                                        >
                                            <Row>
                                                {this.state.loading ?
                                                    <Spin
                                                        size="large"
                                                        indicator={<LoadingOutlined style={{ fontSize: "50px" }} spin />}
                                                    />
                                                    :
                                                    this.renderEmpty()
                                                }
                                            </Row>
                                        </FrontSide>
                                    </Flippy>
                                }
                            </Row>
                            <Row className="navi-btn justify-content-center">
                                <Col md={5}
                                    className="mt-3 d-flex justify-content-between align-items-center"
                                >
                                    <Tooltip placement="bottom" title="Thẻ trước đó">
                                        <Fab
                                            color="primary"
                                            aria-label="add"
                                            onClick={() => this.backCard()}
                                            disabled={this.state.sets?.length <= 0}
                                        >
                                            <i className="far fa-angle-left"></i>
                                        </Fab>
                                    </Tooltip>

                                    <Tooltip placement="bottom" title="Đánh dấu là đã thuộc">
                                        <Fab
                                            variant="extended"
                                            className="bg-success text-white"
                                            aria-label="remembered"
                                            disabled={this.state.sets?.length <= 0}
                                        >
                                            <b><i className="far fa-check"></i> Đã nhớ</b>
                                        </Fab>
                                    </Tooltip>

                                    <Tooltip placement="bottom" title="Thẻ tiếp theo">
                                        <Fab
                                            color="primary"
                                            aria-label="add"
                                            onClick={() => this.forwardCard()}
                                            disabled={this.state.sets?.length <= 0}
                                        >
                                            <i className="far fa-angle-right"></i>
                                        </Fab>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {this.renderGame()}
                </>
            )
        } else {
            return (
                <Redirect to={ROUTER.MADE} />
            )
        }

    }

    handleFilterChange = (value) => {
        const backup = this.state.sets
        this.setState({
            filter: value,
            loading: true,
            sets: [],
        })
        window.setTimeout(() => this.setState({
            loading: false,
            sets: [...backup]
        }), 100)
    }

    filterCard() {
        let value = this.state.filter
        // this.setState({loading:true})
        if (value === "learning") {
            return this.state.sets.filter((e) => e.remember === 0)
        } else if (value === "learned") {
            return this.state.sets.filter((e) => e.remember === 1)
        } else {
            return this.state.sets
        }
    }

    shuffleCard = () => {
        const backup = [...this.state.sets]
        this.setState({
            loading: true,
            sets: [],
        })
        setTimeout(() => {
            this.setState({
                sets: _.shuffle(backup),
                loading: false,
            })
            this.context("success", "Thành công", "Tráo danh sách thẻ thành công")
        }, 1000)

    }

    autoLearn = () => {
        if (!this.state.autoLearn) {
            this.setState({
                currentCard: 0
            })

            setTimeout(() => this.flippy[this.state.currentCard].toggle(), 3000)

            let id = setInterval(() => {
                setTimeout(() => this.flippy[this.state.currentCard].toggle(), 3000)
                this.forwardCard()
            }, 6000);

            this.setState({
                autoLearn: id,
            })
        } else {
            clearInterval(this.state.autoLearn)

            this.setState({
                autoLearn: null
            })
        }
    }

    renderEmpty() {
        let filter = this.state.filter
        if (filter == "all") {
            return (
                <span className="card-front">
                    <Result
                        title="Danh sách rỗng"
                    />
                </span>
            )
        } else if (filter == "learning") {
            return (
                <span className="card-front">
                    <Result
                        status="success"
                        title="Bạn đã học thuộc hết học phần này"
                    />
                </span>
            )
        } else if (filter == "learned") {
            return (
                <span className="card-front">
                    <Result
                        status="warning"
                        title="Bạn chưa học thuộc thuật ngữ nào trong học phần này"
                    />
                </span>
            )
        }


    }

    renderGame() {
        return (
            <>
                <Modal
                    title="Cùng chơi nào!!!"
                    centered
                    keyboard={false}
                    maskClosable={false}
                    visible={this.state.gameModal}
                    onOk={() => this.showGame(false)}
                    onCancel={() => this.showGame(false)}
                    width={1000}
                    footer={null}
                >
                    <Row
                        style={{ height: "400px" }}
                        className="game-div"
                    >
                        {this.renderGameContent()}
                    </Row>
                </Modal>
            </>
        )
    }

    renderGameContent() {
        const { gameType } = this.state
        if (!gameType) {
            return (
                <>
                    <Col className="d-flex align-items-center justify-content-center flex-column">
                        <Row>
                            <span className="select-title mb-3">Chọn game và chiến nào 💪💪</span>
                        </Row>
                        <Row>
                            <ButtonMate
                                variant="outlined"
                                color="primary"
                                size="large"
                                style={{
                                    height: "100px",
                                    width: "230px"
                                }}
                                className="mr-1"
                                onClick={() => this.selectGame(GAME_TYPE.SELECT)}
                            >
                                <span>Game trắc nghiệm</span>
                            </ButtonMate>

                            <ButtonMate
                                variant="outlined"
                                color="secondary"
                                size="large"
                                style={{
                                    height: "100px",
                                    width: "230px"
                                }}
                                className="ml-1"
                                onClick={() => this.selectGame(GAME_TYPE.SELECT)}
                            >
                                <span>Game điền ô trống</span>
                            </ButtonMate>
                        </Row>
                    </Col>
                </>
            )
        } else if (gameType == GAME_TYPE.SELECT) {
            return (
                <>
                    {this.renderGameSelect()}
                </>
            )
        } else {
            return (
                <>

                </>
            )
        }
    }

    renderGameSelect() {
        const { selectGame, gameData, gameLoading } = this.state
        if (gameLoading) {
            return (
                <Row className="align-items-center justify-content-center w-100">
                    <Spin
                        size="large"
                        indicator={<LoadingOutlined style={{ fontSize: "50px" }} spin />}
                    />
                </Row>
            )
        } else {
            reactotron.log()
            return (
                <>
                    <Col className="multi-choice">
                        <Row className="justify-content-center mt-3">
                            <span className="question">{gameData?.questions[selectGame.currentQuestion]?.question}</span>
                        </Row>
                        <Row className="mb-3 mt-5">
                            <Col md={6}>
                                <Alert message="Môi trường, tài nguyên" type="warning" className="anwser" />
                            </Col>
                            <Col md={6}>
                                <Alert message="Môi trường, tài nguyên" type="info" className="anwser" />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <Alert message="Môi trường, tài nguyên" type="info" className="anwser" />
                            </Col>
                            <Col md={6}>
                                <Alert message="Môi trường, tài nguyên" type="info" className="anwser" />
                            </Col>
                        </Row>
                        <Row className="mt-md-5 justify-content-center">
                            <IconButton
                                aria-label="delete"
                                className="next-btn"
                                color="primary"

                            >
                                <i className="fas fa-chevron-double-right"></i>
                            </IconButton>
                        </Row>
                    </Col>
                </>
            )
        }
    }

    selectGame = (value) => {
        this.setState({
            gameLoading: true,
            gameType: value,
        })

        window.setTimeout(() => this.setState({
            gameLoading: false,
        }), 300)

    }

    showGame = (value) => {
        if (!value) {
            this.setState({
                gameType: null
            })
        }
        this.setState({ gameModal: value })
    }

    navFunc = (event) => {
        // right arrow
        if (event.keyCode === 39) {
            this.forwardCard()
        }

        // left arrow
        if (event.keyCode === 37) {
            this.backCard()
        }

        // space
        if (event.keyCode === 32) {
            this.flippy[this.state.currentCard].toggle()
        }
    }

    async getDetail() {
        try {
            this.setState({
                loading: true,
            })
            const res = await requestSetDetail({ id: this.props.location?.state?.id })
            this.setState({
                loading: false,
                sets: [...res?.data?.cards],
                data: res.data
            })
        } catch (e) {
            this.setState({
                loading: false,
            })
        }
    }

    async getGameSelect() {
        try {
            this.setState({
                gameLoading: true
            })
            const res = await requestGame({ id: this.props.location?.state?.id })
            this.setState({
                gameLoading: false,
                gameData: res.data
            })
        } catch (e) {
            this.setState({
                gameLoading: false
            })
        }
    }

    forwardCard() {
        if (this.state.currentCard == (this.filterCard().length - 1)) {
            this.setState({
                currentCard: 0
            })
        } else {
            this.setState({
                currentCard: this.state.currentCard + 1
            })
        }
    }

    backCard() {
        if (this.state.currentCard == 0) {
            this.setState({
                currentCard: this.filterCard().length - 1
            })
        } else {
            this.setState({
                currentCard: this.state.currentCard - 1
            })
        }
    }
}

export default withRouter(Learn);
