import { LOGIN_SUCCESS, LOGOUT } from '../actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function (state = initialState, action) {

    // const { type, payload} = action;
    const { type } = action;

    switch(type) {

        case LOGIN_SUCCESS:
            localStorage.setItem('token', JSON.stringify(1));
            // localStorage.setItem('token', payload.token);
            return {
                ...state, 
                // ...payload,
                isAuthenticated: true,
                loading: false
            }
        
        case LOGOUT:
                localStorage.removeItem('token')
                return {
                    ...state, 
                    token: null,
                    isAuthenticated: false,
                    loading: false
                }

        default:
            return state;
    }
}