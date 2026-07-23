import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';  
import { rootReducer } from './root-reducer';

const logger = createLogger();                                                                                                                                                                       

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);