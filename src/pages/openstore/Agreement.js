import React, {Component} from 'react';
import {Button, Checkbox} from 'antd';
import history from "../../router/history";

export default class Agreement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            agree: false
        }
    }

    onChange = e => {
        this.setState({
            agree: e.target.checked
        })
    }

    render() {
        const {agree} = this.state;
        return(
            <div>
                <Checkbox onChange={this.onChange}>我已阅读协议</Checkbox>
                <Button type='primary' onClick={() => history.push('/open_store/open_result')} disabled={!agree}>下一步</Button>
            </div>
        )
    }

}