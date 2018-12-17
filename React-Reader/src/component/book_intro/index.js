import React, { Component } from 'react';
import {Layout,Icon,Button,Tag,Modal} from 'antd';
//随机生成颜色插件
import randomcolor from 'randomcolor';
import {connect} from 'react-redux';
//导入Action Creator
import {getBookIntro} from '../../redux/action';

import {wordCount2Str,time2Str} from '../../tools';
//导入复制插件
import {CopyToClipboard} from 'react-copy-to-clipboard';

//导入样式
import '../../style/book_intro/index.css';

const {Header,Content}=Layout;

class BookIntro extends Component {
    
    componentWillMount() {
        //请求数据
        this.props.getBookIntro();
        //获取收藏列表
        this.getFavList(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps) {
         //定义复制内容
         this.share= `我在HAKA阅读器看《${nextProps.bookIntro.title}》，绿色无广告，你也一起来呗！地址是${window.location.href}，移动端请手动复制这条信息。`;
        //获取收藏列表
         this.getFavList(nextProps.bookIntro._id);
    }
    //获取收藏记录
    getFavList(id){
        //获取收藏记录
        let favList=localStorage.getItem('favList');
        if(!favList){
            return;
        }
        
        favList=JSON.parse(favList);
        console.log(favList);

         //检查当前书籍是否被追
         favList.forEach((val,i) => {
             if(val._id==id){
                 this.isSave=true;  //已经被收藏了
                 this.saveIndex=i;
             }
         });
    }
    goBack(ev){
        //阻止默认事件
        ev.preventDefault();
        // console.log(this.props);
        //回退到上一条记录
        this.props.history.goBack();
    }
    handleImageError(ev){
        ev.target.src=require('../../images/error.jpg');
    }
    shareSuccess(){
        //分享点击事件
        //弹出Modal框
        Modal.success({
            title: '链接已复制到你的剪贴板',
            content: this.share
          });
    }
    addFav(){
        //添加收藏按钮点击事件
        var favList=localStorage.getItem('favList');
        if(!favList){
            favList=[];
        }else{
            favList=JSON.parse(favList);//解析JSON
        }
        favList.push(this.props.bookIntro);//添加记录
        localStorage.setItem('favList',JSON.stringify(favList));//重新存储到浏览器中

        //设置在收藏列表中的下标
        this.saveIndex=favList.length;
        this.isSave=true;
        //设置收藏数量+1
        this.props.bookIntro.latelyFollower++;
        this.forceUpdate();
    }
    //去收藏按钮点击事件
    removeFav(){
        //删除收藏记录
        var favList=localStorage.getItem('favList');
        if(!favList){
            return;
        }

        favList=JSON.parse(favList);//解析JSON
        favList.splice(this.saveIndex,1);
        console.log(favList);
        localStorage.setItem('favList',JSON.stringify(favList));

        this.isSave=false;
        this.saveIndex=null;
        this.props.bookIntro.latelyFollower--;
        this.forceUpdate();
    }
   render(){
       return (<Layout>
            <Header className="homeHeader">
                 {/* 头部 回退按钮*/}
                 <a href="#" className="search_back" onClick={this.goBack.bind(this)}>
                    <Icon type="arrow-left" />
                </a>
                <span className="book_intro_title">书籍详情</span>
                <CopyToClipboard
                text={this.share}     //点击复制时所复制的文本内容
                onCopy={this.shareSuccess.bind(this)}   //点击时复制所触发的事件
                >
                    <span className="book_intra_share">分享</span>
                </CopyToClipboard>
            </Header>
            <Content>
                <div>
                    {/* 内容第一部分 */}
                    <div className="book_intro_top">
                        <img src={this.props.bookIntro.cover} onError={this.handleImageError.bind(this)}/>
                        <p>
                        <span className="book_intro_bookName">{this.props.bookIntro.title}</span><br/>
                        <span className="book_intro_bookMsg"><em>{this.props.bookIntro.author}</em> | {this.props.bookIntro.minorCate} | {wordCount2Str(this.props.bookIntro.wordCount)}</span>
                        <span className="book_intro_bookUpdated">{time2Str(this.props.bookIntro.updated)}前更新</span>
                        </p>
                    </div>

                    {/* 内容的第二部分：追更及阅读按钮 */}
                    <div className="book_intro_control">
                       {
                        this.isSave ? 
                        (<Button icon='minus' size='large' className="book_intro_cancel" onClick={this.removeFav.bind(this)}>不追了</Button>)
                        :(<Button icon='plus' size='large' onClick={this.addFav.bind(this)}>追更新</Button>) 
                         } 
                        <Button icon='search' size='large' onClick={()=>{this.props.history.push(`/list_chapter/${this.props.bookIntro._id}`)}}>开始阅读</Button>
                    </div>

                    {/*内容的第三部分：追书信息 */}
                    <div className="book_intro_number">
                        <p><span>追书人数</span><br/>{this.props.bookIntro.latelyFollower}</p>
                        <p><span>读者留存率</span><br/>{this.props.bookIntro.retentionRatio}%</p>
                        <p><span>日更新字数</span><br/>{this.props.bookIntro.serializeWordCount}</p>
                    </div>

                    {/*内容的第四部分：书籍类型 */}
                    <div className="book_intro_tags">
                        { this.props.bookIntro.tags&&this.props.bookIntro.tags.length>0
                            ?(this.props.bookIntro.tags.map((val,i)=>{
                            return (<Tag className="book_intro_tag" color={randomcolor({luminosity: 'dark'})} key={i}>
                                     {val}</Tag>)
                            }))
                            :(<Tag className="book_intro_tag" color={randomcolor({luminosity: 'dark'})}>{this.props.bookIntro.cat}</Tag>)
                        }
                    </div>

                    {/*内容的第五部分：书籍长介绍 */}
                    <div className="book_intro_introduce">
                        <p>{this.props.bookIntro.longIntro}</p>
                    </div>
                </div>
            </Content>
       </Layout>
       );
   }
}
const mapStateToProps=(state)=>({
    bookIntro:state.bookIntro,
    favList:state.favList
})
const mapDispatchToProps=(dispatch,parentProps)=>({
    getBookIntro(){
        dispatch(getBookIntro(parentProps.match.params.id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BookIntro);