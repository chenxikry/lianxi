import React, { Component } from 'react';
import {Layout,Carousel} from 'antd';
import ContentRecommend from './recommend';
//导入react-redux
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//导入Action
import {getRecommendList} from '../../redux/action';

//导入样式
import '../../style/home/content.css';

const {Content}=Layout;

//UI组件
class HomeContent extends Component{
    
    componentWillMount() {
        this.props.getRecommendList();

        //获取收藏列表
        this.favList=localStorage.getItem('favList');
        if(!this.favList){
            this.favList=[]
        }else{
            this.favList=JSON.parse(this.favList);
        }
    }
    
    render(){
        return (
            <Content>
                {/* 轮播组件 */}
                <Carousel autoplay>
                {
                    this.props.recommendList.map(
                        (val,i)=>
                        (<Link to={`/bookIntro/${val._id}`} className="img_link">
                        <div key={i} style={{backgroundImage:'url('+val.img+')'}} className="lunbo_img">
                        </div>
                        </Link>)
                    )
                }
                </Carousel>
                {/* 为了溢出可滚动 */}
                <div style={{height:'14rem',overflow:'auto'}}>
                    {/* 重磅推荐 */}
                    <ContentRecommend father="recommend" content={this.props.recommendList[0]} title="重磅推荐" extra="排行榜" icon="bar-chart"></ContentRecommend>

                    {/* 我的收藏 */}
                    <ContentRecommend father="fav" content={this.favList[0]} title="我的收藏" extra="收藏记录" icon="heart-o">
                                </ContentRecommend>
                </div>
             
            </Content>
        )
    }
}

//定义State到Props的映射函数
const mapStateToProps=(state)=>({
    recommendList:state.recommendList,
});
const mapDispatchToProps=(dispatch)=>({
    getRecommendList:()=>dispatch(getRecommendList())
})

//导出容器组件
export default connect(mapStateToProps,mapDispatchToProps)(HomeContent)

