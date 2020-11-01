import React from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import {LoginOutlined} from '@ant-design/icons'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    render() {
        const { email, password } = this.state;
        return (
            <>
                <div class="container-fluid wrapper">
                    <div class="col-lg-5 col-sm-9 loginForm">
                        <img src="/Pictures/logo.png" alt="logoVitrans" />
                        <form >
                            <div class="form-group">
                                <input type="email"
                                    placeholder="Email"
                                    class="form-control"
                                    value={email}
                                    onChange={(e) => this.handleTextChange('email', e)}
                                />
                            </div>
                            <div class="form-group">
                                <input type="password"
                                    placeholder="Mật khẩu"
                                    class="form-control"
                                    value={password}
                                    onChange={(e) => this.handleTextChange('password', e)}
                                />
                            </div >
                            <div class="form-group">
                                <a href="#">Quên mật khẩu?</a>
                            </div>
                            <Link to='/'>
                                <button type="submit"
                                    class="btn btn-danger">
                                    <div class="login-button-content">
                                        <LoginOutlined className="LoginOutlined" />
                                        <span>Đăng nhập</span>
                                    </div>
                                </button>
                            </Link>

                        </form>
                    </div>
                </div>
            </>
        )
    }
}
export default Login