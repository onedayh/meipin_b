import React, {Component} from 'react';

export default class OpenResult extends Component{
    constructor(props) {
        super(props);
        this.state = {
            type: 1,    // 1-正在审核 2-审核失败 3-审核成功 4-开店成功
        }
    }

    render() {
        const {type} = this.state;
        return(
            <div>
                {
                    type === 1 ? (
                        <p>正在审核</p>
                    ) : type === 2 ? (
                        <p>审核失败</p>
                    ) : type === 3 ? (
                        <p>审核成功</p>
                    ) : type === 4 ? (
                        <p>开店成功</p>
                    ) : null
                }
            </div>
        )
    }

}