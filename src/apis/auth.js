import axios from 'axios';
import API_URL from './apiurl'

export const register = async (params, headers) => {

    return await axios.post(`${API_URL.REGISTER_URL}`, params,  { headers })
        .then(data => data.data)
        .catch(error => { throw error.response.data.error.description });
};

export const cardAuthorize = async (params, headers) => {

    return await axios.post(`${API_URL.CARDAUTHORIZE_URL}`, params,  { headers })
        .then(data => data.data)
        .catch(error => { throw error.response.data.error.description });
};







export const signUp = async (params) => {

    return await axios.post(`${API_URL.SIGNUP_URL}`, params)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const signIn = async (params) => {

    return await axios.post(`${API_URL.SIGNIN_URL}`, params)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const verify = async (params) => {

    return await axios.post(`${API_URL.VERIFY_URL}`, params)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const resendAccountVerifyCode = async (params) => {

    return await axios.post(`${API_URL.RESEND_ACCOUNT_VERIFYCODE_URL}`, params)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const forgotPass = async (params) => {

    return await axios.post(`${API_URL.FORGOTPASS_URL}`, params)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const resetPass = async (params) => {

    return await axios.post(`${API_URL.RESETPASS_URL}`, params)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};
