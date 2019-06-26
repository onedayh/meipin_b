import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './login/Login';
import BaseRoute from '../router/BaseRoute';
import Index from '../router/Index';
import AddGoods from './openstore/AddGoods';
import Agreement from './openstore/Agreement';
import BasicInfo from './openstore/BasicInfo';
import OpenResult from './openstore/OpenResult';
import StoreInfo from './openstore/StoreInfo';
import TradeSetting from './openstore/TradeSetting';

export default function App() {
    return (
        <Switch>
            <Route exact path='/login' component={Login} />
            <BaseRoute exact path='/open_store/add_goods' component={AddGoods} />
            <BaseRoute exact path='/open_store/agreement' component={Agreement} />
            <BaseRoute exact path='/open_store/basic_info' component={BasicInfo} />
            <BaseRoute exact path='/open_store/open_result' component={OpenResult} />
            <BaseRoute exact path='/open_store/store_info' component={StoreInfo} />
            <BaseRoute exact path='/open_store/trade_setting' component={TradeSetting} />
            <BaseRoute path='/' component={Index} />
        </Switch>
    )

}