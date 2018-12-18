import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AppReducer } from "./reducer";
var rootReducer = combineReducers({
  AppReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
