import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router} from 'react-router-dom';
import App from './pages/App';
import {Provider} from 'react-redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import 'moment/locale/zh-cn';
import history from './router/history';
import store, {persistor} from './store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import * as serviceWorker from './serviceWorker';
import './assets/less/base.less';

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <LocaleProvider locale={zhCN}>
                    <App />
                </LocaleProvider>
            </PersistGate>
        </Provider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
