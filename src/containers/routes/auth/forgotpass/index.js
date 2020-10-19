import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import './index.scss'

class ForgotPass extends React.Component {

    constructor(props){

        super(props);

        this.state = {
        }
    }

    
    render() {

        return (
            <div id="forgotpass">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.props.history.goBack()}><i className="fa fa-chevron-left"></i></span>
                </div>
                <div className="page-title">Forgot password</div>
                <div className="content">
                    <div className="description">
                        Enter your email address and we will send you a temporary password.
                    </div>
                    <form>
                        <div className="form-group">
                            <label className="control-label">EMAIL</label>
                            <input type="email" required />
                        </div>

                        <div className="text-center">
                            <button>Send Temporary Password</button>    
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (reducer) => {
    const {} = reducer;

    return {}
};

export default withRouter(connect(mapStateToProps, {
    
})(ForgotPass));