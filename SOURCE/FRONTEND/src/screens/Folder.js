import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap"
import { Avatar, Radio, Divider, Skeleton, Result, Button } from 'antd'
import { Link, withRouter } from "react-router-dom"
import "@styles/Folder.css"
import { ROUTER } from "@constants/Constant"
import { requestFolders, requestRecentSets, requestRecentAct, requestLearn } from "@constants/Api"
import reactotron from 'reactotron-react-js';
import { connect } from 'react-redux'
class Folder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: this.props.screen,
            recentActivities: [],
            learned: [1, 2, 3, 4, 5],
            made: [],
            folder: [],
            loading: false
        }
    }

    componentDidMount() {
        if(this.props.folderState?.data?.folders?.length > 0){
            this.setState({
                folder:this.props.folderState?.data?.folders
            })
        }
        this.getRecentSets()
        this.getRecentAct()
        this.getLearn()
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        reactotron.log("next", nextProps)
        if(nextProps.folderState?.data?.folders?.length > 0){
            this.setState({
                folder:[...nextProps.folderState?.data?.folders]
            })
        }
    }

    async getRecentSets() {
        try {
            this.setState({
                loading: true
            })
            let res = await requestRecentSets({page:1});
            this.setState({
                made: [...res?.data],
                loading: false
            })
        } catch (e) {
            this.setState({ loading: false })
        }
    }

    async getRecentAct() {
        try {
            this.setState({
                loading: true
            })
            let res = await requestRecentAct({page:1});
            this.setState({
                recentActivities: [...res?.data],
                loading: false
            })
        } catch (e) {
            this.setState({ loading: false })
        }
    }

    async getLearn() {
        try {
            this.setState({
                loading: true
            })
            let res = await requestLearn({page:1});
            this.setState({
                learned: [...res?.data],
                loading: false
            })
        } catch (e) {
            this.setState({ loading: false })
        }
    }

    render() {
        const data = this.state[this.props.screen]
        const user = this.props.userState.data
        return (
            <>
                <Row className="bg-white p-4 folder">
                    <Col md={2} className="py-3 d-flex justify-content-center align-items-center">
                        <Avatar
                            style={{ "background": "red" }}
                            size={110}
                        >
                            <span className="text-uppercase">{ user && user?.name?.charAt(0)}</span>
                        </Avatar>
                    </Col>
                    <Col md={9} className="d-flex flex-column justify-content-center">
                        <Row>
                            <span className="username">{user && user?.name}</span>
                        </Row>
                        <Row className="mt-2">
                            <Radio.Group value={this.state.filter} onChange={(e) => this.handleFilter(e)}>
                                <Radio.Button
                                    value="recent-activities"
                                onClick={() => this.pushRef(ROUTER.RECENT_ACT)}
                                >
                                    <span className="txt-btn m-2">Hoạt động gần đây</span>
                                </Radio.Button>
                                <Radio.Button
                                    value="made"
                                    onClick={() => this.pushRef(ROUTER.SET)}
                                >
                                    <span className="txt-btn m-2">Đã tạo</span>
                                </Radio.Button>
                                <Radio.Button
                                    value="learned"
                                    onClick={() => this.pushRef(ROUTER.SET_LEARNED)}
                                >
                                    <span className="txt-btn m-2">Đã học</span>
                                </Radio.Button>
                                <Radio.Button
                                    value="folder"
                                    onClick={() => this.pushRef(ROUTER.FOLDER)}
                                >
                                    <span className="txt-btn m-2">Thư mục</span>
                                </Radio.Button>
                            </Radio.Group>
                        </Row>
                    </Col>
                </Row>

                <Row className="my-4 px-md-4">
                    <Col md={8}>
                        <Divider orientation="left" className="count-divider" plain>
                            <span className="element-count">
                                Tổng có: <span className="font-number">{this.state[this.props.screen]?.length || 0}</span>
                            </span>
                        </Divider>
                        {this.renderData(data)}
                    </Col>
                </Row>
            </>
        )
    }

    renderData(data) {
        if (this.state.loading) {
            return (
                <>
                    {this.renderSkeletor()}
                </>
            )
        } else {
            if (data.length > 0) {
                return (
                    <>
                        {data?.map((ele) => this.renderContent(ele))}
                    </>
                )
            } else {
                return (
                    <>
                        <Result
                            title="Danh sách rỗng"
                            extra={
                                <Button type="primary" key="console">
                                    Tạo mới
                                </Button>
                            }
                        />
                    </>
                )
            }
        }
    }

    handleFilter = (event) => {
        this.setState({
            filter: event.target.value
        })
    }

    renderSkeletor() {
        return (
            [1, 2, 3, 4].map(() => <Skeleton paragraph={{ rows: 1 }} active className="mb-2" />)
        )
    }

    renderContent(ele) {
        let screen = this.props.screen
        if (screen == "folder") {
            return (
                <>
                    <Row
                        className="float-div folder-element py-md-2 mt-3 cursor"
                        onClick={() => this.pushRef(ROUTER.FOLDER_CONTENT, ele.id)}
                    >
                        <Col md={12}>
                            <span className="info">{ele && ele?.number_of_sets} học phần</span>
                        </Col>
                        <Col md={12}>
                            <i class="fal fa-folder element-name-icon"></i>
                            <span className="element-name">{ele.name}</span>
                        </Col>
                    </Row>
                </>
            )
        } else if (screen == "recentActivities") {
            return (
                <>
                    <Row className="float-div folder-element py-md-2 mt-3 cursor"
                        onClick={() => this.pushRef(ROUTER.LEARN, ele.id)}
                    >
                        <Col md={12}>
                            <span className="info">2 thuật ngữ</span>
                        </Col>
                        <Col md={12}>
                            <i class="fal fa-folder element-name-icon"></i>
                            <span className="element-name">IT nihongo 1</span>
                        </Col>
                    </Row>
                </>
            )
        } else if (screen == "made") {
            return (
                <>
                    <Row className="float-div folder-element py-md-2 mt-3 cursor"
                        onClick={() => this.pushRef(ROUTER.LEARN, ele.id)}
                    >
                        <Col md={12}>
                            <span className="info">{ele && ele?.number_of_cards} thuật ngữ</span>
                        </Col>
                        <Col md={12}>
                            <i class="fal fa-bookmark element-name-icon"></i>
                            <span className="element-name">{ele && ele?.title}</span>
                        </Col>
                    </Row>
                </>
            )
        } else if (screen == "learned") {
            return (
                <>
                    <Row className="float-div folder-element py-md-2 mt-3 cursor"
                        onClick={() => this.pushRef(ROUTER.LEARN, ele.id)}
                    >
                        <Col md={12}>
                            <span className="info">{ele && ele?.number_of_cards} thuật ngữ</span>
                        </Col>
                        <Col md={12}>
                            <i class="far fa-check element-name-icon"></i>
                            <span className="element-name">{ele && ele?.title}</span>
                        </Col>
                    </Row>
                </>
            )
        }

    }

    pushRef(link, id) {
        this.props.history.push({
            pathname: link,
            state: { id: id }
        })
    }
}

const mapStateToProps = (state) => ({
    userState: state.userReducer,
    folderState: state.folderReducer,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Folder));
