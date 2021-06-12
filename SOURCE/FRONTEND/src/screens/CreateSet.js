import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "antd";
import { TextField, Divider } from "@material-ui/core/";
import { withRouter } from "react-router-dom";
import "@styles/CreateSet.css";
import reactotron from "src/ReactotronConfig";
import { requestCreateSet } from "@constants/Api";
import NotifyContext from "@context/NotifyContext";
import { getFolders } from "@src/redux/actions";
import { connect } from "react-redux";
import { ROUTER } from "@constants/Constant";

const defaultState = {
    name: "",
    discription: "",
    price: 0,
    uploadModal: false,
    newSet: [
        {
            id: 0,
            front_side: "",
            back_side: "",
            remember: 0,
        },
        {
            id: 0,
            front_side: "",
            back_side: "",
            remember: 0,
        },
        {
            id: 0,
            front_side: "",
            back_side: "",
            remember: 0,
        },
        {
            id: 0,
            front_side: "",
            back_side: "",
            remember: 0,
        },
    ],
    file: null,
    loading: false,
};
class CreateSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...defaultState,
        };
    }

    static contextType = NotifyContext;

    render() {
        const { newSet, name, discription } = this.state;
        return (
            <>
                <Row className="justify-content-between px-4 py-4 bg-white pt-5 create-set-header align-items-center">
                    <b className="title">Tạo học phần mới</b>
                    <Button
                        className="typical-btn create-btn "
                        type="primary"
                        onClick={() => this.createSet()}
                        loading={this.state.loading}
                    >
                        <span>Tạo</span>
                    </Button>
                </Row>

                <Row className="bg-white">
                    <Col>
                        <form noValidate autoComplete="off" className="w-100">
                            <Row>
                                <Col md={6}>
                                    <TextField
                                        id="title-set"
                                        label="Tiêu đề của Set"
                                        className="w-100 py-3"
                                        value={name}
                                        onChange={(e) =>
                                            this.handleChangeSet(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <TextField
                                        id="discription-set"
                                        label="Mô tả"
                                        className="w-100 py-3"
                                        value={discription}
                                        onChange={(e) =>
                                            this.handleChangeSet(
                                                "discription",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>

                {newSet?.map((element, index) => (
                    <Row className="new-div mt-4 mx-md-5 py-3">
                        <Col className="px-0">
                            <Row className="align-items-center px-3 pb-2">
                                <Col className="text-left">
                                    <span className="card-order">
                                        {index + 1}
                                    </span>
                                </Col>
                                <Col className="text-right">
                                    <i
                                        className="far fa-trash new-div-icon cursor"
                                        onClick={() => this.removeCard(index)}
                                    ></i>
                                </Col>
                            </Row>
                            <Divider />
                            <Row className="pt-3">
                                <Col md={6}>
                                    <TextField
                                        id={`label-set-${index}`}
                                        label="Thuật ngữ"
                                        className="w-100 py-3"
                                        value={element.front_side}
                                        onChange={(e) =>
                                            this.handleChangeCard(
                                                index,
                                                "front_side",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        id={`back_side-set-${index}`}
                                        label="Ý nghĩa của thuật ngữ"
                                        className="w-100 py-3"
                                        value={element.back_side}
                                        onChange={(e) =>
                                            this.handleChangeCard(
                                                index,
                                                "back_side",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ))}
                <Row
                    className="new-div mt-4 mx-md-5 py-4 align-items-center justify-content-center cursor"
                    onClick={() => this.addNewCard()}
                >
                    <b className="new-card-btn">
                        <i className="fas fa-plus"></i> THÊM THẺ MỚI
                    </b>
                </Row>
            </>
        );
    }

    handleShow(modal, value) {
        this.setState({
            [modal]: value,
        });
    }

    async createSet() {
        const { name, price, newSet } = this.state;
        try {
            this.setState({
                loading: true,
            });
            let data = newSet.filter((e) => e.front_side || e.back_side);
            const res = await requestCreateSet({
                id: 0,
                title: name,
                price: price,
                folder_id: this.props.location.state?.folder_id || 0,
                cards: [...data],
            });
            this.setState({
                ...defaultState,
            });

            if (this.props.location.state?.folder_id) {
                this.props.getFolders({ page: 1 });
            }

            this.context(
                "success",
                "Thành công",
                "Thêm mới học phần thành công"
            );
            this.props.history.push(ROUTER.RECENT_ACT);
        } catch (e) {
            reactotron.log(e);
            this.setState({
                loading: false,
            });
            this.context("error", "Thất bại", e.msg);
        }
    }

    handleChangeSet(field, value) {
        this.setState({
            [field]: value,
        });
    }

    handleChangeCard(index, field, value) {
        let newSet = this.state.newSet.map((e, i) =>
            i === index ? { ...e, [field]: value } : e
        );
        this.setState({
            newSet: [...newSet],
        });

        reactotron.log(this.state);
    }

    addNewCard() {
        this.setState({
            newSet: [
                ...this.state.newSet,
                { id: 0, front_side: "", back_side: "", remember: 0 },
            ],
        });
    }

    removeCard(index) {
        let newSet = this.state.newSet.filter((e, i) => index != i);
        this.setState({
            newSet: [...newSet],
        });
    }
}

const mapDispatchToProps = {
    getFolders,
};

export default connect(null, mapDispatchToProps)(withRouter(CreateSet));
