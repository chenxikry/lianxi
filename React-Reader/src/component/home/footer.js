import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

//导入样式
import '../../style/home/footer.css';

import {Layout,Icon,Row, Col } from 'antd';
const {Footer}=Layout;

class HomeFooter extends Component{
    render(){
        return (
            <Footer className="home_footer">
            {/* 底部导航 */}
            <Row>
                <Col span={8} className="home_footer_item">
                    <NavLink to="/" exact activeStyle={{color:'red'}}>
                    <Icon type="home" /><br/>
                        <span>Home</span>
                    </NavLink>
                </Col>
                <Col span={8} className="home_footer_item">
                <NavLink to="/search" exact activeStyle={{color:'red'}}>
                    <Icon type="search" /><br/>
                        <span>Search</span>
                 </NavLink>
                </Col>
                <Col span={8} className="home_footer_item">
                    <NavLink to={`/read/${localStorage.getItem('chapterIndex')}`} activeStyle={{color:'red'}}>
                        <Icon type="file-text" /><br/>
                        <span>Read</span>
                     </NavLink>
                </Col>
            </Row>
        </Footer>
        )
    }
}

export default HomeFooter;