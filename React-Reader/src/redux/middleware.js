//编写中间件
//让dispatch可以接收函数的中间件
export const trunk=store=>dispatch=>action=>(
    typeof action == 'function'?action(dispatch,store.getState()):dispatch(action)
)
/**
 * 完整的写法：
 * const trunk=function(store){
 *  return function(dispatch){
 *      return function(action){
 *          //中间件逻辑
 *          if(typeof action == 'function'){
 *              //如果action是函数
 *              return action(dispatch,store.getState());
 *           }else{
 *              return dispatch(action);
 *           }
 *     }
 *  }
 * }
 */
//日志中间件
export const logger=store=>dispatch=>action=>{
    console.log('dispatch前：',action,store.getState());
    let rs=dispatch(action);
    console.log('dispatch后：',action,store.getState());
    return rs;
}