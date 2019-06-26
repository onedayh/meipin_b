import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {logIn} from "../../action/user";
import {connect} from 'react-redux';
import history from '../../router/history';
import axios from '../../axios';
import md5 from  'js-md5';
const {Item} = Form;

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    login = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/merchant/Open/loginByPassword', {
                    ...values,
                    // mobile: values.mobile,
                    // password: md5(values.password)
                }).then(res => {
                    this.props.__login(res);
                    history.replace('/m1');
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return(
            <Form onSubmit={this.login}>
                <Item>
                    {getFieldDecorator('mobile', {
                        rules: [{ required: true, message: '请输入账号' }]
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}} />} placeholder="请输入账号" />
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0, .25)'}} />} type="password" placeholder="请输入密码" />
                    )}
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                </Item>
            </Form>

        )
    }
}

const LoginForm = Form.create({ name: 'login' })(Login);

const mapDispatchToProps = dispatch => ({
    __login: loginInfo => dispatch(logIn(loginInfo))
})

export default connect(null, mapDispatchToProps)(LoginForm)