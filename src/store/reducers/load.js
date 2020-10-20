import { SET_LOADING, REMOVE_LOADING } from '../actionTypes';

const initialState = {
    loading: false,
};

export default function (state = initialState, action) {

    const { type } = action;

    switch(type) {

        case SET_LOADING:
            return {
                ...state, 
                loading: true
            }
        
        case REMOVE_LOADING:
                return {
                    ...state, 
                    loading: false
                }

        default:
            return state;
    }
}