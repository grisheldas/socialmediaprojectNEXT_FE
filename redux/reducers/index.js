import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import loadingReducer from "./loadingReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducers";

const reducers = combineReducers({
  post: postReducer,
  loading: loadingReducer,
  user: userReducer,
});

const middlewares = [thunk];

export const store = createStore(reducers, applyMiddleware(...middlewares));
