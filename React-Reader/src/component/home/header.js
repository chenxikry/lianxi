import React, { Component } from 'react';
import {Layout,Menu,Dropdown,Icon } from 'antd';
//导入样式
import '../../style/home/header.css';
//导入图片
import menuPng from '../../images/menu.png';

// Layout：布局容器，其下可嵌套 Header Sider Content Footer 或 Layout 本身，可以放在任何父容器中。
// Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
// Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
// Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
// Footer：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
const {Header}=Layout;

class HomeHeader extends Component{
     // 组件即将挂载钩子函数
     componentWillMount() {
        //定义下拉菜单显示隐藏的菜单项
        this.menu=( 
        <Menu>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                <Icon type="setting" />
                &nbsp;
                设置
              </a>
            </Menu.Item>
            <Menu.Item>
            
              <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                <Icon type="question-circle" />
                &nbsp;
                关于
              </a>
            </Menu.Item>
        </Menu>
        );
    }
    render(){
        return (
            <Header className="homeHeader">
                <span className="home_title">HAKA阅读器</span>
                {/* 下拉菜单 属性说明：
                    overlay：设置弹出的菜单
                    placement：菜单弹出位置
                    trigger：触发下拉的行为,值为数组，默认为['hover']
                */}
                <Dropdown overlay={this.menu} placement="bottomRight" trigger={['click']}>
                    {/* 下拉菜单里面可以使用任何元素作为触发器 */}
                    <img src={menuPng} className="home_dropdown_togger" alt="触发器"/>
                </Dropdown>
            </Header>
        )
    }
}

export default HomeHeader;