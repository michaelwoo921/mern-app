import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from '../utils/setAuthToken';

const middleware = [thunk];
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentToken = store.getState().auth.token;

store.subscribe(() => {
  let prevToken = currentToken;
  currentToken = store.getState().auth.token;
  if (prevToken !== currentToken) {
    setAuthToken(currentToken);
  }
});

export default store;
