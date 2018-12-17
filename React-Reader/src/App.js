import React, { Component } from 'react';
import MyRoute from './router/route';
// 导入redux的组件
import {Provider,connect} from 'react-redux';
//导入存储容器
import store from './redux/store';

import './style/App.css';

//导入加载组件
import {Spin} from 'antd';

class App extends Component {
  render() {
    return (
        //使用Redux
        <Provider store={store}>
        <div style={{height:'100%'}}>
          {/* 加载组件 */}
          <MyLoading></MyLoading>
          {/*路由组件 */}
            <MyRoute />
        </div>
          
        </Provider>
    );
  }
}
function MyLoadingUI(props) {
  return (<div className="loading" style={{display:props.isShowLoading?'block':'none'}}>
          <Spin size="large" tip="正在加载..."/>
        </div>);
}

const mapStateToProps=(state)=>({
  isShowLoading:state.isShowLoading
})
const MyLoading=connect(mapStateToProps)(MyLoadingUI);

export default App;
