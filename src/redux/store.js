import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import promiseMiddleware from "redux-promise-middleware";
import {composeWithDevTools} from "redux-devtools-extension"

import userReducer from './userReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
    posts: postReducer,
    comments: commentReducer,
    user: userReducer
})

export default createStore(rootReducer, compose(applyMiddleware(promiseMiddleware),composeWithDevTools()));
