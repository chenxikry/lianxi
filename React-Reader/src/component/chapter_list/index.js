import React, { Component } from 'react';
import { Layout,Icon,List,Spin,Button } from "antd";
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
//导入action creator
import {getOriginList,getChapterList} from '../../redux/action';

//引入样式
import '../../style/chapter_list/index.css';

const {Header,Content}=Layout;

class ChapterList extends Component{
    constructor(props) {
        super(props);
        this.pageNum=1;//当前页数
        this.itemCount=6;//每页总条数
        this.state={
            datas:[]
        }

        this.isHasMore=true;//是否有更多数据
    }
    
    goBack(ev){
        //返回上一级
        ev.preventDefault();
        this.props.history.goBack();
    }
    //组件即将挂载
    componentWillMount() {
        this.props.getChapterList();
    }
    //获取展示的数据源
    getDatas(list){
        return list.chapters.slice((this.pageNum-1)*this.itemCount,(this.pageNum*this.itemCount-1));
    }

    componentWillReceiveProps(nextProps) {
        //设置展示的数据源
        this.totalPage=Math.ceil(nextProps.chapterList.chapters.length/this.itemCount);//总页数
        this.setState({
            datas:this.getDatas(nextProps.chapterList)
        })
        //判断是否有更多数据
        if(this.totalPage<=this.pageNum){
            this.isHasMore=false;//没有更多数据了
        }
       
        //将章节列表存储在localStorage中
        localStorage.setItem('bookList',JSON.stringify(nextProps.chapterList));
        //将当前的章节id存储到localStorage中
        localStorage.setItem('bookId',nextProps.match.params.id);
    }
    
    onLoadMore(){
        //加载更多按钮
        this.pageNum++;
        //判断是否有更多数据
        if(this.totalPage<=this.pageNum){
            this.isHasMore=false;//没有更多数据了
        }
        //加载数据
        this.setState({
            datas:[
                ...this.state.datas,
                ...this.getDatas(this.props.chapterList)
            ]
        });
    }

    render(){        
        const loadMore = this.isHasMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
              <Button onClick={this.onLoadMore.bind(this)}>加载更多</Button>
            </div>
          ) : null;

        return (<Layout style={{height:'100%'}}>
            <Header className="homeHeader">
                 {/* 头部 回退按钮*/}
                 <a href="#" className="search_back" onClick={this.goBack.bind(this)}>
                    <Icon type="arrow-left" />
                </a>
                <span className="book_intro_title">章节列表</span>
                <Link to="/" className="book_intra_share">
                    <Icon type="home"/>
                </Link>
            </Header>
            {/* 章节列表内容 */}
            <Content className="chapter_list_content">
                <List
                    loading={this.loading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={this.state.datas}
                    renderItem={item => (
                    <List.Item className="chapter_list_item">
                        <List.Item.Meta
                        title={<Link to={`/read/${item.order-1}`}>{item.title}</Link>}
                        />
                    </List.Item>
                    )}
                />
            </Content>
            </Layout>);
    }
}
const mapStateToProps=(state,parentProps)=>({
    chapterList: state.chapterList, //章节列表
    history:parentProps.history
});

const mapDispatchToProps=(dispatch,parentProps)=>({
    getChapterList(){
        //先获取书源列表
        dispatch(getOriginList(parentProps.match.params.id,
            //书源信息获取成功后获取章节信息
            ()=>dispatch(getChapterList())
        ));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)