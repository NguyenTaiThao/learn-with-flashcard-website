import React from 'react'
import '../../styles/Login.css'
import { Link, Redirect } from 'react-router-dom'
import { requestLogin } from '../../constants/Api'
import Cookie from 'js-cookie';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'admin',
            password: '123456'
        }
        this.login = this.login.bind(this);
    }

    async login() {
        try {
            // const res = await requestLogin({
            //     USERNAME: this.state.username,
            //     PASS: this.state.password
            // })
            // console.log(res)
            Cookie.set('SESSION_ID', "hihi")
            window.location.href = '/'
        } catch (err) {
            console.log(err)
        }
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    render() {
        const { username, password } = this.state;
        const token = Cookie.get("SESSION_ID");
        if (token) {
            return <Redirect to='/' />
        }
        return (
            <>
                <div className="container-fluid">
                    <div className="loginForm">
                        <img src={require('../../assets/img_logo.png')} alt="logoVitrans" />
                        <form >
                            <div className="form-group">
                                <input type="username"
                                    placeholder="username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => this.handleTextChange('username', e)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    placeholder="Mật khẩu"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => this.handleTextChange('password', e)}
                                />
                            </div >
                            <div className="form-group">
                                <a href="#">Quên mật khẩu?</a>
                            </div>
                            <Link to='/'>
                                <button type="submit"
                                    className="btn btn-danger"
                                    onClick={this.login}
                                >
                                    <div className="login-button-content">

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
export default LoginScreen