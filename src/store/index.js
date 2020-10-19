import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {};

export default function configureStore () {
    const store = createStore (reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));
    return store;
}
