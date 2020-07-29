import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';

// custom middlewares
const simpleThunk = (store) => {
  return (next) => {
    return (action) => {
      // Middleware logic
      if (typeof action === 'function') {
        // console.log(' >>>> simpleThunk working');
        return action(store.dispatch, store.getState);
      } else {
        return next(action);
      }
    };
  };
};

const simpleLogger = (store) => {
  return (next) => {
    return (action) => {
      // Middleware logic
      typeof action === 'function' ? console.group(action.type || 'Async Action') : console.group(action.type);
      console.info('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd();
      return result;
    };
  };
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(allReducers, composeEnhancer(applyMiddleware(simpleLogger, thunk)));
export default store;
