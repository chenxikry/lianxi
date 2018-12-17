import React, { Component } from 'react';
import {Icon,Divider,List,Avatar} from 'antd';
import {Link} from 'react-router-dom';

import '../../style/home/recommend.css';
import {wordCount2Str} from '../../tools'

class ContentRecommend extends Component{
    handleImageError(ev){
        ev.target.src=require('../../images/error.jpg');
    }
    render(){
        console.log(this.props);
        return (
            <div>
                <Divider className="home_divider"/>
                <div className="mainRecommend">
                    <span>{this.props.title}</span>
                    <a><span><Icon type={this.props.icon} />&nbsp;{this.props.extra}</span> <Icon type="right" /></a>
                </div>
                <Divider className="home_divider"/>
                <ul>  {/* 如果content不存在，则不渲染视图 */}
                    {  
                            this.props.father=='recommend'?(
                                this.props.content?(
                                    //推荐列表
                                    <Link to={`/bookIntro/${this.props.content._id}`}>
                                    <li className="recommendList">
                                      
                                        <div className="liLeft">
                                            <img src={this.props.content.logo} alt="" />
                                        </div>
                                        <div className="liRight">
                                            <h3>{this.props.content.title}</h3>
                                            <p>
                                                {this.props.content.longIntro||this.props.content.shortIntro}
                                            </p>
                                            <div className="liBottom">
                                                <span>{this.props.content.author}</span>
                                                <span>{wordCount2Str(this.props.content.wordCount)}</span>
                                            </div>
                                        </div>
                                    </li></Link>):<li className="no_content">没有任何推荐内容</li>
                            ):(
                                this.props.content?(
                                //收藏记录
                                <li className="recommendList">
                                    <div className="liLeft"><img src={this.props.content.cover} alt="" onError={this.handleImageError.bind(this)}/></div>
                                    <div className="liRight">
                                        <h3>{this.props.content.title}</h3>
                                        <p className="liBottom justifyStart">
                                            <span className="mySubTitle">{this.props.content.lastChapter}</span>
                                            <span className="mySubContent">{this.props.content.longIntro}</span>
                                        </p>
                                    </div>
                                </li>):<li className="no_content">还没有任何收藏，快去收藏</li>
                            )
                    }
                </ul>
            </div>
        )
    }
}
export default ContentRecommend;