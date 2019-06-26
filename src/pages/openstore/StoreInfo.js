import '../../assets/less/openstore/steps.less';
import React, {Component} from 'react';
import Steps from '../../components/OpenStoreStep';
import {Form, Input, Select, Button, DatePicker, Icon, Tooltip, Radio, message} from 'antd';
import history from "../../router/history";
import UpdateBtn from '../../components/UpdateBtn';
import axios from '../../axios';
import {connect} from 'react-redux';

const {Option} = Select,
    {Item} = Form,
    RadioGroup = Radio.Group,
    {RangePicker} =  DatePicker;

class StoreInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cardList: [],
            industryList: [],
            subjectList: [],

            showRadio1: true,
            showRadio2: true
        }
    }

    // 获取证件列表
    getList = () => axios.get('/merchant/Merchant_shop/certTypeList').then(res => {
        const {identype, $permit_type_list, industry_type_list} = res;
        this.setState({
            cardList: identype,
            industryList: $permit_type_list,
            subjectList: industry_type_list,

            time1: '',
            time2: ''
        })
    })


    nextStep = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                const {time1, time2} = this.state;
                const params = {
                    ...values,
                    shop_id: this.props.$$shop_id,
                    industry_time: time1,
                    subject_time: time2
                }
                let formdata = new FormData();
                for(let key in params){
                    formdata.append(key, params[key])
                }
                axios.post('/merchant/Merchant_shop/MerchantStatus', formdata).then(res => {
                    message.success('保存成功');
                    history.push('/open_store/add_goods')
                })
            }
        });
    }

    onDateChange = (dateString, key) => {
        this.setState({
            [key]: dateString[1]
        })
    }

    componentWillMount() {
        this.getList()
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {showRadio1, showRadio2, cardList, industryList, subjectList} = this.state;
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
        return(
            <div>
                <Steps current={2} />
                <div className='open-content'>
                    <Form {...formItemLayout} onSubmit={this.nextStep}>
                        <p>法定代表人</p>
                        <Item label='法人真实姓名'>
                            {
                                getFieldDecorator('represent_user', {
                                    rules: [{required: true, message: '请填写法人真实姓名'}]
                                })(
                                    <Input placeholder='请填写法人真实姓名'/>
                                )
                            }
                        </Item>
                        <Item label='证件类型'>
                            {
                                getFieldDecorator('represent_type_id', {
                                    initialValue: cardList.length > 0 ? cardList[0].id_type_id : '',
                                    rules: [{required: true, message: '请选择证件类型'}]
                                })(
                                    <Select placeholder='请选择证件类型'>
                                        {
                                            cardList.map(item =>
                                                <Option disabled={!item.is_valid} key={item.id_type_id} value={item.id_type_id}>{item.id_name}</Option>
                                            )
                                        }
                                    </Select>
                                )
                            }
                        </Item>
                        <Item label='证件号码'>
                            {
                                getFieldDecorator('represent_number', {
                                    rules: [{required: true, message: '请填写证件号码'}]
                                })(
                                    <Input placeholder='请填写证件号码'/>
                                )
                            }
                        </Item>
                        <Item label={(
                            <span>
                                证件正面照&nbsp;
                                <Tooltip title="请注意证件照片上的文字能清晰可见">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('represent_front_img', {
                                    rules: [{required: true, message: '请上传证件正面照'}]
                                })(
                                    <UpdateBtn />
                                )
                            }
                        </Item>
                        <Item label={(
                            <span>
                                证件反面照&nbsp;
                                <Tooltip title="请注意证件照片上的文字能清晰可见">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('represent_con_img', {
                                    rules: [{required: true, message: '请上传证件反面照'}]
                                })(
                                    <UpdateBtn />
                                )
                            }
                        </Item>
                        <Item label={(
                            <span>
                                手持正面照&nbsp;
                                <Tooltip title="请注意证件照片上的文字能清晰可见">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('represent_hold_img', {
                                    rules: [{required: true, message: '请上传手持正面照'}]
                                })(
                                    <UpdateBtn />
                                )
                            }
                        </Item>
                        <p>主体资质</p>
                        <Item label='证件类型'>
                            {
                                getFieldDecorator('industry_type_id', {
                                    initialValue: industryList.length > 0 ? industryList[0].permit_type_id : '',
                                    rules: [{required: true, message: '请选择证件类型'}]
                                })(
                                    <Select placeholder='请选择证件类型'>
                                        {
                                            industryList.map(item =>
                                                <Option disabled={!item.is_valid} key={item.permit_type_id} value={item.permit_type_id}>{item.permit_name}</Option>
                                            )
                                        }
                                    </Select>
                                )
                            }
                        </Item>
                        <Item label={(
                            <span>
                                资质照片&nbsp;
                                <Tooltip title="请注意证件照片上的文字能清晰可见">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('industry_img', {
                                    rules: [{required: true, message: '请上传手持正面照'}]
                                })(
                                    <UpdateBtn />
                                )
                            }
                        </Item>
                        <Item label='注册号'>
                            {
                                getFieldDecorator('industry_number', {
                                    rules: [{required: true, message: '请填写注册号'}]
                                })(
                                    <Input placeholder='请填写注册号'/>
                                )
                            }
                        </Item>
                        <Item label='单位名称'>
                            {
                                getFieldDecorator('industry_company', {
                                    rules: [{required: true, message: '请填写单位名称'}]
                                })(
                                    <Input placeholder='请填写单位名称'/>
                                )
                            }
                        </Item>
                        <Item label='注册地址'>
                            {
                                getFieldDecorator('industry_address', {
                                    rules: [{required: true, message: '请填写注册地址'}]
                                })(
                                    <Input placeholder='请填写注册地址'/>
                                )
                            }
                        </Item>
                        <Item label='法定代表人'>
                            {
                                getFieldDecorator('industry_user', {
                                    rules: [{required: true, message: '请填写法定代表人'}]
                                })(
                                    <Input placeholder='请填写法定代表人'/>
                                )
                            }
                        </Item>
                        <Item label='有效期'>
                            {
                                getFieldDecorator('industry_effective_type', {
                                    initialValue: 0,
                                    rules: [{required: true, message: '请选择有效期'}]
                                })(
                                    <RadioGroup onChange={e => this.setState({showRadio1: !e.target.value})}>
                                        <Radio value={0}>固定有效</Radio>
                                        <Radio value={1}>长期有效</Radio>
                                    </RadioGroup>
                                )
                            }
                        </Item>
                        {
                            showRadio1 && (
                                <Item label='固定日期'>
                                    {
                                        getFieldDecorator('industry_time', {
                                            rules: [{required: true, message: '请选择有效期'}]
                                        })(
                                            <RangePicker onChange={(date, dateStr) => this.onDateChange(dateStr, 'time1')} />
                                        )
                                    }
                                </Item>
                            )
                        }

                        <p>行业资质</p>
                        <Item label='证件类型'>
                            {
                                getFieldDecorator('subject_type_id', {
                                    initialValue: subjectList.length > 0 ? subjectList[0].permit_type_id : '',
                                    rules: [{required: true, message: '请选择证件类型'}]
                                })(
                                    <Select placeholder='请选择证件类型'>
                                        {
                                            subjectList.map(item =>
                                                <Option disabled={!item.is_valid} key={item.permit_type_id} value={item.permit_type_id}>{item.permit_name}</Option>
                                            )
                                        }
                                    </Select>
                                )
                            }
                        </Item>
                        <Item label={(
                            <span>
                                资质照片&nbsp;
                                <Tooltip title="请注意证件照片上的文字能清晰可见">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('subject_img', {
                                    rules: [{required: true, message: '请上传手持正面照'}]
                                })(
                                    <UpdateBtn />
                                )
                            }
                        </Item>
                        <Item label='许可证编号'>
                            {
                                getFieldDecorator('subject_number', {
                                    rules: [{required: true, message: '请填写许可证编号'}]
                                })(
                                    <Input placeholder='请填写许可证编号'/>
                                )
                            }
                        </Item>
                        <Item label='单位名称'>
                            {
                                getFieldDecorator('subject_company', {
                                    rules: [{required: true, message: '请填写单位名称'}]
                                })(
                                    <Input placeholder='请填写单位名称'/>
                                )
                            }
                        </Item>
                        <Item label='许可证地址'>
                            {
                                getFieldDecorator('subject_address', {
                                    rules: [{required: true, message: '请填写许可证地址'}]
                                })(
                                    <Input placeholder='请填写许可证地址'/>
                                )
                            }
                        </Item>
                        <Item label='法定代表人'>
                            {
                                getFieldDecorator('subject_user', {
                                    rules: [{required: true, message: '请填写法定代表人'}]
                                })(
                                    <Input placeholder='请填写法定代表人'/>
                                )
                            }
                        </Item>
                        {/*<Item label='营业类别'>*/}
                            {/*{*/}
                                {/*getFieldDecorator('industry_user', {*/}
                                    {/*rules: [{required: true, message: '请填写营业类别'}]*/}
                                {/*})(*/}
                                    {/*<Input placeholder='请填写营业类别'/>*/}
                                {/*)*/}
                            {/*}*/}
                        {/*</Item>*/}
                        <Item label='有效期'>
                            {
                                getFieldDecorator('subject_effective_type', {
                                    initialValue: 0,
                                    rules: [{required: true, message: '请选择有效期'}]
                                })(
                                    <RadioGroup onChange={e => this.setState({showRadio2: !e.target.value})}>
                                        <Radio value={0}>固定有效</Radio>
                                        <Radio value={1}>长期有效</Radio>
                                    </RadioGroup>
                                )
                            }
                        </Item>
                        {
                            showRadio2 && (
                                <Item label='固定日期'>
                                    {
                                        getFieldDecorator('subject_time', {
                                            rules: [{required: true, message: '请选择有效期'}]
                                        })(
                                            <RangePicker onChange={(date, dateStr) => this.onDateChange(dateStr, 'time2')}/>
                                        )
                                    }
                                </Item>
                            )
                        }
                        <Item label=' ' className='btn'>
                            <Button type="primary" htmlType="submit">下一步</Button>
                        </Item>
                    </Form>
                </div>
            </div>
        )
    }

}

const StoreInfoForm = Form.create({ name: 'store_info' })(StoreInfo);
const mapStateToProps = state => ({
    $$shop_id: state.user.shop_id
})
export default connect(mapStateToProps)(StoreInfoForm);