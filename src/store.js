import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

// root reducer
import reducers from './reducers';

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// create the store
const logger = createLogger();
const configureStore = () => {
  const store = {
    ...createStore(reducers, composeEnhancers(applyMiddleware(thunk,logger)))
  };

  return store;
};


export default configureStore;