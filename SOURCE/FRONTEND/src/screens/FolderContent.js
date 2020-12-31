import React, { Component } from 'react';
import "@styles/FolderContent.css"
import { Row, Col } from "react-bootstrap"
import { Skeleton, Popconfirm, Card, Tooltip, Button } from 'antd';
import { EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { withRouter, Redirect } from 'react-router-dom'
import { ROUTER } from "@constants/Constant"
import { requestFolderDetail } from "@constants/Api"
import reactotron from "reactotron-react-js"
class FolderContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: null,
        }
    }

    componentDidMount() {
        this.getDetail()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state?.id !== this.props.location.state?.id) {
            this.getDetail()
        }
    }

    getDetail = async () => {
        try {
            this.setState({
                loading: true
            })
            const res = await requestFolderDetail({ id: this.props.location?.state?.id })
            reactotron.log(res)
            this.setState({
                loading: false,
                data: res?.data
            })
        } catch (e) {
            reactotron.log("folder content error", e)
        }
    }

    render() {
        const id = this.props.location?.state?.id
        const { data, loading } = this.state

        if (id) {
            return (
                <>
                    <Row className="bg-white folder-content px-md-4 py-5">
                        <Col md={8}>
                            <Row>
                                <span className="set-count">{data && data.total_sets} học phần</span>
                                <span className="vertical-divider">|</span>
                                <span className="made-by">
                                    tạo bởi <span className="mader typical-text">{data && data.author}</span>
                                </span>
                            </Row>
                            <Row className="align-items-center">
                                <i class="fal fa-folder folder-icon"></i>
                                <span className="title">
                                    {data && data.name}
                                </span>
                            </Row>
                            <Row>
                                <span className="discription">
                                    {data && data.description}
                                </span>
                            </Row>
                        </Col>
                        <Col md={4} className="text-right">
                            <Tooltip placement="bottom" title="Thêm học phần">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<i class="far fa-plus"></i>}
                                    size="large"
                                    className="function-btn"
                                />
                            </Tooltip>
                            <Tooltip placement="bottom" title="Học">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<i class="far fa-book-reader"></i>}
                                    size="large"
                                    className="function-btn"
                                />
                            </Tooltip>
                            <Tooltip placement="bottom" title="Sửa">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<i class="fal fa-calendar-edit"></i>}
                                    size="large"
                                    className="function-btn"
                                />
                            </Tooltip>
                            <Tooltip placement="bottom" title="Xóa">
                                <Popconfirm
                                    title="Bạn muốn xóa học phần này và tất cả các thẻ card trong nó?"
                                    onConfirm={this.removeSet}
                                    // onCancel={cancel}
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                >
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<i class="far fa-trash"></i>}
                                        size="large"
                                        className="function-btn"
                                    />
                                </Popconfirm>
                            </Tooltip>
                        </Col>
                    </Row>

                    <Row className="justify-content-between w-75 py-4 px-4">
                        {data?.sets ? data?.sets?.map((ele, index) =>
                            <Card
                                style={{ width: 400, marginTop: 16 }}
                                actions={[
                                    <Tooltip
                                        placement="bottom"
                                        title="Học"
                                    >
                                        <BookOutlined
                                            key="learn"
                                            onClick={() => this.pushRef(ROUTER.LEARN, ele?.id)}
                                        />
                                    </Tooltip>,
                                    <Tooltip
                                        placement="bottom"
                                        title="Chỉnh sửa"
                                    >
                                        <EditOutlined key="edit" />
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
                                    <Card.Meta
                                        // avatar={
                                        //     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        // }
                                        title={ele && ele?.title}
                                        description={`${ele && ele?.cards.length} thuật ngữ`}
                                    />
                                </Skeleton>
                            </Card>
                        )
                            :
                            [1, 2, 3, 4].map((ele, index) =>
                                <Skeleton loading={loading} avatar active>
                                </Skeleton>
                            )
                        }

                    </Row>
                </>
            )
        } else {
            return (
                <Redirect to={ROUTER.FOLDER} />
            )
        }

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

    removeFolder = async () => {
        try {

        } catch (e) {

        }
    }

}

export default withRouter(FolderContent);
