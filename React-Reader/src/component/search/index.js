import React, { Component } from 'react';
import {Layout,Input,Icon } from 'antd';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';

//导入搜索推荐子组件
import SearchRecommend from './SearchRecommend';
// 导入搜索列表子组件
import SearchList from './SearchList';

//导入action creator
import {setNowSearchContent,addHistory,getSearchList} from '../../redux/action';

import PropTypes from 'prop-types';

// 引入样式
import '../../style/search/index.css';

const {Header,Content}=Layout;
const Search = Input.Search;

class MySearch extends Component{
    constructor(props) {
        super(props);
        //修正自身函数的this
        this.goToSearchList=this.goToSearchList.bind(this);
    }
    //定义ContentAPI,将history对象传给子组件
    getChildContext() {
        return {parentHistory: this.props.history};
    }
    
    goBack(ev){
        //阻止默认事件
        ev.preventDefault();
        // console.log(this.props);
        //回退到上一条记录
        this.props.history.goBack();
    }
    goToSearchList(val){
        //跳转页面，使用子路由的history对象跳转
        this.history&&this.history.push('/search/'+val)
    }
    render(){
        return (<Layout style={{height:"100%"}}>
                <Header className="homeHeader">
                    {/* 头部 回退按钮*/}
                    <a href="#" className="search_back" onClick={this.goBack.bind(this)}>
                        <Icon type="arrow-left" />
                    </a>
                    {/* 头部搜索框 */}
                    <MySearchInput goToSearchList={(val)=>this.goToSearchList(val)}></MySearchInput>
                </Header>
                <Content className="search_content">
                    {/*嵌套 子路由 */}
                    <Router>
                        <Switch>
                            {/* 默认路由,使用render函数暴露子路由的history对象 */}
                            <Route path="/search" render={(props)=>{this.history=props.history;return(<SearchRecommend {...props}/>);}} exact></Route>
                            {/* 搜索结果路由 */}
                            <Route path={`/search/:id`} component={SearchList} exact></Route>
                        </Switch>
                    </Router>
                </Content>
        </Layout>)
    }
    
    componentDidMount() {
        console.log(this.history);
    }
    
}

MySearch.childContextTypes = {
    parentHistory: PropTypes.object
  };

//UI组件
function MySearchInputUI(props) {
    return (<Search
        placeholder="输入搜索内容,按回车键确认"
        value={props.nowSearchContent}
        onChange={props.inputChnage}
        onSearch={props.searchClick}
        style={{ width: '12rem',fontSize:'18px'}}
        className="search_input"
        size="large"
        suffix={props.nowSearchContent?(<Icon type="close-circle" onClick={props.clearInput} />):''}/>)
}
let mapStateToProps=(state)=>({
    nowSearchContent:state.nowSearchContent
})
let mapDispatchToProps=(dispatch,parentProps)=>({
    //搜索按钮的点击事件
    searchClick:(value)=>{
        if(value===''){
            alert('还没有任何搜索内容!');
            return;
        }
        //1.设置当前的搜索内容
        dispatch(setNowSearchContent(value))
        
        //2.添加到搜索历史中
        dispatch(addHistory(value));
        //3.开始搜索
        dispatch(getSearchList(value));
        //4.跳转到搜索页面
        //父路由历史对象无法导致子路由的跳转
      //  parentProps.history.push('/search'+value)

        //调用父组件的方法，利用父组件得到的子组件的路由对象实现跳转
        parentProps.goToSearchList(value);
    },
    inputChnage:(ev)=>{
        //输入框的输入事件
        dispatch(setNowSearchContent(ev.target.value));
    },
    clearInput(){
        dispatch(setNowSearchContent(''));
    }
});
//容器组件
const MySearchInput=connect(mapStateToProps, mapDispatchToProps)(MySearchInputUI)

export default MySearch;