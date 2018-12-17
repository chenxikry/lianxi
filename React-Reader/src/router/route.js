import React from 'react';//在当前文件中使用jsx时必须导入React

import {BrowserRouter as Router,
    Switch,Route,Redirect} 
    from 'react-router-dom';//需先执行cnpm install react-router-dom --save安装react-router-dom

// 主页组件
import Home from '../component/home';
import Search from '../component/search'
import BookIntro from '../component/book_intro'
import ChapterList from '../component/chapter_list';
import ReadDetail from '../component/read_detail'

//函数式组件
const MyRoute=()=>(<Router>
    <Switch>
        {/* 主页 */}
        <Route component={Home} path="/" exact></Route>
        {/* 搜索页面 */}
        <Route path="/search" component={Search}></Route>
        {/* 书籍详情页面 */}
        <Route path="/bookIntro/:id" component={BookIntro}></Route>
        {/* 章节列表页面 */}
        <Route path="/list_chapter/:id" component={ChapterList}></Route>
        {/* 章节详情页面 */}
        <Route path="/read/:id" component={ReadDetail}></Route>
        {/* 换源页面 */}

        {/* 重定向 */}
        <Redirect to="/"></Redirect>
    </Switch>
</Router>);
export default MyRoute;
  
