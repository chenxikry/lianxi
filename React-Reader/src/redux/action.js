//导入fetch
import 'whatwg-fetch';//具有全局对象fetch

//是否显示加载控件的Action Creator
export function showLoading(loading){
    return {
        loading,
        type:'IS_LOADING'
    }
}

export function addRecommendList(payload){
    return {
        type:'GET_RECOMMEND_LIST',
        payload
    }
}

//推荐列表的Action Creator设计为函数
export function getRecommendList(){
    //中间件传递给action的两个参数
    return function(dispatch,state){
        //获取推荐列表数据，因为是本地json文件,打包后的文件路径无法得知，因此用require方法直接导入
        fetch('/home')
        .then(res=>res.json())
        .then(res=>{
            console.log('请求成功:',res);

            res.data.forEach(val => {
                if(val.img.includes('/static/')){
                    return;
                }
                val.img=require('../'+val.img);
                val.logo=require('../'+val.logo);
            });
            dispatch(addRecommendList(res.data));
        })
        .catch(err=>{
            console.log('请求失败',err);
        })
    }
}

//删除搜索历史记录的Action Creator
export function removeHistory(index) {
    return {
        type:'REMOVE_HISTORY',
        index
    }
    
}
//清空搜索历史记录的Action Creator
export function clearHistory() {
    return {
        type:'CLEAR_HISTORY',
    }
}
//添加搜索历史记录的Action Creator
export function addHistory(payload) {
    return {
        type:'ADD_HISTORY',
        payload
    }
}

//设置搜索内容
export function setNowSearchContent(payload) {
    return {
        type:'SET_NOW_SEARCH',
        payload
    }
}

//获取搜索列表
export function getSearchList(name) {
   return (dispatch,state)=>{
        //如果搜索内容为空
        if(name===''){
           return dispatch({
                type:'SET_SEARCH_LIST',
                payload:[]
            });
        }

        //搜索前先显示加载框
        dispatch(showLoading(true));
        //请求搜索数据
        fetch(`/api/book/fuzzy-search?query=${name}&start=0`)
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            //请求成功
            if(data.ok){
                dispatch({
                    type:'SET_SEARCH_LIST',
                    payload:data.books
                    });
            }           
            //隐藏显示框
            dispatch(showLoading(false));
        })
        .catch(err=>{
            //请求失败
            dispatch(showLoading(false));
            console.error(new Error(err));
        })
   }
}

//获取书籍详情的Action Creator
export function getBookIntro(id) {
    return (dispatch,state)=>{
        if(!id){
            return;
        }
        //开始请求前，先显示加载框
        dispatch(showLoading(true));
        //请求数据
        fetch(`/api/book/${id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            //隐藏加载框
            dispatch(showLoading(false));

            //设置书籍详情数据
            dispatch({
                type:'SET_BOOK_INTRO',
                payload:data
            })
        })
        .catch(err=>{
            console.error(new Error(err));
            dispatch(showLoading(false));
        })
    }
}

//获取章节列表
export function getChapterList(){
    return (dispatch,state)=>{
        //获取书源id
        let originId=state.currentOriginId._id||state.chapterOriginList[0]._id||null;
        if(originId==null){
            alert('没有任何书源可以获取');
            return;
        }

        //如果当前源为空
        if(!state.currentOriginId._id){
            //设置当前源
            dispatch({
                type:'SET_ORIGIN_ID',
                payload:state.chapterOriginList[0]
            });
        }

        //显示加载框
        dispatch(showLoading(true));
        //请求章节数据
        fetch(`/api/toc/${originId}?view=chapters`)
        .then(res=>res.json())
        .then(data=>{
            //请求成功
            dispatch(showLoading(false));//隐藏加载框
            dispatch({
                type:'SET_CHAPTER_LSIT',
                payload:data
            });
        })
        .catch(err=>{
            //请求失败
            dispatch(showLoading(false));//隐藏加载框
            console.error(new Error(err));
        })
    }
}

//获取章节源列表
export function getOriginList(bookId,callback) {
    return (dispatch)=>{
      //显示加载框
      dispatch(showLoading(true));
      //请求章节源列表数据
      fetch(`/api/toc?view=summary&book=${bookId}`)
      .then(res=>res.json())
      .then(data=>{
          //请求成功
          dispatch(showLoading(false));//隐藏加载框
          dispatch({
              type:'SET_ORIGIN_LIST',
              payload:data
          });
          //调用外界的回调函数
          callback&&callback();
      })
      .catch(err=>{
          //请求失败
          dispatch(showLoading(false));//隐藏加载框
          console.error(new Error(err));
      })
    }
}
