import React, { Component } from 'react';
import { Spin } from 'antd';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export default class UserScreen extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Backdrop
                className="back-drop"
                open={this.props.open}
                // open={true}
            >
                <CircularProgress className="loading-icon" />
            </Backdrop>
            // <Spin indicator={antIcon} />
        )
    }
}
