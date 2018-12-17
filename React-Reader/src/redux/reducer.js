//共享数据有：收藏列表（首页和书籍详情页共享，书籍详情页设置收藏列表,首页显示收藏列表），
//           章节列表（章节列表页和阅读页都要获取显示）
//           浏览历史

//设计reducer
//1.加载控件显示与否标记
export const isShowLoading=(state=false,action)=>{
    switch (action.type) {
        case 'IS_LOADING':
            return action.loading;
        default:return state;
    }
}

//2.推荐列表的reducer
export const recommendList=(state=[],action)=>{
    switch(action.type){
        case "GET_RECOMMEND_LIST":
            return action.payload;
        default:
            return state;
    }
}


//3.收藏列表的reducer
//用localStorage实现了

//4.当前搜索内容
export const nowSearchContent=(state='',action)=>{
    switch (action.type) {
        case 'SET_NOW_SEARCH':
            return action.payload;
        default: return state;
    }
}

//5.搜索的历史记录
export const searchHistoryList=(state=['三体'],action)=>{
    switch (action.type) {
        case 'ADD_HISTORY':
            //如果已经添加过，则不添加
            if(state.includes(action.payload)){
                return state;
            }else{
                return [
                    ...state,
                    action.payload
                ];
            }           
        case 'REMOVE_HISTORY':
            return [
                ...state.slice(0,action.index),
                ...state.slice(action.index+1)
            ];
        case 'CLEAR_HISTORY':
            return [];
        default:return state;
    }
}
//6.搜索列表
export const searchList=(state=[],action)=>{
    switch (action.type) {
        case 'SET_SEARCH_LIST':
            //设置搜索列表
            return action.payload;
        default: return state;
            
    }
}

//7.当前书籍详情
export const bookIntro=(state={},action)=>{
    switch (action.type) {
        case 'SET_BOOK_INTRO':
            return action.payload;
        default: return state;
    }
}

//8.章节列表
export const chapterList=(state={},action)=>{
    switch (action.type) {
        case 'SET_CHAPTER_LSIT':
            return action.payload;
        default:return state;
            
    }
}

//9.书源列表
export const chapterOriginList=(state=[],action)=>{
    switch (action.type) {
        case 'SET_ORIGIN_LIST':
            return action.payload;
        default: return state;
    }
}

//当前书源id
export const currentOriginId=(state={},action)=>{
    switch (action.type) {
        case 'SET_ORIGIN_ID':
            return action.payload;
        default: return state;
    }
}