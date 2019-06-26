import '../../assets/less/openstore/steps.less';
import React, {Component} from 'react';
import history from '../../router/history';
import areaOptions from '../../assets/js/area';
import axios from '../../axios';
import UpdateBtn from '../../components/UpdateBtn';
import {connect} from 'react-redux';
import {createShop} from "../../action/user";
import Steps from '../../components/OpenStoreStep';
import {Form, Input, Select, Button, Cascader, TimePicker, Checkbox, Icon, Tooltip, Radio, message} from 'antd';
const {Option} = Select, {Item} = Form, InputGroup = Input.Group, CheckboxGroup = Checkbox.Group, RadioGroup = Radio.Group;


class BasicInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            start_time: '',
            end_time: '',

            yyList: [],
            yyType: 0,

            aaa: null
        }
    }

    getYYType = () => {
        axios.get('/merchant/Merchant_shop/category').then(res => {
            let list = [], type = 0;
            const twoList = res.filter(item => item.parent_id);
            if(twoList.length === 0){
                list = res.map(item => ({
                    label: item.category_name,
                    value: item.category_id
                }));
                type = 0;
            }else{
                type = 1;
                list = res.filter(item => !item.parent_id).map(item => ({
                    label: item.category_name,
                    value: item.category_id,
                    children: []
                }));
                list.forEach(item => {
                    twoList.forEach(it=> {
                        if(item.category_id === it.parent_id){
                            item.children.push({
                                label: it.category_name,
                                value: it.category_id,
                            })
                        }
                    })
                })
            }
            this.setState({
                yyList: list,
                yyType: type
            })
        })
    }

    nextStep = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                const {start_time, end_time} = this.state;
                const {shop_area, last_few_days} = values;
                let formdata = new FormData();
                const params = {
                    ...values,
                    start_time,
                    end_time,
                    last_few_days: last_few_days.join(','),
                    province_id: shop_area[0] || '',
                    city_id: shop_area[1] || '',
                    district_id: shop_area[2] || ''
                }
                for(let key in params){
                    formdata.append(key, params[key])
                }
                axios.post('/merchant/merchant_shop/MerchantAdd', formdata).then(res => {
                    message.success('保存成功');
                    this.props.__createShop(res.merchant_id, res.shop_id);
                    history.push('/open_store/trade_setting')
                })
            }
        });
    }

    changeTime = (timeStr, key) => {
        this.setState({
            [key]: timeStr
        })
    }

    componentWillMount() {
        // const {$$shop_id} = this.props;
        // if($$shop_id){
        //     axios.post('/merchant/Merchant_shop/shop', {
        //         // params: {
        //             shop_id: $$shop_id
        //         // }
        //     }).then(res => {
        //         console.log(res)
        //     })
        // }
        this.getYYType()
    }

    render() {
        const {yyList, yyType} = this.state;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 3 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
        };
        const dayOptions = [
            {label: '星期一', value: '1'},
            {label: '星期二', value: '2'},
            {label: '星期三', value: '3'},
            {label: '星期四', value: '4'},
            {label: '星期五', value: '5'},
            {label: '星期六', value: '6'},
            {label: '星期日', value: '7'}
        ];

        return(
            <div className='open-wrap'>
                <Steps current={0} />
                <div className='open-content'>
                    <Form {...formItemLayout} onSubmit={this.nextStep}>
                        <Item label='店铺类型'>
                            {
                                getFieldDecorator('shop_type', {
                                    initialValue: 1,
                                    rules: [{required: true, message: '请选择店铺类型'}]
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>网店</Radio>
                                        <Radio value={0}>实体店</Radio>
                                    </RadioGroup>
                                )
                            }
                        </Item>
                        <p>店铺照片</p>
                        <Item label={(
                            <span>
                                门面照&nbsp;
                                <Tooltip title="一张真实美观的门脸照">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('the_facade_img', {
                                    rules: [{required: true, message: '请上传门面照'}]
                                })(
                                    <UpdateBtn />
                                )
                            }
                        </Item>
                        <Item label={(
                            <span>
                                店内照&nbsp;
                                <Tooltip title="一张简洁干净的店内照片">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('in_store_img', {
                                    rules: [{required: true, message: '请上传店内照'}]
                                })(
                                    <UpdateBtn />
                                )
                            }
                        </Item>
                        <Item label={(
                            <span>
                                门店logo&nbsp;
                                <Tooltip title="上传与店铺匹配的logo（大小不超过500k）">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('logo', {
                                    rules: [{required: true, message: '请上传门店logo'}]
                                })(
                                    <UpdateBtn maxSize={500}/>
                                )
                            }
                        </Item>
                        <p>基础信息</p>
                        <Item label='店铺名称'>
                            {
                                getFieldDecorator('shop_name', {
                                    rules: [{required: true, message: '请填写店铺名称'}]
                                })(
                                    <Input placeholder='请填写店铺名称'/>
                                )
                            }
                        </Item>
                        <Item label='店铺电话'>
                            {
                                getFieldDecorator('mobile', {
                                    rules: [{required: true, message: '请填写手机号码'}]
                                })(
                                    <Input placeholder='请填写手机号码'/>
                                )
                            }
                        </Item>
                        <Item label='店铺营业电话'>
                            {
                                getFieldDecorator('shop_phone')(
                                    <Input placeholder='请填写固定电话'/>
                                )
                            }
                        </Item>
                        <Item label='联系人姓名'>
                            {
                                getFieldDecorator('shop_contact', {
                                    rules: [{required: true, message: '请填写联系人姓名'}]
                                })(
                                    <Input placeholder='请填写联系人姓名'/>
                                )
                            }
                        </Item>
                        <Item label='联系人电话'>
                            {
                                getFieldDecorator('shop_mobile', {
                                    rules: [{required: true, message: '请填写联系人电话'}]
                                })(
                                    <Input placeholder='请填写联系人电话'/>
                                )
                            }
                        </Item>
                        {
                            yyType ? (
                                <Item label='营业类型'>
                                    {
                                        getFieldDecorator('category_id', {
                                            rules: [{required: true, message: '请选择营业类型'}]
                                        })(
                                            <Cascader options={yyList} placeholder='请选择营业类型'/>
                                        )
                                    }
                                </Item>
                            ) : (
                                <Item label='营业类型'>
                                    {
                                        getFieldDecorator('category_id', {
                                            rules: [{required: true, message: '请选择营业类型'}]
                                        })(
                                            <Select placeholder='请选择营业类型' onChange={value => console.log(value)}>
                                                {
                                                    yyList.map(item =>
                                                        <Option key={item.value} value={item.value}>{item.label}</Option>
                                                    )
                                                }
                                            </Select>
                                        )
                                    }
                                </Item>
                            )
                        }
                        <Item label='门店区域'>
                            {
                                getFieldDecorator('shop_area', {
                                    rules: [{required: true, message: '请选择门店区域'}]
                                })(
                                    <Cascader options={areaOptions} placeholder='请选择门店区域'/>
                                )
                            }
                        </Item>
                        <Item label='门店地址'>
                            {
                                getFieldDecorator('address', {
                                    rules: [{required: true, message: '请填写门店地址'}]
                                })(
                                    <Input placeholder='请填写门店地址'/>
                                )
                            }
                        </Item>
                        <Item label='门店位置' required>
                            <InputGroup compact>
                                <Item style={{width: '50%'}}>
                                    {
                                        getFieldDecorator('longitude', {
                                            rules: [{required: true, message: '请填写门店经度'}]
                                        })(
                                            <Input placeholder='经度'/>
                                        )
                                    }

                                </Item>
                                <Item style={{width: '50%'}}>
                                    {
                                        getFieldDecorator('latitude', {
                                            rules: [{required: true, message: '请填写门店纬度'}]
                                        })(
                                            <Input placeholder='纬度'/>
                                        )
                                    }
                                </Item>
                            </InputGroup>
                        </Item>
                        <Item label='营业时间' required>
                            <Item style={{display: 'inline-block', width: '45%'}}>
                                {
                                    getFieldDecorator('start_time', {
                                        rules: [{required: true, message: '请填写开始时间'}]
                                    })(
                                        <TimePicker onChange={(time, timeStr) => this.changeTime(timeStr, 'start_time')} style={{width: '100%'}} format='HH:mm' placeholder='开始时间' />
                                    )
                                }
                            </Item>
                            <div style={{width: '10%', display: 'inline-block', textAlign: 'center'}}>至</div>
                            <Item style={{display: 'inline-block', width: '45%'}}>
                                {
                                    getFieldDecorator('end_time', {
                                        rules: [{required: true, message: '请填写结束时间'}]
                                    })(
                                        <TimePicker onChange={(time, timeStr) => this.changeTime(timeStr, 'end_time')} style={{width: '100%'}} format='HH:mm' placeholder='结束时间'/>
                                    )
                                }
                            </Item>
                        </Item>
                        <Item label='营业日期'>
                            {
                                getFieldDecorator('last_few_days', {
                                    rules: [{required: true, message: '请选择营业日期'}]
                                })(
                                    <CheckboxGroup options={dayOptions} />
                                )
                            }
                        </Item>
                        <Item label='推荐人电话'>
                            {
                                getFieldDecorator('parent_mobile', {
                                    rules: [{required: true, message: '请填写推荐人电话'}]
                                })(
                                    <Input placeholder='请填写推荐人电话'/>
                                )
                            }
                        </Item>
                        <Item label=' ' className='btn'>
                            <Button type="primary" htmlType="submit">下一步</Button>
                        </Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const BasicInfoForm = Form.create({ name: 'basic_info' })(BasicInfo);
const mapStateToProps = state => ({
    $$shop_id: state.user.shop_id
})
const mapDispatchToProps = dispatch => ({
    __createShop: (merchant_id, shop_id) => dispatch(createShop(merchant_id, shop_id))
})
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfoForm);