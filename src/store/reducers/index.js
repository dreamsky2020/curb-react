
import { combineReducers} from 'redux';
import authReducer from './auth';
import loadingReducer from './load'

export default combineReducers({
    auth: authReducer,
    load: loadingReducer,
});