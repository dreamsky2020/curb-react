import React from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import  { set_loading, remove_loading } from '../../../../store/actions/load'
import InputMask from 'react-input-mask';
import { register, cardAuthorize } from '../../../../apis/auth';
import Modal from 'react-modal';


import './index.scss'
// import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

class SignUp extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            value: '',
            mask: '9999-9999-9999-9999',
            show_personal: true,

            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            zipCode: "",
            password: "",
            confirmPassword: "",

            paymentNumber: "",
            exp_date: "",
            cvc: "",

            alertMessage: "",
            mustLength: false,
            mustUppercase: false,
            mustLowercase: false,
            mustNumber: false,
            mustMatch: false,

            modalIsOpen: false,
            error: "",

        }

        this.onChangeInput = this.onChangeInput.bind(this);
        this.createAccount = this.createAccount.bind(this);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onChange = (event) => {
        var value = event.target.value;
        var newState = {
          mask: '9999-9999-9999-9999',
          value: value
        };
        if (/^3[47]/.test(value)) {
          newState.mask = '9999-999999-99999';
        }
        this.setState(newState);
    }
    
    OnNext(event) {
        event.preventDefault();       

        const { 
            firstName, 
            lastName, 
            email, 
            phone, 
            zipCode, 
            password,
            confirmPassword
        } = this.state;

        this.setState({alertMessage: ""});

        if(firstName.trim() === "") {
            this.setState({alertMessage: "Error! Please enter your first name."});
            return;
        }

        if(lastName.trim() === "") {
            this.setState({alertMessage: "Error! Please enter your last name."});
            return;
        }

        if(email.trim() === "") {
            this.setState({alertMessage: "Error! Please enter your email address."});
            return;
        }

        if(zipCode.trim() === "") {
            this.setState({alertMessage: "Error! Please enter your zipCode"});
            return;
        }

        if(zipCode.trim() === "") {
            this.setState({alertMessage: "Error! Please enter your zipCode."});
            return;
        }

        if(phone.trim() === "") {
            this.setState({alertMessage: "Error! Please enter a valid telephone number."});
            return;
        }

        if(!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) && password.length > 8)) {
            return;
        }

        if(password !== confirmPassword) {
            this.setState({alertMessage: "Error! Passwords do not match."});
            return;
        }

        let params = {
            firstName: firstName, 
            lastName: lastName,
            email: email,
            phone: "+" + phone.replace("(", "").replace(")", "").replace("-", "").replace(/[ ]/g, ""),
            zipCode: zipCode,
            password: password
        }

        let headers = { 
            'Content-Type': 'application/json',
            'x-api-key': 'KEEkjpOrvK7NAPUIhtj56cvVG8Bmawo9LtfLfcE5'
        };


        if(password === confirmPassword) {
            let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));
            data.jobDetails.clientId = email;
            localStorage.setItem("##GO_TRASHY_WEB_CLIENT_STORE##", JSON.stringify(data));
            
            this.props.set_loading();
            register(params, headers)
            .then(data => {
                this.props.remove_loading();
                console.log(data);
                this.setState({
                    show_personal: false
                });
            })
            .catch(error => this.setState({error: JSON.stringify(error)}, () => {
                this.props.remove_loading();
                this.openModal();
            }));
            
        }
    }

    onChangeInput(event) {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.password === this.state.confirmPassword) this.setState({mustMatch: true});
            else this.setState({mustMatch: false});
        });

        if(event.target.name === "password") {
            if(/[A-Z]/ .test(event.target.value)) this.setState({mustUppercase: true});
            else this.setState({mustUppercase: false});

            if(/[a-z]/ .test(event.target.value))  this.setState({mustLowercase: true});
            else this.setState({mustLowercase: false});

            if(/[0-9]/ .test(event.target.value))  this.setState({mustNumber: true});
            else this.setState({mustNumber: false});

            if((event.target.value).length > 8)  this.setState({mustLength: true});
            else this.setState({mustLength: false});
        }
    }

    OnPrev(event) {
        event.preventDefault();

        this.setState({
            show_personal: true
        })
    }

    createAccount(event) {
        event.preventDefault();

        const {
            email,
            paymentNumber,
            exp_date,
            cvc,
        } = this.state;


        let params = {
            email: email,
            number: paymentNumber.replace(/[ ]/g, ""),
            exp_month: Number(exp_date.slice(0, 2)),
            exp_year: Number("20" + exp_date.slice(3, 5)),
            cvc: cvc
        }

        let headers = { 
            'Content-Type': 'application/json',
            'x-api-key': 'KEEkjpOrvK7NAPUIhtj56cvVG8Bmawo9LtfLfcE5'
        };


        this.props.set_loading();
        cardAuthorize(params, headers)
        .then(data => {
            this.props.remove_loading();
            console.log(data);
            this.props.history.push('/signin');
        })
        .catch(error => this.setState({error: JSON.stringify(error)}, () => {
            this.props.remove_loading();
            this.openModal();
        }));

    }


    openModal() {
        this.setState({modalIsOpen: true});
      }
     
    closeModal(){
        this.setState({error: "", modalIsOpen: false});
    }

    render() {
        if(this.props.isAuthenticated) {
            return (<Redirect to='/home' />); 
        }

        const { show_personal } = this.state;
        const { 
            firstName, 
            lastName, 
            email, 
            phone, 
            zipCode, 
            password,
            confirmPassword,

            paymentNumber,
            exp_date,
            cvc,

            alertMessage,
            mustLength,
            mustUppercase,
            mustLowercase,
            mustNumber,
            mustMatch,
        } = this.state;

        return (
            <div id="signup">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.props.history.push('/signin')}><i className="fa fa-chevron-left"></i></span>
                </div>
                <div className="page-title">Create account</div>
                <div className="tab">
                    <div className={`${(!show_personal?"tab-btn disabled":"tab-btn")}`} onClick={this.OnPrev.bind(this)}>Personal Information</div>
                    <div className={`${(show_personal?"tab-btn disabled":"tab-btn")}`} onClick={this.OnNext.bind(this)}>Payment Information</div>
                </div>

                {alertMessage !== "" &&
                    <div className="alertMessage">
                        {alertMessage}                         
                    </div>
                }
                <div className="content">
                    
                    
                    {show_personal && 
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        value={firstName} 
                                        onChange={this.onChangeInput}
                                        name="firstName" 
                                        placeholder="First Name"
                                        required 
                                     />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        value={lastName}
                                        onChange={this.onChangeInput}
                                        placeholder="Last Name" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input 
                                        type="email"
                                        name="email"
                                        value={email} 
                                        onChange={this.onChangeInput}
                                        placeholder="Email" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <InputMask 
                                        mask="(999) 999-9999" 
                                        placeholder="Phone" 
                                        name="phone"
                                        value={phone}
                                        onChange={this.onChangeInput}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="zipCode"
                                        value={zipCode}
                                        onChange={this.onChangeInput}
                                        placeholder="Zip Code" 
                                        maxLength="5" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <input 
                                        type="password"
                                        name="password" 
                                        value={password}
                                        onChange={this.onChangeInput}
                                        placeholder="Password" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={this.onChangeInput}
                                        placeholder="Re-enter your password" 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="password-hint">
                            <div>
                                <i className={`${ mustLength ? "fa fa-check-square" : "far fa-square"}`}></i> Must be at least 8 characters long.
                            </div>
                            <div>
                                <i className={`${ mustUppercase ? "fa fa-check-square" : "far fa-square"}`}></i> Must contain some upper case letters.
                            </div>
                            <div>
                                <i className={`${ mustLowercase ? "fa fa-check-square" : "far fa-square"}`}></i> Must contain some lower case letters.
                            </div>
                            <div>
                                <i className={`${ mustNumber ? "fa fa-check-square" : "far fa-square"}`}></i> Must contain some numbers.
                            </div>
                            <div>
                                <i className={`${ mustMatch ? "fa fa-check-square" : "far fa-square"}`}></i> Passwords must match.
                            </div>
                        </div>

                        <div className="text-center">
                            <button onClick={this.OnNext.bind(this)}>Next</button>    
                        </div>
                    </form>
                    }

                    {!show_personal &&
                    <form>
                        <div className="description">
                            Payment information is needed for you to publish jobs for bids. <br/>
                            A charge is only made if you accept a bid.
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <InputMask  
                                        mask="9999 9999 9999 9999" 
                                        name="paymentNumber"
                                        value={paymentNumber}
                                        placeholder="Payment Card Number" 
                                        onChange={this.onChangeInput}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <InputMask 
                                        mask="99/99" 
                                        name="exp_date"
                                        value={exp_date}
                                        onChange={this.onChangeInput}
                                        placeholder="MM/YY" 
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        name="cvc" 
                                        value={cvc}
                                        onChange={this.onChangeInput}
                                        placeholder="cvc"
                                        maxLength="4" 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="password-hint">
                            <img src="/images/guaranteed-safe-updated-small.png" alt="" width="100%" />
                        </div>

                        <div className="text-center">
                            <button onClick={this.createAccount}>Create Account</button>    
                        </div>                        
                    </form>
                    }

                </div>


                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    ariaHideApp={false}
                >
                    <div className="home-alert">
                        <p className="title" >Alert</p>
                        <div>{this.state.error}</div>
                        <div className="footer">
                            <button onClick={() => this.closeModal()}>OK</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default withRouter(connect(mapStateToProps, {
    set_loading, remove_loading
})(SignUp));

