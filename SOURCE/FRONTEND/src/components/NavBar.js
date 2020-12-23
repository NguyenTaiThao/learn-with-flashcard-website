import React, { Component } from 'react'
import '@styles/NavBar.css'
import { ROUTER } from "@constants/Constant"
import Divider from '@material-ui/core/Divider';
import { Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppstoreOutlined,
    HomeOutlined,
    BarChartOutlined,
    FolderOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';

import { withRouter } from "react-router-dom"

const { SubMenu } = Menu;
const drawerWidth = 256;

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

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
        )
    }

    listMenu = () => (
        <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={this.state.collapsed}
            className=""
            style={{ maxWidth: "256px" }}
        >
            <div
                onClick={this.toggleCollapsed}
                className={`collapse-toggle text-right pr-4 py-3`}
            >
                {React.createElement(this.state.collapsed ?
                    MenuUnfoldOutlined : MenuFoldOutlined
                )}
            </div>

            <Divider />

            <Menu.Item
                key="1"
                icon={<HomeOutlined style={{ fontSize: "20px" }} />}
                onClick={() => this.props.history.push(ROUTER.USER_HOME)}
            >
                <b>Trang chủ</b>
            </Menu.Item>

            <Menu.Item
                key="2"
                icon={<BarChartOutlined style={{ fontSize: "20px" }} />}
                onClick={() => this.props.history.push(ROUTER.PROGRESS)}
            >
                <b>Tiến độ</b>
            </Menu.Item>

            <Menu.Item
                key="3"
                icon={<AppstoreOutlined style={{ fontSize: "20px" }} />}
                onClick={() => this.props.history.push(ROUTER.SET)}
            >
                <b>Học phần</b>
            </Menu.Item>

            <Divider />

            <SubMenu
                key="sub1"
                icon={<FolderOutlined style={{ fontSize: "20px" }} />}
                title={<b>Thư mục</b>}
            >
                <Menu.Item
                    key="5"
                    onClick={() => this.props.history.push(ROUTER.FOLDER)}
                >
                    Tất cả
                </Menu.Item>
                <Menu.Item
                    key="6"
                    onClick={() => this.props.history.push(ROUTER.FOLDER_CONTENT)}
                >
                    Thư mục 1
                </Menu.Item>
                <Menu.Item
                    key="7"
                    onClick={() => this.props.history.push(ROUTER.FOLDER_CONTENT)}
                >
                    Thư mục 2
                </Menu.Item>
                <Menu.Item
                    key="8"
                    onClick={() => this.props.history.push(ROUTER.FOLDER_CREATE)}
                >
                    <span className="text-info">Thêm thư mục</span>
                </Menu.Item>
            </SubMenu>

            <SubMenu
                key="sub2"
                icon={<UsergroupAddOutlined style={{ fontSize: "20px" }} />}
                title={<b>Lớp học</b>}
            >
                <Menu.Item key="9">Lớp 10</Menu.Item>
                <Menu.Item key="10">Lớp 11</Menu.Item>
                <Menu.Item key="11">
                    <span className="text-info">Tham gia hoặc tạo lớp</span>
                </Menu.Item>
            </SubMenu>

            <Divider />
        </Menu>

        // </div>
    )
}

export default withRouter(NavBar)
