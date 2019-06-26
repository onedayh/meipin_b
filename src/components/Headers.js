import React, {Component} from 'react';
import Tabbar from './Tabbar';
import {Button} from 'antd';
import history from '../router/history';
import {logOut} from "../action/user";
import {connect} from 'react-redux';

class Headers extends Component{
    constructor(props) {
        super(props);

    }

    logout = () => {
        this.props.__logout();
        history.replace('/login')
    }
    render() {
        return(
            <div style={styles.headerWrap}>
                <div style={styles.head}>
                    头部
                    <Button type='primary' onClick={() => history.push('/open_store/basic_info')}>我要开店</Button>
                    <Button type='primary' onClick={this.logout}>退出登录</Button>
                </div>
                <div style={{paddingLeft: '200px', backgroundColor: '#ccc'}}>
                    <Tabbar />
                </div>
            </div>
        )
    }
}

const styles = {
    headerWrap: {
        position: 'fixed',
        width: '100%',
        background: '#eee',
        left: 0,
        top: 0,
        zIndex: 10
    },
    head: {
        height: '80px'
    }
}

const mapDispatchToProps = dispatch => {
    return{
        __logout: () => dispatch(logOut())
    }
}
export default connect(null, mapDispatchToProps)(Headers)