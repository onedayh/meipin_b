import React, {Component} from 'react';
import {Icon, message, Input} from 'antd';
import {getBase64} from '../utils';
export default class UpdateBtn extends Component{
    static defaultProps = {
        onChange: () => {},
        maxSize: null   // 单位 kb
    }

    constructor(props) {
        super(props);
        this.state = {
            img: null
        }
    }

    onChange = e => {
        const file = e.target.files[0];
        const {maxSize} = this.props;
        if(maxSize && file.size > maxSize * 1024){
            message.error('文件过大，请重新上传');
            return false;
        }
        getBase64(file, res => {
            this.setState({
                img: res
            })
            this.props.onChange(file)
        })
    }

    render(){
        const {img} = this.state;
        return(
            <div style={styles.btnWrap}>
                {
                    img ? (
                        <img style={styles.img} src={img} alt="picture" />
                    ) : (
                        <Icon type='plus' />
                    )
                }
                <Input style={styles.input} onChange={this.onChange} type="file" encType="multipart/form-data"/>
            </div>
        )
    }
}

const styles = {
    btnWrap: {
        width: '102px',
        lineHeight: '102px',
        textAlign: 'center',
        position: 'relative',
        border: '1px dotted red',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9'
    },
    input: {
        opacity:0,
        width:'100%',
        height:'100%',
        position:'absolute',
        top:0,
        left:0,
        cursor: 'pointer'
    },
    img: {
        width: '86px',
        height: '86px'
    }
}