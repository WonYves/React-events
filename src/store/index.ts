import { legacy_createStore, combineReducers, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import userReducer from "../reducer/inedx";
import { persistStore, persistReducer } from 'redux-persist'  //持久化1
import storage from 'redux-persist/lib/storage' //持久化2


// 持久化3
const persistConfig = {
  key: 'wiess',  //键值对 键名称
  storage,  //存储在locastorage中
  // whitelist: ['userReducer']  //持久化白名单
}

// 多个 reducer合并
const myReducer = combineReducers({
  userReducer
})

const MyPersistReducer = persistReducer(persistConfig, myReducer) //持久化4  变为持久化的reducer

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = legacy_createStore(MyPersistReducer, composeEnhancers(applyMiddleware(reduxThunk)))

const persistor = persistStore(store) //持久化6

export  { store, persistor }