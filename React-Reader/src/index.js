import React from 'react';
import ReactDOM from 'react-dom';
// 引入复位样式
import './style/reset.css';
import './libs/rem';

import App from './App';
//用于在生产环境下为用户在本地创建一个Service worker(服务线程)，用来缓存本地资源，提升应用的访问速度。
//因为通过service worker做了离线缓存，所以即使离线情况下也可以访问应用
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
