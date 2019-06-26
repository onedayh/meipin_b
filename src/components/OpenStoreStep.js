import '../assets/less/openstore/steps.less';
import history from '../router/history';
import React, {Component} from 'react';
import {Steps} from 'antd';
const {Step} = Steps;


export default class OpenStoreStep extends Component{
    constructor(props) {
        super(props);
    }

    go = route => {
        history.replace(`/open_store/${route}`)
    }

    render(){
        const {current} = this.props;
        return(
            <Steps className='open-steps' direction="vertical" current={current}>
                <Step className='open-step' onClick={() => this.go('basic_info')} title="基础信息" />
                <Step className='open-step' onClick={() => this.go('trade_setting')} title="交易设置" />
                <Step className='open-step' onClick={() => this.go('store_info')} title="店铺资质" />
                <Step className='open-step' onClick={() => this.go('add_goods')} title="添加商品" />
            </Steps>
        )
    }

}