import { combineReducers } from 'redux';
import todoReducer from './todoReducer.js';

const allReducers = combineReducers({
  todos: todoReducer,
});

export default allReducers;
