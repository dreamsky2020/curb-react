import {v4 as uuid} from 'uuid';
import { SET_LOADING, REMOVE_LOADING } from '../actionTypes';

export const set_loading = () => dispatch => {
    dispatch ({
        type: SET_LOADING
    })
}

export const remove_loading = () => dispatch => {
    dispatch ({
        type: REMOVE_LOADING
    })
}