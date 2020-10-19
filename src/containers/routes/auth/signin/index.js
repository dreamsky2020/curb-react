import React from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { signIn } from '../../../../store/actions/auth'
import './index.scss'

class SignIn extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            email: "",
            password: "",
        }

        this.onChangeInput = this.onChangeInput.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleSignIn(e) {
        e.preventDefault();
        const { email, password } = this.state;

        this.props.signIn({email, password});

    }

    onChangeInput(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    
    render() {

        if(this.props.isAuthenticated) {
            return (<Redirect to='/home' />); 
        }

        const { email, password } = this.state;
        return (
            <div id="signin">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.props.history.goBack()}><i className="fa fa-chevron-left"></i></span>
                </div>
                <div className="page-title">Sign in to curb-it</div>
                <div className="content">
                    <form>
                        <div className="form-group">
                            <label className="control-label">EMAIL</label>
                            <input 
                                type="email" 
                                name="email"
                                value={email}
                                onChange={this.onChangeInput}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">PASSWORD</label>
                            <input 
                                type="password"
                                name="password" 
                                value={password}
                                onChange={this.onChangeInput}
                                required 
                            />
                        </div>
                        <div>
                            <a className="left" onClick={() => this.props.history.push('/forgotpass')}>Forgot password?</a>
                            <a className="right" onClick={() => this.props.history.push('/signup')}>Create new account</a>
                            <div className="clearfix"></div>
                        </div>

                        <div className="text-center">
                            <button onClick={(e) => this.handleSignIn(e)} >Sign In</button>    
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default withRouter(connect(mapStateToProps, {
    signIn
})(SignIn));