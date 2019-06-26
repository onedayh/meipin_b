import axios from 'axios';
import store from '../store';
import history from '../router/history';
import {message, Modal} from 'antd';
import {changeToken, logOut} from '../action/user';

axios.defaults.timeout = 10000; // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 配置请求头
axios.defaults.withCredentials = true;  // 跨源请求不提供凭据(cookie、HTTP认证及客户端SSL证明等)


// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(config => {
    // 发送请求之前
    const {url} = config;
    if(url !== '/merchant/Open/getVerification'
        && url !== '/merchant/Open/register'
        && url !== 'merchant/Open/loginByPassword'
        && url !== '/merchant/Open/loginByVerificationCode'
        && url !== '/client/Account/refreshToken'
    ){
        // 需要token
        const {token} = store.getState().user;
        if(token){
            config.headers['Authorization'] = `Bearer ${token.accessToken}`
        }else{
            history.replace('/login')
        }
    }
    return config
}, error => {
    // 请求错误
    return Promise.reject(error)
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(res => {
    // 响应数据之前
    if(res.status === 200){
        const {code} = res.data;
        if(code === 0){
            return Promise.resolve(res.data.data);
        }else if(code === 100001){
            axios.post('/client/Account/refreshToken', {
                refresh_token: store.getState().user.token.refreshToken
            }).then(res => {
                store.dispatch(changeToken(res));
                Modal.warning({
                    title: '身份过期',
                    content: '身份已过期，请刷新页面重试。',
                    onOk(){
                        window.location.reload(true);
                    }
                })
            })
            return Promise.reject();
        }else if(code === 100002){
            store.dispatch(logOut());
            Modal.warning({
                title: '身份过期',
                content: '身份已过期，请重新登录。',
                onOk(){
                    history.replace('/login')
                }
            })
            return Promise.reject();
        }else{
            message.error(res.data.msg);
            return Promise.reject();
        }
    }else{
        message.error(res.statusText);
        return Promise.reject();
    }
    return res.data
}, () => {
    // 响应错误
    message.error('请求错误');
    return Promise.reject();
});

export default axios;