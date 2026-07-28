import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';  
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

const logger = createLogger();                                                                                                                                                                       

const middleWares = [process.env.NODE_ENV != 'production' && logger].filter(
  Boolean
);


const persistConfig = {
  key: 'root',
  storage: {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
  },
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);