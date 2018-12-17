import React, { Component } from 'react';
import { connect } from "react-redux";
import SearchItem from './SearchItem';
import {setNowSearchContent,addHistory,getSearchList} from '../../redux/action';

// 搜索推荐组件
class SearchList extends Component{
    
    componentDidMount() {
       //请求数据
       this.props.initList(this.props.match.params.id);
    }
    
    render(){
        return (<div>
            { 
                this.props.searchList.map((val,i)=>{
                    return (<SearchItem key={i} content={val} ></SearchItem>);
                })
            }
        </div>           
        );
    }
}

const mapStateToProps=(state)=>({
    searchList:state.searchList
})
const mapDispatchToProps=(dispatch,parentProps)=>({
    initList:(id)=>{
         //1.设置当前的搜索内容
        dispatch(setNowSearchContent(id));
        //2.添加到搜索历史中
        dispatch(addHistory(id));
        //3.开始搜索
        dispatch(getSearchList(id));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchList);