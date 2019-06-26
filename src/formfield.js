const formfield = [
    {
        component: 'image',
        options: {
            title: '门面照',
            required: true,
            tips: '一张真实美观的门脸照',
            value: 'the_facade_img'
        }
    }, {
        component: 'input',
        options: {
            title: '店铺名称',
            required: true,
            placeholder: '请输入店铺名称',
            value: 'shop_name'
        }
    }, {
        component: 'input',
        options: {
            title: '店铺电话',
            required: true,
            placeholder: '请输入店铺电话',
            value: 'mobile'
        }
    }, {
        component: 'input',
        options: {
            title: '店铺营业电话',
            required: true,
            placeholder: '请输入店铺营业电话',
            value: 'shop_phone'
        }
    }, {
        component: 'input',
        options: {
            title: '联系人姓名',
            required: true,
            placeholder: '请输入联系人姓名',
            value: 'shop_contact'
        }
    }, {
        component: 'input',
        options: {
            title: '联系人电话',
            required: true,
            placeholder: '请输入联系人电话',
            value: 'shop_mobile'
        }
    }, {
        component: 'select',
        options: {
            title: '营业类型',
            required: true,
            placeholder: '请选择营业类型',
            value: 'shop_type',
            list: []
        }
    }, {
        component: 'area',
        options: {
            title: '门店区域',
            required: true,
            placeholder: '请选择门店区域',
            value: 'shop_area'
        }
    }, {
        component: 'address',
        options: {
            title: '门店地址',
            required: true,
            placeholder: '请输入门店地址',
            value: 'shop_type',
        }
    }, {
        component: 'local',
        options: {
            title: '门店位置',
            required: true,
            placeholder: ['经度', '纬度'],
            value: ['longitude', 'latitude']
        }
    }, {
        component: 'time_interval',
        options: {
            title: '营业时间',
            required: true,
            placeholder: ['开始时间', '结束时间'],
            value: ['start_time', 'start_time']
        }
    }, {
        component: 'time_interval',
        options: {
            title: '营业时间',
            required: true,
            placeholder: ['开始时间', '结束时间'],
            value: ['start_time', 'start_time'],
            list: []
        }
    }, {
        component: 'input',
        options: {
            title: '推荐人电话',
            required: true,
            placeholder: '请输入推荐人电话',
            value: 'parent_mobile'
        }
    }
]
export default formfield;