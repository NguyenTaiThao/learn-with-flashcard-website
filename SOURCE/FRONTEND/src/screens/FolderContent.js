import React, { Component } from "react";
import "@styles/FolderContent.css";
import { Row, Col } from "react-bootstrap";
import { Skeleton, Popconfirm, Card, Tooltip, Button } from "antd";
import { EditOutlined, DeleteOutlined, BookOutlined } from "@ant-design/icons";
import { withRouter, Redirect } from "react-router-dom";
import { ROUTER } from "@constants/Constant";
import {
    requestFolderDetail,
    requestRemoveFolder,
    requestRemoveSet,
    requestSetNoFolder,
} from "@constants/Api";
import reactotron from "reactotron-react-js";
import NotifyContext from "@context/NotifyContext";
import { connect } from "react-redux";
import { getFolders } from "@src/redux/actions";
import Pagination from "@material-ui/lab/Pagination";

class FolderContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hasMore: true,
            data: null,
            removeLoading: false,
            popconfirmFolder: false,
            addSetModal: false,
            folderList: [],
            currentPage: 1,
            page: 1,
        };
    }

    static contextType = NotifyContext;

    componentDidMount() {
        this.getDetail();
        this.getFolder();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state?.id !== this.props.location.state?.id) {
            this.setState({}, () => this.getDetail());
        }
    }

    render() {
        const id = this.props.location?.state?.id;
        const { data, loading } = this.state;

        if (id) {
            return (
                <>
                    <Row className="bg-white folder-content px-md-4 py-5">
                        <Col md={8}>
                            <Row>
                                <span className="set-count">
                                    {data && data?.folders?.total_sets} học phần
                                </span>
                                <span className="vertical-divider">|</span>
                                <span className="made-by">
                                    tạo bởi{" "}
                                    <span className="mader typical-text">
                                        {data && data?.folders?.author}
                                    </span>
                                </span>
                            </Row>
                            <Row className="align-items-center">
                                <i class="fal fa-folder folder-icon"></i>
                                <span className="title">
                                    {data && data?.folders?.name}
                                </span>
                            </Row>
                            <Row>
                                <span className="discription">
                                    {data && data?.folders?.description}
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
                                    title="Bạn muốn xóa thư mục này và tất cả các học phần trong nó?"
                                    onConfirm={this.removeFolder}
                                    onCancel={() =>
                                        this.handlePopconfirm(
                                            "popconfirmFolder",
                                            false
                                        )
                                    }
                                    visible={this.state.popconfirmFolder}
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                    okButtonProps={{
                                        loading: this.state.removeLoading,
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<i class="far fa-trash"></i>}
                                        size="large"
                                        onClick={() =>
                                            this.handlePopconfirm(
                                                "popconfirmFolder",
                                                true
                                            )
                                        }
                                        className="function-btn"
                                    />
                                </Popconfirm>
                            </Tooltip>
                        </Col>
                    </Row>

                    <Row className="justify-content-between w-75 py-4 px-4">
                        {data?.folders?.sets?.map((ele, index) => (
                            <Card
                                style={{ width: 400, marginTop: 16 }}
                                actions={[
                                    <Tooltip placement="bottom" title="Học">
                                        <BookOutlined
                                            key="learn"
                                            onClick={() =>
                                                this.pushRef(
                                                    ROUTER.LEARN,
                                                    ele?.id
                                                )
                                            }
                                        />
                                    </Tooltip>,
                                    <Tooltip
                                        placement="bottom"
                                        title="Chỉnh sửa"
                                    >
                                        <EditOutlined key="edit" />
                                    </Tooltip>,
                                    <Tooltip placement="bottom" title="Xóa">
                                        <Popconfirm
                                            title="Bạn muốn xóa học phần này?"
                                            onConfirm={() =>
                                                this.removeSet(ele.id)
                                            }
                                            okText="Đồng ý"
                                            cancelText="Hủy"
                                            okButtonProps={{
                                                loading:
                                                    this.state.removeLoading,
                                            }}
                                        >
                                            <DeleteOutlined key="delete" />
                                        </Popconfirm>
                                    </Tooltip>,
                                ]}
                            >
                                <Card.Meta
                                    title={ele && ele?.title}
                                    description={`${
                                        ele && ele?.number_of_cards
                                    } thuật ngữ`}
                                />
                            </Card>
                        ))}
                    </Row>
                    <Row className="justify-content-center w-75">
                        <Pagination
                            count={Math.ceil(
                                data?.paginate?.total_items /
                                    data?.paginate?.items_per_page
                            )}
                            color="primary"
                            size="large"
                            page={this.state.page}
                            disabled={this.state.loading}
                            onChange={(e, page) => this.handlePagi(page)}
                        />
                    </Row>
                </>
            );
        } else {
            return <Redirect to={ROUTER.FOLDER} />;
        }
    }

    handlePagi(page) {
        this.setState(
            {
                page: page,
            },
            () => this.getDetail()
        );
    }

    pushRef(link, id) {
        this.props.history.push({
            pathname: link,
            state: { id: id },
        });
    }

    handlePopconfirm = (popconfirm, value) => {
        this.setState({
            [popconfirm]: value,
        });
    };

    removeSet = async (id) => {
        try {
            this.setState({
                removeLoading: true,
            });

            await requestRemoveSet({ set_id: id });

            const newSet = this.state.data.sets.filter((e) => e.id != id);
            this.setState({
                removeLoading: false,
                data: {
                    ...this.state.data,
                    sets: [...newSet],
                    total_sets: parseInt(this.state?.data?.total_sets) - 1,
                },
            });

            this.context("success", "Thành công", "Xóa học phần thành công.");
        } catch (e) {
            this.setState({
                removeLoading: false,
            });
        }
    };

    getDetail = async () => {
        try {
            this.setState({
                loading: true,
            });
            const res = await requestFolderDetail({
                id: this.props.location?.state?.id,
                current_page: this.state.page,
            });
            this.setState({
                loading: false,
                data: res?.data,
            });
        } catch (e) {
            reactotron.log("folder content error", e);
            this.context("error", "Thất bại", e.msg);
        }
    };

    removeFolder = async () => {
        try {
            this.setState({
                removeLoading: true,
            });

            await requestRemoveFolder({
                folder_id: this.props.location?.state?.id,
            });

            this.setState({
                removeLoading: false,
                popconfirmFolder: false,
            });
            this.context("success", "Thành công", "Xoá thư mục thành công.");
            this.props.getFolders({ page: 1 });
            this.props.history.push(ROUTER.FOLDER);
        } catch (e) {
            this.setState({
                removeLoading: false,
                popconfirmFolder: false,
            });
            this.context("error", "Thất bại", e.msg);
        }
    };

    getFolder = async () => {
        try {
            this.setState({ modalLoading: true });
            const res = await requestSetNoFolder({
                page: this.state.currentPage,
                folder_id: this.props.location?.state?.id,
            });
            this.setState({
                modalLoading: false,
                folderList: { ...res.data },
                currentPage: parseInt(this.state.currentPage) + 1,
            });
        } catch (err) {
            this.setState({ modalLoading: false });
            this.context("error", "Thất bại", err.msg);
        }
    };
}

const mapDispatchToProps = {
    getFolders,
};

export default connect(null, mapDispatchToProps)(withRouter(FolderContent));
