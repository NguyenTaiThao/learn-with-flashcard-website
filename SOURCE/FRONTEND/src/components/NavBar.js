import React, { Component } from 'react'
import { ButtonGroup, Button, DropdownButton, Dropdown, Collapse } from 'react-bootstrap'
import './NavBar.css'

export default class NavBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            workShift:'false',
            host:'false'
        }
    }
    handleClickWorkShift(){
        let value = !(this.state.workShift == 'true')

        this.setState({
            workShift:value.toString(),
        })
    }
    handleClickHost(){
        let value = !(this.state.host == 'true')

        this.setState({
            host:value.toString(),
        })
    }
    render() {
        return (
            <>
            <div class="wrapper">
                <ButtonGroup vertical>
                    <Button>Tổng quan</Button>
                    <Button>Đơn hàng</Button>
                    <Button>Kiện hàng</Button>
                    <Button>Kho Hàng</Button>
                    <Button>Khách Hàng</Button>
                    
                    <Button
                        aria-controls="host"
                        aria-expanded={this.state.workShift == 'true'}
                        onClick={() => this.handleClickHost()}
                    >
                        Nhà xe
                      
                    </Button>
                    <Collapse in={this.state.host == 'true'} className="secondaryNav">
                        <div id="host">
                            <ButtonGroup vertical data-toggle="dropdown">
                                <Button>Nhà xe</Button>
                                <Button>Xe</Button>
                                <Button>Tài xế</Button>
                                <Button>Chuyến xe</Button>
                            </ButtonGroup>
                        </div>
                    </Collapse>
                    <Button>Nhân sự</Button>
                    <Button>Yêu cầu rút tiền</Button>
                    <Button>Loại kiện</Button>
                    <Button>Loại xe</Button>
                    <Button>Kích thước</Button>
                    <Button>Ca làm việc</Button>
                    
                    <Button
                        aria-controls="workShift"
                        aria-expanded={this.state.workShift == 'true'}
                        onClick={() => this.handleClickWorkShift()}
                    >
                        Thống kê
                   
                    </Button>
                    <Collapse in={this.state.workShift == 'true'} className="secondaryNav">
                        <div id="workShift">
                            <ButtonGroup vertical data-toggle="dropdown">
                                <Button>DS hệ thống</Button>
                                <Button>DS gom hàng</Button>
                                <Button>DS nhà xe</Button>
                                <Button>Đơn hàng</Button>
                                <Button>Kiện hàng</Button>
                                <Button>Thu ngân</Button>
                            </ButtonGroup>
                        </div>
                    </Collapse>
                    

                    <Button>Thiết lập</Button>
                    <Button>Người dùng</Button>
                    <Button>Lịch sử ĐH</Button>
                </ButtonGroup>
            </div>
            </>
        )
    }
}
