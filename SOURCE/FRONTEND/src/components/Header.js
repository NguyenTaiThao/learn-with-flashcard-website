import React, { Component } from 'react'
import "./Header.css"
import {Dropdown} from 'react-bootstrap'

export default class Header extends Component {
    render() {
        return (
            <>
                    <div className="top-bar">
                        <div className="logo top-bar-item">
                            <span>VITRANS</span>
                        </div>
                        <div className="right-size">
                            <div className="infor top-bar-item">
                                logo
                            </div>
                            <div className="user top-bar-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-basic">
                                    Xin chào Admin
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Quyền Admin</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Quyền kho</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Quyền CSKH</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Đổi mật khẩu</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Đăng xuất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
}
