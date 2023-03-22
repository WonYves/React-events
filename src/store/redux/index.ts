import { legacy_createStore, combineReducers, compose } from "redux";
import userReducer from "../reducer/inedx";

const myReducer = combineReducers({
  userReducer
})

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = legacy_createStore(myReducer)



 export default store