import {createStore,combineReducers,applyMiddleware} from 'redux';
import {favList,isShowLoading,recommendList,
    nowSearchContent,searchHistoryList,searchList,
    bookIntro,
    chapterList,chapterOriginList,currentOriginId} from './reducer';

//导入中间件
import {trunk,logger} from './middleware.js';

const store = createStore(combineReducers({
                        isShowLoading,recommendList,
                        nowSearchContent,searchHistoryList,searchList,
                        bookIntro,
                        chapterList,chapterOriginList,currentOriginId
                    }),
            //使用中间件
            applyMiddleware(trunk,logger));

export default store;