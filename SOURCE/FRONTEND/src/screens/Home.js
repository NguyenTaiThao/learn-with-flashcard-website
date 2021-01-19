import React, {
    Component
} from 'react';
import {
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import CarouselBootstrap from 'react-bootstrap/Carousel'
import "@styles/Home.css"
import { Link, Redirect } from "react-router-dom"
import {ROUTER} from "@constants/Constant"
import { Carousel, Select } from "antd";
import Divider from '@material-ui/core/Divider';
import {
    YoutubeOutlined,
    FacebookFilled,
    TwitterOutlined,
    InstagramOutlined
} from '@ant-design/icons';
import Cookie from "js-cookie"

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const check = Cookie.get("SESSION_ID") ? true : false

        if (check) {
            return(
                <Redirect to={ROUTER.USER_HOME}/>
            )
        } else {
            return (
                <>
                    <div className="wrap">

                        {this.renderPage1()}

                        {this.renderPage2()}

                        {this.renderFooter()}
                    </div>
                </>
            )
        }
    }

    
}

export default HomeScreen