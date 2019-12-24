import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 导入字体图标样式
import './assets/fonts/iconfont.css'

// UI组件库样式
import 'antd-mobile/dist/antd-mobile.css'; 

// 封装的请求
import './request/index.js'

ReactDOM.render(<App />, document.getElementById('root'));

