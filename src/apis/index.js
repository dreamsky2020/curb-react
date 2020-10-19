import axios from 'axios';
import store from 'store'

axios.interceptors.response.use( (response) => {

    return response;
    
}, (error) => {

    if (error.response) {

        if (process.env.NODE_ENV === "development"){

            console.log(error);
        }

        if (error.response && error.response.status === 400){
            
            store.clearAll();
        }

        return Promise.reject(error);
    } else {
        
        return Promise.reject({

            response: {

                data: {code: 320, message: 'Network connection lost'}}
            }
        )
    }
    
});


export * from './auth'
