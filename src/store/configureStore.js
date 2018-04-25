import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from  'react-router';
import rootReducer from './rootReducer'
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const enhancers = compose(
  middleware,
  autoRehydrate(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(
  rootReducer,
  undefined,
  enhancers
);

const config = { whitelist: ['sessions'] };

export const history = syncHistoryWithStore(browserHistory, store)

persistStore(store, config)

export default store;
