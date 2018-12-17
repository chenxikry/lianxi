import React, { Component } from 'react';
import { Tag  } from "antd";

//导入样式
import '../../style/search/SearchRecommendList.css';

class SearchRecommendList extends Component{
    render(){
        return ( <div className="searchHistory">
                    <div className="searchHistoryHead">
                        <h3 className="leftHead">{this.props.title}</h3>
                        <a className="rightHead" onClick={this.props.clearHistory}>{this.props.extra}</a>
                    </div> 
                    <ul className="cards">
                        <li >
                            {
                                this.props.contentList&&this.props.contentList.length>0?
                               ( this.props.contentList.map((val,i)=>(
                                    //如果是大家都在搜组件，则前两个Tag的颜色为red,否则为gray
                                    <Tag key={i} color={(i<2&&this.props.father=='otherSearch')?'red':'#999'} 
                                        className="search_tag"
                                        closable={this.props.father=="history"}
                                        onClose={(ev)=>this.props.closeEvt(ev,i)}
                                        >
                                        <a href="#" onClick={(ev)=>this.props.tagClick(ev,val)}>{val}</a>
                                    </Tag>
                                ))):
                                '没有任何历史记录!'
                            }
                            {/* <Tag color="red" className="search_tag"><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
                            <Tag color="#999" className="search_tag" closable onClose={()=>{}}>Tag 2</Tag> */}
                        </li>
                    </ul>
                </div>
            );
    }
}
export default SearchRecommendList;