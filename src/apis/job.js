import axios from 'axios';
import API_URL from './apiurl'

export const getCategoryFromZip = async (zip, headers) => {

    return await axios.get(`${API_URL.GETCATEGORYFROMZIP_URL + zip}`, { headers })
        .then(data => data.data)
        .catch(error => { throw error.response.data.error.description });
};

export const jobCreate = async (params, headers) => {

    return await axios.post(`${API_URL.JOBCREATE_URL}`, params, { headers })
        .then(data => data.data)
        .catch(error => { throw error.response.data.error.description });
};


export const jobHistory = async (params) => {

    return await axios.post(`${API_URL.JOBHISTORY_URL}`, params)
        .then(data => data.data)
        .catch(error => { throw error.response });
};