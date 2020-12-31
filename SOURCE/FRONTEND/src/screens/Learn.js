import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Row, Col } from "react-bootstrap"
import "@styles/learn.css"
import { Divider, Fab, Slide } from "@material-ui/core"
import { Progress, Button } from 'antd';
import { withRouter, Redirect } from "react-router-dom"
import { ROUTER } from "@constants/Constant"
import { requestSetDetail } from "@constants/Api"
import reactotron from "reactotron-react-js"
class Learn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sets: [],
            currentCard: 0,
            data: null,
        }
    }

    componentDidMount(){
        this.getDetail()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.location.state?.id !== this.props.location.state?.id){
            this.getDetail()
        }
    }

    async getDetail() {
        try{
            this.setState({
                loading:true,
            })
            const res = await requestSetDetail({id:this.props.location?.state?.id})
            reactotron.log("card", res)
            this.setState({
                loading:false,
                sets:[...res?.data?.cards],
                data:res.data
            })
        }catch(e){

        }
    }

    render() {
        const id = this.props.location?.state?.id
        const {data, sets} = this.state
        if (id) {
            return (
                <>
                    <Row className="h-100 learn">
                        <Col xs={2} className="float-div ml-3 px-0">
                            <Row
                                className="align-items-baseline py-3"
                            >
                                <i
                                    class="far fa-chevron-left pl-4 pr-2 typical-text back-icon"
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
                                <i class="fad fa-clipboard pr-2 title-icon"></i>
                                <span className="title-text">Thẻ ghi nhớ</span>
                            </Row>

                            <Row className="flex-column justify-content-center align-items-center py-5">
                                <Progress
                                    type="circle"
                                    percent={data?.completed || 0}
                                    format={() => (data?.remembered_cards||0) + "/" + (sets?.length || 0)}
                                />
                                <span>Tiến độ</span>
                            </Row>

                            <Row className="px-2 pt-5">
                                <Button block className="my-2">
                                    <span className="typical-text">
                                        Bắt đầu
                                </span>
                                </Button>
                                <Button block className="my-2">
                                    <span className="typical-text">
                                        Xáo trộn thẻ
                                </span>
                                </Button>
                                <Button block className="my-2">
                                    <span className="typical-text">
                                        Chơi game
                                </span>
                                </Button>
                            </Row>
                        </Col>


                        <Col xs={9} className="d-flex flex-column justify-content-center hide">
                            <Row>
                                {this.state.sets.map((ele, index) =>
                                    <Slide direction="left" in={this.state.currentCard === index} mountOnEnter unmountOnExit>
                                        <Flippy
                                            flipOnHover={false} // default false
                                            flipOnClick={true} // default false
                                            flipDirection="horizontal" // horizontal or vertical
                                            ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                                            style={{ width: '800px', height: '500px' }} /// these are optional style, it is not necessary
                                        >
                                            <FrontSide
                                                style={{
                                                    backgroundColor: '#fff',
                                                }}
                                                className="d-flex flex-column align-items-center justify-content-center px-0"
                                            >
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
                                )}

                            </Row>
                            <Row className="navi-btn">
                                <Col md={5} className="offset-md-3 mt-3 d-flex justify-content-between align-items-center">
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        onClick={() => this.backCard()}
                                    >
                                        <i class="far fa-angle-left"></i>
                                    </Fab>
                                    <Fab
                                        variant="extended"
                                        className="bg-success text-white"
                                        aria-label="remembered"
                                    >
                                        <b><i class="far fa-check"></i> Đã nhớ</b>
                                    </Fab>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        onClick={() => this.forwardCard()}
                                    >
                                        <i class="far fa-angle-right"></i>
                                    </Fab>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </>
            )
        } else {
            return (
                <Redirect to={ROUTER.MADE} />
            )
        }
    }
    forwardCard() {
        if (this.state.currentCard == (this.state.sets.length - 1)) {
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
                currentCard: this.state.sets.length - 1
            })
        } else {
            this.setState({
                currentCard: this.state.currentCard - 1
            })
        }
    }
}

export default withRouter(Learn);
