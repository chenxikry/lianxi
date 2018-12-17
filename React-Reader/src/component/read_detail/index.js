import React, { Component } from 'react';
import { Layout,Icon,Modal,Spin } from "antd";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import 'whatwg-fetch';

import '../../style/read_detail/index.css';

const {Header,Content,Footer}=Layout;

class ReadDetail extends Component{
    constructor(props){
      super(props);
      this.state={
        isShowLoading:false,
        chapterList:[],  //章节列表
        chapterData:{},  //章节数据
        chapterIndex:0, //当前章节下标
        isShowHeaderAndFooter:false
      }
    }
    componentWillMount(){
      var bookList=localStorage.getItem('bookList')&&JSON.parse(localStorage.getItem('bookList'));
      console.log(bookList)
      var order=this.props.match.params.id||1;
      this.setState({
        chapterIndex:order,
        chapterList:bookList.chapters
      });

      this.getChapterData(order,bookList.chapters);
    }
    getChapterData(index,list){
      //根据章节列表和章节下标,请求章节数据
      fetch(`/chapter/${encodeURIComponent(list[index].link)}?k=2124b73d7e2e1945&t=1468223717`)
      .then(res=>res.json())
      .then(res=>{
        console.log('章节详情数据：',res);
        this.setState({
          chapterData:res.chapter
        });

        //数据请求成功后，将当前的章节序号存储到localStorage中，让首页可以访问
        localStorage.setItem('chapterIndex',index);
      })
    }
    
    goBack(ev){
        //返回上一级
        ev.preventDefault();
        this.props.history.goBack();
    }
    lastChapter(ev){
      ev.stopPropagation();
      //上一章
      if(this.state.chapterIndex==0){
        alert('目前是第一章，已经没有上一章数据了!')
        return;
      }
      this.history.push('/read/'+this.state.chapterIndex-1);
    }
    nextChapter(ev){
      ev.stopPropagation();
      //下一章
      if(this.state.chapterIndex==this.state.chapterList.length-1){
        alert('目前是最后一章了!')
        return;
      }
      this.props.history.push('/read/'+(+this.state.chapterIndex+1));
    }
    componentWillReceiveProps(newProps){
      var order=this.props.match.params.id;
      this.setState({
        chapterIndex:order,
      });

      this.getChapterData(order,this.state.chapterList);
      this.box.scrollTop=0;//设置滚动距离
    }

    render(){
        return (
            <div style={{height:'100%'}}>
                <div className="loading" style={{display:this.state.isShowLoading?'block':'none'}}>
                  <Spin size="large" tip="正在加载..."/>
                </div>
                <Layout style={{height:'100%'}}>
                {/* 章节选择弹窗结构*/}
                 <Modal
                    className="chapterList"
                    title="Vertically centered modal dialog"
                    visible={false}
                  >
                    <p>11111</p>
                </Modal>
                {/* 头部结构 */}
                {
                  this.state.isShowHeaderAndFooter?(
                    <Header className="read_detail_header">
                      <Link to="/"  className="read_detail_pre"><Icon type="arrow-left"/></Link>
                      <Link to={`/changeOrigin/${this.pos}`}>
                      <span className="read_detail_origin">换源</span></Link>
                    </Header>
                  ):''
                }
                  
                  {/* 小说内容体结构 */}
                    <Content style={{height:'100%'}}>
                    <div className="read_detail_box" ref={(el)=>this.box=el} onClick={()=>this.setState({isShowHeaderAndFooter:!this.state.isShowHeaderAndFooter})}>
                        <div>
                            <h2>{this.state.chapterData.title}</h2>
                            <pre >{this.state.chapterData.cpContent}</pre>
                            <h1 className="read_detail_control">
                              <span onClick={this.lastChapter.bind(this)}>{this.state.chapterIndex==0?"":'上一章'}</span>
                              <span onClick={this.nextChapter.bind(this)}>{this.state.chapterIndex==this.state.chapterList.length-1?"":'下一章'}</span>
                            </h1>
                        </div>
                    </div>
                    </Content>
                    {/* 底部结构 */}
                    {
                      this.state.isShowHeaderAndFooter?(
                        <Footer className="read_detail_footer">
                          <div 
                            className="read_detail_setting"
                            tabIndex="100">
                            <Icon type="setting" /><br/>设置
                            {
                              false?(
                                <div>
                                <div className="read_detail_font">
                                  <span>Aa -</span>
                                  <span>Aa +</span>
                                </div>
                                <div className="read_detail_color">
                                  <i style={{backgroundColor: 'rgb(196, 196 ,196)'}}></i>
                                  <i style={{backgroundColor: 'rgb(162, 157, 137)'}}></i>
                                  <i style={{backgroundColor: 'rgb(173, 200, 169)'}}></i>
                                </div>
                              </div>
                              ):''
                            }
                          </div>
      
                          <div><Icon type="download"/><br/>下载</div>
                          <div><Icon type="bars" /><br/>目录</div>
                        </Footer>
                      ):''
                    }
                </Layout>
            </div>
        );
    }
}
export default ReadDetail;