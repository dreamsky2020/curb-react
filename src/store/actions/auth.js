import {

    LOGIN_SUCCESS,

    LOGOUT,
   
} from '../actionTypes';

import axios from 'axios';


  
    

// Login User

export const signIn = ({ email, password}) => async dispatch => {

    const config = {
        headers: {
            'Content-type' : 'application/json'
        }
    }
    
    // const body = JSON.stringify({email, password});
    
    // try {
    //     const res = await axios.post('/api/auth', body, config);

        dispatch ({
            type: LOGIN_SUCCESS,
            // payload: res.data
        });
    // }
    // catch (err) {
        
    //     const errors = err.response.data.errors;

    //     if (errors) {
    //         // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    //     }
        
    //     dispatch ({
    //         type: LOGIN_FAIL
    //     });



    // }

}

// Logout

export const logout = () => dispatch => {
    dispatch ({
        type: LOGOUT
    })
}