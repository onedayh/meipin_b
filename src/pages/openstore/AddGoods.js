import '../../assets/less/openstore/steps.less';
import React, {Component} from 'react';
import Steps from '../../components/OpenStoreStep';
import history from "../../router/history";
import UpdateBtn from '../../components/UpdateBtn';
import {Form, Input, Select, Button, Icon, Tooltip, Card, Modal, Cascader, DatePicker} from 'antd';
import axios from "../../axios";
import {connect} from 'react-redux';
const {Item} = Form, {Meta} = Card, {Option} = Select, {TextArea} = Input;


class AddGoods extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {img: require('../../assets/img/test.png'), title: 'test1', price: '56', id: 1},
                {img: require('../../assets/img/test.png'), title: 'test2', price: '56', id: 2},
                {img: require('../../assets/img/test.png'), title: 'test3', price: '56', id: 3},
                {img: require('../../assets/img/test.png'), title: 'test4', price: '56', id: 4},
                {img: require('../../assets/img/test.png'), title: 'test5', price: '56', id: 5}
            ],
            showCreate: false
        }
    }

    hideModal = () => {
        this.setState({showCreate: false})
    }

    nextStep = () => {
        history.push('/open_store/agreement')
    }



    componentWillMount() {
    }

    render() {
        const {list, showCreate} = this.state;
        return(
            <div>
                <Steps current={3} />
                <div className='open-content'>
                    <Button type='primary' onClick={() => this.setState({showCreate: true})}>商品录入</Button>
                    <p style={{padding: '20px 0'}}>已录入商品({list.length}/5)</p>
                    <div>
                        {
                            list.map(item =>
                                <Card
                                    key={item.id}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={item.img} />}
                                >
                                    <Meta
                                        title={item.title}
                                        description={`单价：￥${item.price}`}
                                        avatar={<Icon onClick={() => console.log(111)} type="delete" />}
                                    />
                                </Card>
                            )
                        }
                    </div>
                    <Button type='primary' onClick={this.nextStep}>下一步</Button>
                </div>
                <CreateGoodsForm shopid={this.props.$$shop_id} show={showCreate} hide={this.hideModal}/>
            </div>
        )
    }
}

class CreateGoods extends Component{
    constructor(props) {
        super(props);
        this.state = {
            goods_image: [],

            LBList: [],
            LBType: 0,

            ShelveList: [],
            brandList: [],
            tagList: []
        }
    }

    create = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values.goods_image)
            // this.hideModal()
        });
    }

    // 获取商品货架
    getShelves = () => {
        axios.get('/merchant/goods/ShopGoodsGroup').then(res => {
            this.setState({
                ShelveList: res
            })
        })
    }

    // 获取商品品牌
    getBrand = () => {
        axios.get('/merchant/goods/brand').then(res => {
            this.setState({
                brandList: res
            })
        })
    }

    // 获取商品标签
    getTag = () => {
        axios.get('/merchant/goods/goodsTag').then(res => {
            this.setState({
                tagList: res
            })
        })
    }

    // 获取商品分类
    getLBType = () => {
        axios.get('/merchant/goods/goodsCat').then(res => {
            let list = [], type = 0;
            const twoList = res.filter(item => item.parent_id);
            if(twoList.length === 0){
                list = res.map(item => ({
                    label: item.goods_cat_name,
                    value: item.goods_cat_id,
                    disabled: !item.is_valid
                }));
                type = 0;
            }else{
                type = 1;
                list = res.filter(item => !item.parent_id).map(item => ({
                    label: item.goods_cat_name,
                    value: item.goods_cat_id,
                    disabled: !item.is_valid,
                    children: []
                }));
                list.forEach(item => {
                    twoList.forEach(it=> {
                        if(item.goods_cat_id === it.parent_id){
                            item.children.push({
                                label: it.goods_cat_name,
                                value: it.goods_cat_id,
                                disabled: !it.is_valid
                            })
                        }
                    })
                })
            }
            this.setState({
                LBList: list,
                LBType: type
            })
        })
    }

    componentWillMount() {
        this.getShelves();
        this.getBrand();
        this.getTag();
        this.getLBType();
    }

    render() {
        const {LBList, LBType, ShelveList, brandList, tagList} = this.state;
        const {show} = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return(
            <Modal
                title='新建商品'
                visible={show}
                footer={false}
                onCancel={this.props.hide}
            >
                <Form {...formItemLayout} onSubmit={this.create}>
                    <p>基本信息</p>
                    <Item required label={(
                        <span>
                                商品图片&nbsp;
                            <Tooltip title="真实美观的商品图片">
                                    <Icon type="info-circle-o" style={{color: 'red'}}/>
                                </Tooltip>
                            </span>
                    )}>
                        {
                            [1,1,1,1,1].map((item, index) =>
                                <Item style={{display: 'inline-block', marginRight: '20px'}} key={index}>
                                    {
                                        getFieldDecorator(`file${index +1 }`, {
                                            rules: [{required: true, message: '请上传商品图片'}]
                                        })(
                                            <UpdateBtn />
                                        )
                                    }
                                </Item>
                            )
                        }
                    </Item>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('goods_name', {
                                rules: [{required: true, message: '请填写商品名称'}]
                            })(
                                <Input placeholder='请填写商品名称' />
                            )
                        }
                    </Item>
                    {
                        LBType ? (
                            <Item label='商品类别'>
                                {
                                    getFieldDecorator('goods_cat_id', {
                                        rules: [{required: true, message: '请选择商品类别'}]
                                    })(
                                        <Cascader options={LBList} placeholder='请选择商品类别'/>
                                    )
                                }
                            </Item>
                        ) : (
                            <Item label='商品类别'>
                                {
                                    getFieldDecorator('goods_cat_id', {
                                        rules: [{required: true, message: '请选择商品类别'}]
                                    })(
                                        <Select placeholder='请选择商品类别' getPopupContainer={triggerNode => triggerNode.parentNode} onChange={value => console.log(value)}>
                                            {
                                                LBList.map(item =>
                                                    <Option key={item.value} disabled={item.disabled} value={item.value}>{item.label}</Option>
                                                )
                                            }
                                        </Select>
                                    )
                                }
                            </Item>
                        )
                    }
                    <Item label='商品货架'>
                        {
                            getFieldDecorator('goods_cat_copy_id')(
                                <Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder='请选择商品货架'>
                                    {
                                        ShelveList.map(item =>
                                            <Option disabled={!item.is_valid} value={item.group_id} key={item.group_id}>{item.group_name}</Option>
                                        )
                                    }

                                </Select>
                            )
                        }
                    </Item>
                    <Item label='条形编码'>
                        {
                            getFieldDecorator('productsn')(
                                <Input placeholder='请填写条形编码' />
                            )
                        }
                    </Item>
                    <Item label='商品品牌'>
                        {
                            getFieldDecorator('brand_id')(
                                <Select placeholder='请选择商品品牌' getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    {
                                        brandList.map(item =>
                                            <Option disabled={!item.is_valid} value={item.brand_id} key={item.brand_id}>{item.brand_name}</Option>
                                        )
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item label='商品标签'>
                        {
                            getFieldDecorator('goods_tag_id')(
                                <Select placeholder='请选择商品标签' getPopupContainer={triggerNode => triggerNode.parentNode} mode="multiple">
                                    {
                                        tagList.map(item =>
                                            <Option value={item.goods_tag_id} key={item.goods_tag_id}>{item.tag_name}</Option>
                                        )
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item label='商品售卖时间'>
                        {
                            getFieldDecorator('shoumaishijian', {
                                initialValue: '2',
                                rules: [{required: true, message: '请选择商品售卖时间'}]
                            })(
                                <Select placeholder='请选择商品售卖时间' getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <Option value="1">Jack</Option>
                                    <Option value="2">Lucy</Option>
                                    <Option value="3">yiminghe</Option>
                                </Select>
                            )
                        }
                    </Item>
                    <p>商品规格</p>
                    <p>商品参数</p>
                    <Item label='上市时间'>
                        {
                            getFieldDecorator('shangshishijian')(
                                <DatePicker placeholder='请填写商品上市时间' />
                            )
                        }
                    </Item>
                    <Item label='材质'>
                        {
                            getFieldDecorator('caizhi')(
                                <Input placeholder='请填写商品材质' />
                            )
                        }
                    </Item>
                    <Item label='净重'>
                        {
                            getFieldDecorator('jingzhong')(
                                <Input placeholder='请填写商品净重' />
                            )
                        }
                    </Item>
                    <Item label='保质期'>
                        {
                            getFieldDecorator('baozhiqi')(
                                <DatePicker placeholder='请填写商品保质期' />
                            )
                        }
                    </Item>
                    <p>商品详情</p>
                    <Item label='商品详情'>
                        {
                            getFieldDecorator('goods_description')(
                                <TextArea placeholder='请填写商品详情' rows={4}/>
                            )
                        }
                    </Item>
                    <Item label=' ' className='btn'>
                        <Button type="primary" htmlType="submit">完成</Button>
                    </Item>
                </Form>
            </Modal>
        )
    }

}

const CreateGoodsForm = Form.create({ name: 'add_goods' })(CreateGoods);
const mapStateToProps = state => ({
    $$shop_id: state.user.shop_id
})
export default connect(mapStateToProps)(AddGoods)