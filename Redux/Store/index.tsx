

import { createStore, combineReducers } from 'redux';
import appReducer from "../Reducer/Reducer" 

const rootReducer = combineReducers({
  app: appReducer,
});

const store = createStore(rootReducer);

export default store;