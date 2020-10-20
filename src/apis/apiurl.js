export default {

    /**
     * Auth 
     */    
    SIGNUP_URL: `${process.env.REACT_APP_SERVER_URL}/signup`,
    SIGNIN_URL: `${process.env.REACT_APP_SERVER_URL}/signin`,
    VERIFY_URL: `${process.env.REACT_APP_SERVER_URL}/verify`,
    RESEND_ACCOUNT_VERIFYCODE_URL: `${process.env.REACT_APP_SERVER_URL}/resend_verifycode`,
    FORGOTPASS_URL: `${process.env.REACT_APP_SERVER_URL}/forgot_password`,
    RESETPASS_URL: `${process.env.REACT_APP_SERVER_URL}/reset_password`,


    REGISTER_URL:`https://08x56m6svf.execute-api.us-west-2.amazonaws.com/stage/cit/client/create`,
    CARDAUTHORIZE_URL: `https://08x56m6svf.execute-api.us-west-2.amazonaws.com/stage/cit/card/authorize`,


    /**
     * Job 
     */ 
    GETCATEGORYFROMZIP_URL: `https://08x56m6svf.execute-api.us-west-2.amazonaws.com/stage/cit/category/zip/`,
     JOBCREATE_URL: `${ process.env.REACT_APP_SERVER_URL}/job/create`,
     JOBHISTORY_URL: `https://search-cit-es-7jyehkyzkjldsjnmezsbihh7mm.us-west-2.es.amazonaws.com/stage-job/_search`,
}