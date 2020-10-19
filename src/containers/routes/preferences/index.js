import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Switch from "react-switch";
import { Scrollbars } from 'react-custom-scrollbars';
import SidebarMenu from 'components/sidebar';

import './index.scss'

class Preferences extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            show_sidebar: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {

    }

    render() {

        const { show_sidebar } = this.state;

        return (
            <div id="preferences">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.setState({ show_sidebar: true })}><i className="fa fa-bars"></i></span>
                </div>
                <div className="page-title">Application Preferences</div>
                
                <Scrollbars className="scroll-container" autoHide>
                    <div className="content">
                        <form>
                            <div>
                                <h6>Personal Information</h6>

                                <div className="row sub-content">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="First Name" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="text" placeholder="Phone" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="text" placeholder="Email" />
                                        </div>
                                    </div>
                                </div>

                                <div className="actions">
                                    <button>Update Personal Info</button>
                                </div>
                            </div>
                            <div>
                                <h6>Notifications</h6>

                                <div className="sub-content notifications">
                                    <Switch
                                        // defaultChecked={true}
                                        checked={true}
                                        onChange={this.handleChange.bind(this)}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={20}
                                        width={40}
                                        onColor="#ffce00"
                                        offColor="#8AA1B1"
                                        offHandleColor="#222222" />


                                    <div className="ml-20">Receive SMS Notifications</div>
                                </div>
                            </div>
                            <div>
                                <h6>Password</h6>
                                <div className="row sub-content">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="password" placeholder="Enter current password" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="password" placeholder="Enter new password" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="password" placeholder="Re-enter new password" />
                                        </div>
                                    </div>
                                </div>

                                <div className="actions">
                                    <button>Update Password</button>
                                </div>
                            </div>
                            <div>
                                <h6>Card Information</h6>
                                <div className="row sub-content">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="text" placeholder="Payment Card Number" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="MM/YY" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="CVV" />
                                        </div>
                                    </div>
                                </div>

                                <div className="actions">
                                    <button>Update Card Info</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Scrollbars>

                {show_sidebar &&
                    <SidebarMenu onClose={() => this.setState({ show_sidebar: false })} />
                }
            </div>
        );
    }
}


const mapStateToProps = (reducer) => {
    const {} = reducer;

    return {}
};

export default withRouter(connect(mapStateToProps, {
    
})(Preferences));