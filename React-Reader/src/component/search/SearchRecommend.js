import React, { Component } from 'react';
import SearchRecommendList from './SearchRecommendList';
import {Divider} from 'antd';
//导入react-redux
import {connect} from 'react-redux';
//导入action creator
import {removeHistory,clearHistory,setNowSearchContent,
    addHistory,getSearchList} from '../../redux/action';

// 搜索推荐组件
class SearchRecommend extends Component{
    
    componentDidMount() {
        this.props.initData();
    }
    
    render(){
        return (<div>
                <SearchRecommendList title="大家都在搜" contentList={this.props.otherSearch} father="otherSearch"
                 tagClick={this.props.tagClick}></SearchRecommendList>
                <Divider style={{margin:'0px'}}/>
                <SearchRecommendList title="搜索历史" extra="清除历史" contentList={this.props.searchHistoryList} father="history"
                 closeEvt={this.props.closeEvt}
                 clearHistory={this.props.clearHistory}
                 tagClick={this.props.tagClick}></SearchRecommendList>
            </div>)
    }
}
const mapStateToProps=(state)=>({
    //推荐搜索
    otherSearch:['三体','那些热血飞扬的日子','哈弗教授与女儿的对话',
    '罪恶之城','万道成神','人间鬼事','超级学生','欲望森林'],
    searchHistoryList:state.searchHistoryList
})
const mapDispatchToProps=(dispatch,parentProps)=>({
    closeEvt:(ev,index)=>{
        //删除选项的操作
        dispatch(removeHistory(index));
        //阻止事件冒泡
        ev.stopPropagation();
    },
    clearHistory:(ev)=>{
        //清除历史记录
        ev.preventDefault();
        dispatch(clearHistory());
    },
    tagClick(ev,item){
        ev.preventDefault();
       // console.log(item);
        //Tag的点击事件
        //1.设置当前的搜索内容
        dispatch(setNowSearchContent(item))
        
        //2.添加到搜索历史中
        dispatch(addHistory(item));
        //3.开始搜索
        dispatch(getSearchList(item))
        //4.跳转到搜索页面
        parentProps.history.push(parentProps.match.url+'/'+item);
    },
    initData(){
        //1.设置当前的搜索内容
        dispatch(setNowSearchContent(''));
    }
})
//容器组件
export default connect(mapStateToProps, mapDispatchToProps)(SearchRecommend);