import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap"
import { Button, Upload, Modal, message } from "antd"
import { TextField, MenuItem, Divider } from "@material-ui/core/"
import { withRouter, Link } from "react-router-dom"
import "@styles/CreateSet.css"
import reactotron from 'src/ReactotronConfig';
import { requestCreateSet, requestUpload } from "@constants/Api"
import NotifyContext from "@context/NotifyContext"
import { getFolders } from "@src/redux/actions";
import { connect } from "react-redux"
import { InboxOutlined } from '@ant-design/icons';
import { ROUTER } from "@constants/Constant"

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
            remember: 0
        },
        {
            id: 0,
            front_side: "",
            back_side: "",
            remember: 0
        },
        {
            id: 0,
            front_side: "",
            back_side: "",
            remember: 0
        },
        {
            id: 0,
            front_side: "",
            back_side: "",
            remember: 0
        },

    ],
    file: null,
    loading: false
}
class CreateSet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...defaultState
        }
    }

    static contextType = NotifyContext

    render() {
        const { newSet, name, discription, price } = this.state
        return (
            <>
                <Row className="justify-content-between px-4 py-4 bg-white pt-5 create-set-header align-items-center">
                    <b className="title">Tạo học phần mới</b>
                    <Button
                        className="typical-btn create-btn "
                        type="primary"
                        onClick={() => {
                            if (this.state.file) {
                                this.handleUpload()
                            } else {
                                this.createSet()
                            }
                        }}
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
                                        onChange={(e) => this.handleChangeSet("name", e.target.value)}
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
                                        onChange={(e) => this.handleChangeSet("discription", e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>

                <Row className="bg-white pt-4 pb-5 align-items-center">
                    <Col>
                        {/* <b className="typical-text" id="input-root">+ Nhập từ Excel v.v.</b> */}
                        <input type="file" id="input-root" onChange={(e) => this.handleChangeSet("file", e.target.files[0])}></input>
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
                                <Row className="align-items-end h-100">
                                    <TextField
                                        id="outlined-number"
                                        type="number"
                                        label="Giá tiền"
                                        value={price}
                                        onChange={(e) => this.handleChangeSet("price", e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        className="w-100"
                                    />
                                </Row>
                            </Col>
                            <Col>
                                <Row></Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {!this.state.file && newSet?.map((element, index) =>
                    <Row className="new-div mt-4 mx-md-5 py-3">
                        <Col className="px-0">
                            <Row className="align-items-center px-3 pb-2">
                                <Col className="text-left">
                                    <span className="card-order">{index + 1}</span>
                                </Col>
                                <Col className="text-right">
                                    <i
                                        className="far fa-trash new-div-icon cursor"
                                        onClick={() => this.removeCard(index)}
                                    >

                                    </i>
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
                                        onChange={(e) => this.handleChangeCard(index, "front_side", e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        id={`back_side-set-${index}`}
                                        label="Ý nghĩa của thuật ngữ"
                                        className="w-100 py-3"
                                        value={element.back_side}
                                        onChange={(e) => this.handleChangeCard(index, "back_side", e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
                {!this.state.file ?
                    <Row
                        className="new-div mt-4 mx-md-5 py-4 align-items-center justify-content-center cursor"
                        onClick={() => this.addNewCard()}
                    >
                        <b className="new-card-btn"><i className="fas fa-plus"></i> THÊM THẺ MỚI</b>
                    </Row>
                    :
                    null
                }

                {/* {this.renderUploadModal()} */}
            </>
        )
    }

    createFormData = (dataObject) => {
        let formdata = new FormData()
        const keys = Object.keys(dataObject)
        if (keys.length === 0) {
            return null
        }
        keys.forEach((key) => {
            formdata.append(key, dataObject[key])
        })

        return formdata
    }

    renderUploadModal() {
        const { name, discription, price, newSet } = this.state
        return (
            <>
                <>
                    <Modal
                        title="Tải file lên"
                        centered
                        keyboard={false}
                        maskClosable={false}
                        visible={this.state.uploadModal}
                        onOk={() => this.handleShow("uploadModal", false)}
                        onCancel={() => this.handleShow("uploadModal", false)}
                        width={700}
                        footer={null}
                        bodyStyle={{ background: "#f6f7fb" }}
                    >
                        <Upload.Dragger
                            name='file'
                            multiple={false}
                            action={(file) => requestUpload(file)}
                            onChange={(info) => this.state.handleUpload({
                                "id": 0,
                                "title": name,
                                "price": price,
                            },
                                info)}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click hoặc kéo thả file vào để upload</p>
                            <p className="ant-upload-hint">
                                Tính năng này chỉ hỗ trợ file dạng Excel có format dữ liệu được quy định trước
                            </p>
                        </Upload.Dragger>
                    </Modal>
                </>
            </>
        )
    }

    async handleUpload(file) {
        const { name, discription, price } = this.state
        try {
            const formdata = this.createFormData({
                "title": name,
                "price": price,
                "file": this.state.file
            });

            this.setState({ loading: true });
            await requestUpload(formdata)
            this.setState({ loading: false });
            this.context("success", "Thành công", "Import dữ liệu thành công")
            this.props.history.push(ROUTER.RECENT_ACT)
        } catch (err) {
            this.setState({ loading: false });
            this.context("error", "Thất bại", err.msg)

        }
    }

    handleShow(modal, value) {
        this.setState({
            [modal]: value
        })
    }

    async createSet() {
        const { name, discription, price, newSet } = this.state
        try {
            this.setState({
                loading: true
            })
            let data = newSet.filter(e => (e.front_side || e.back_side))
            const res = await requestCreateSet({
                "id": 0,
                "title": name,
                "price": price,
                "folder_id": this.props.location.state?.folder_id || 0,
                "cards": [...data]
            })
            this.setState({
                ...defaultState
            })

            if (this.props.location.state?.folder_id) {
                this.props.getFolders({ page: 1 })
            }

            this.context("success", "Thành công", "Thêm mới học phần thành công")
            this.props.history.push(ROUTER.RECENT_ACT)
        } catch (e) {
            reactotron.log(e)
            this.setState({
                loading: false
            })
            this.context("error", "Thất bại", e.msg)
        }
    }

    handleChangeSet(field, value) {
        this.setState({
            [field]: value
        })
    }

    handleChangeCard(index, field, value) {
        let newSet = this.state.newSet.map((e, i) => i === index ? { ...e, [field]: value } : e)
        this.setState({
            newSet: [...newSet]
        })

        reactotron.log(this.state)
    }

    addNewCard() {
        this.setState({
            newSet: [...this.state.newSet, { id: 0, front_side: "", back_side: "", remember: 0 }]
        })
    }

    removeCard(index) {
        let newSet = this.state.newSet.filter((e, i) => index != i)
        this.setState({
            newSet: [...newSet]
        })
    }


}

const mapDispatchToProps = {
    getFolders
}

export default connect(null, mapDispatchToProps)(withRouter(CreateSet));