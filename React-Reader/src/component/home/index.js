import React, { Component } from 'react';


//导入子组件
import HomeHeader from './header';
import HomeContent from './content';
import HomeFooter from './footer';

//Layout:antd协助进行页面级整体布局
import {Layout } from 'antd';


class Home extends Component {
    render(){
        return (
            <Layout>
                <HomeHeader></HomeHeader>
                <HomeContent></HomeContent>
                <HomeFooter></HomeFooter>
            </Layout>
        )
    }
}
export default Home;