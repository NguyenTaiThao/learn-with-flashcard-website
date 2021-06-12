import React, { Component } from "react";
import "@styles/NavBar.css";
import { ROUTER } from "@constants/Constant";
import Divider from "@material-ui/core/Divider";
import { Menu, Skeleton } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    FolderOutlined,
    RocketOutlined,
} from "@ant-design/icons";
import { getFolders } from "@src/redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row } from "react-bootstrap";

const { SubMenu } = Menu;

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    componentDidMount() {
        this.props.getFolders({ page: 1 });
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        let path = nextProps.location.pathname;
        if (path) {
            if (path == ROUTER.FOLDER_CONTENT) {
                this.setState({
                    path: path + nextProps.location.state?.id,
                });
            } else {
                this.setState({ path: path });
            }
        }
    }

    render() {
        return (
            <>
                <div className="d-flex wrapper">
                    {this.listMenu()}
                    <div className="content-wrapper">
                        {this.props.Component}
                    </div>
                </div>
            </>
        );
    }

    listMenu = () => (
        <Menu
            onClick={this.handleClick}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={this.state.collapsed}
            style={{ maxWidth: "256px" }}
            selectedKeys={[this.state.path]}
        >
            <div
                onClick={this.toggleCollapsed}
                className={`collapse-toggle text-right pr-4 py-3`}
            >
                {React.createElement(
                    this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                )}
            </div>

            <Divider />
            <Menu.Item
                key={ROUTER.USER_HOME}
                icon={<BarChartOutlined style={{ fontSize: "20px" }} />}
                onClick={() => this.props.history.push(ROUTER.USER_HOME)}
            >
                <b>Thống kê</b>
            </Menu.Item>
            <Menu.Item
                key={ROUTER.SET}
                icon={<AppstoreOutlined style={{ fontSize: "20px" }} />}
                onClick={() => this.props.history.push(ROUTER.SET)}
            >
                <b>Học phần</b>
            </Menu.Item>

            <Menu.Item
                key={ROUTER.LEARN}
                icon={<RocketOutlined style={{ fontSize: "20px" }} />}
                onClick={() => this.props.history.push(ROUTER.LEARN)}
            >
                <b>Luyện tập</b>
            </Menu.Item>

            <Divider />

            <SubMenu
                key="sub1"
                icon={<FolderOutlined style={{ fontSize: "20px" }} />}
                title={<b>Thư mục</b>}
            >
                <Menu.Item
                    key={ROUTER.FOLDER}
                    onClick={() => this.props.history.push(ROUTER.FOLDER)}
                >
                    Tất cả
                </Menu.Item>
                {this.props.folderState?.isLoading && (
                    <>
                        <Row className="justify-content-center">
                            <Skeleton.Input
                                style={{ width: 200 }}
                                active={true}
                                size="default"
                                className="pb-2"
                            />
                            <Skeleton.Input
                                style={{ width: 200 }}
                                active={true}
                                size="default"
                                className="pb-2"
                            />
                            <Skeleton.Input
                                style={{ width: 200 }}
                                active={true}
                                size="default"
                                className="pb-2"
                            />
                            <Skeleton.Input
                                style={{ width: 200 }}
                                active={true}
                                size="default"
                                className="pb-2"
                            />
                        </Row>
                    </>
                )}
                {this.props.folderState?.data?.folders?.length > 0 &&
                    this.props.folderState?.data?.folders.map((e, index) => {
                        return (
                            <Menu.Item
                                key={ROUTER.FOLDER_CONTENT + e.id}
                                onClick={() =>
                                    this.pushRef(ROUTER.FOLDER_CONTENT, e.id)
                                }
                            >
                                <span>{e.name}</span>
                            </Menu.Item>
                        );
                    })}
                <Menu.Item
                    key={ROUTER.FOLDER_CREATE}
                    onClick={() =>
                        this.props.history.push(ROUTER.FOLDER_CREATE)
                    }
                >
                    <span className="text-info">Thêm thư mục</span>
                </Menu.Item>
            </SubMenu>

            <Divider />
        </Menu>

        // </div>
    );

    activeMenu = () => {
        var pathName = "/" + window.location.pathname.split("/")[1];
    };

    pushRef(link, id) {
        this.props.history.push({
            pathname: link,
            state: { id: id },
        });
    }
}

const mapStateToProps = (state) => ({
    folderState: state.folderReducer,
});

const mapDispatchToProps = {
    getFolders,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
