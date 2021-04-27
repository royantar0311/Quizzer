import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './root.reducer';
import { logger } from 'redux-logger';


const middleWares = [thunk, logger]

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWares))
)
export default store;