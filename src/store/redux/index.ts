import { legacy_createStore, combineReducers, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import userReducer from "../reducer/inedx";

const myReducer = combineReducers({
  userReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = legacy_createStore(myReducer, composeEnhancers(applyMiddleware(reduxThunk)))

export default store