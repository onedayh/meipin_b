import '../../assets/less/openstore/steps.less';
import React, {Component} from 'react';
import axios from '../../axios';
import history from '../../router/history';
import {connect} from 'react-redux';
import Steps from '../../components/OpenStoreStep';
import {Form, Input, Button, Modal, Radio, Switch, message} from 'antd';
const {Item} = Form, RadioGroup = Radio.Group;


class TradeSetting extends Component{
    constructor(props) {
        super(props);
        this.state = {
            can_express: false,
            can_intra_shipping: false,

            showCity: false,
            send_way: 0
        }
    }

    nextStep = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                const {can_express, can_intra_shipping} = this.state;
                axios.post('/merchant/Merchant_shop/TransactionSettings', {
                    ...values,
                    can_express,
                    can_intra_shipping,
                    shop_id: this.props.$$shop_id
                }).then(res => {
                    message.success('保存成功');
                    history.push('/open_store/store_info')
                })
            }
        })

    }

    componentWillMount() {

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
        };
        const {can_express, can_intra_shipping, showCity} = this.state;
        const {$$shop_id} = this.props;
        return(
            <div>
                <Steps current={1} />
                <div className='open-content'>
                    <Form {...formItemLayout} onSubmit={this.nextStep}>
                        <p>交易设置</p>
                        <Item label='代付款订单取消时间'>
                            {
                                getFieldDecorator('cancel_minute', {
                                    rules: [{required: true, message: '请填写代付款订单取消时间'}]
                                })(
                                    <div>
                                        <Input style={{width: '80px'}} placeholder='分钟'/>
                                        <span>分钟内未付款，自动取消订单</span>
                                    </div>

                                )
                            }
                        </Item>
                        <Item label='发货后自动确认收货时间'>
                            {
                                getFieldDecorator('default_confirm_day', {
                                    rules: [{required: true, message: '请填写发货后自动确认收货时间'}]
                                })(
                                    <div>
                                        <span>发货后</span>
                                        <Input style={{width: '80px'}} placeholder='天'/>
                                        <span>天自动确认收货时间</span>
                                    </div>
                                )
                            }
                        </Item>
                        <p>配送设置</p>
                        <Item label='快递发货'>
                            {
                                getFieldDecorator('can_express')(
                                    <div>
                                        <Switch onChange={e => this.setState({can_express: e})} />
                                        {
                                            can_express && <span style={{color: 'red', cursor: 'pointer', paddingLeft: '30px'}}>编辑</span>
                                        }
                                    </div>


                                )
                            }
                        </Item>
                        <Item label='同城配送'>
                            {
                                getFieldDecorator('can_intra_shipping')(
                                    <div>
                                        <Switch onChange={e => this.setState({can_intra_shipping: e})}/>
                                        {
                                            can_intra_shipping && <span onClick={() => this.setState({showCity: true})} style={{color: 'red', cursor: 'pointer', paddingLeft: '30px'}}>编辑</span>
                                        }
                                    </div>
                                )
                            }
                        </Item>
                        <Item label=' ' className='btn'>
                            <Button htmlType='submit' type='primary'>下一步</Button>
                        </Item>
                    </Form>
                    <CitySendForm shopid={$$shop_id} show={showCity} hide={() => this.setState({showCity: false})}/>
                </div>
            </div>
        )
    }
}
const TradeSettingForm = Form.create({ name: 'trade_setting' })(TradeSetting);


class CitySend extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            defaultAdd: '',
            send_way: 0,
            threeList: []
        }
    }

    save = e => {
        e.preventDefault();
        console.log(this.state.send_way)
        this.props.form.validateFields((err, values) => {
            if(!err){
                const {send_way, delivery_address} = values;
                axios.post('/merchant/Merchant_shop/SameCity', {
                    shop_id: this.props.shopid,
                    intra_shipping_id: send_way ? values.three : send_way,
                    delivery_address: delivery_address
                }).then(res => {
                    message.success('保存成功');
                    this.props.hide()
                })
            }
        })
    }

    hide = () => {
        this.props.hide()
    }

    componentWillMount() {
        this.getData()
    }

    getData = () => {
        axios.post('/merchant/Merchant_shop/shipping', {
            shop_id: this.props.shopid
        }).then(res => {
            this.setState({
                defaultAdd: res.shop.address,
                threeList: res.shipping_di
            })
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {show} = this.props;
        const {defaultAdd, threeList, send_way} = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        return (
            <Modal
                visible={show}
                title='同城配送'
                footer={null}
                onCancel={this.hide}
            >
                <Form onSubmit={this.save} {...formItemLayout}>
                    <Item label='取货地址'>
                        {
                            getFieldDecorator('delivery_address', {
                                initialValue: defaultAdd,
                                rules: [{required: true, message: '请输入取货地址'}]
                            })(
                                <Input placeholder='请输入取货地址' />
                            )
                        }
                    </Item>
                    <Item label='配送方式'>
                        {
                            getFieldDecorator('send_way', {
                                initialValue: 0,
                                rules: [{required: true, message: '请选择配送方式'}]
                            })(
                                <RadioGroup onChange={e => this.setState({send_way: e.target.value})}>
                                    <Radio value={0}>商家自配送</Radio>
                                    <Radio value={1}>第三方同城配送</Radio>
                                </RadioGroup>
                            )
                        }
                    </Item>
                    {
                        Boolean(send_way) && (
                            <Item label='开通服务商'>
                                {
                                    getFieldDecorator('three', {
                                        rules: [{required: true, message: '请选择服务商'}]
                                    })(
                                        <RadioGroup>
                                            {
                                                threeList.map(item =>
                                                    <Radio disabled={!item.is_valid} key={item.shipping_id} value={item.shipping_id}>{item.shipping_name}</Radio>
                                                )
                                            }
                                        </RadioGroup>
                                    )
                                }
                            </Item>
                        )
                    }
                    <Item label=' ' className='btn'>
                        <Button type='primary' htmlType='submit'>保存</Button>
                    </Item>
                </Form>
            </Modal>
        )
    }

}
const CitySendForm = Form.create({ name: 'city_send' })(CitySend);

const mapStateToProps = state => ({
    $$shop_id: state.user.shop_id
})
export default connect(mapStateToProps)(TradeSettingForm)