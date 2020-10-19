import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { logout } from '../../store/actions/auth'
import './index.scss'

class SidebarMenu extends React.Component {

    constructor(props){

        super(props);

        this.state = {
        }
    }

    goHome() {
        this.props.history.push('/home');
        this.props.onClose();
    }

    goJobHistory() {
        this.props.history.push('/history');
        this.props.onClose();
    }

    goPreferences() {
        this.props.history.push('/preferences');
        this.props.onClose();
    }

    goSupport() {
        this.props.history.push('/contact');
        this.props.onClose();
    }

    logOut() {
        this.props.logout();
        this.props.history.push('/signin');
        this.props.onClose();
    }

    render() {

        return (
            <div id="sidebar-menu">
                <div className="menus">
                    <div className="profile">
                        <img src="/images/avatar2.png" width="60" height="60" className="avatar" alt="avatar"/>
                        <div className="name">
                            <div>First name</div>
                            <div>Last name</div>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <span onClick={this.goHome.bind(this)}>
                                <img src="/images/my-job.png" width="20" height="20" alt="home"/>
                                Home
                            </span>
                        </li>
                        <li>
                            <span onClick={this.goJobHistory.bind(this)}>
                                <img src="/images/completed-jobs.png" width="20" height="20" alt="completed job"/>
                                Job History
                            </span>
                        </li>
                        <li>
                            <span onClick={this.goPreferences.bind(this)}>
                                <img src="/images/preferences.png" width="20" height="20" alt="preference"/>
                                Preferences
                            </span>
                        </li>
                        <li>
                            <span onClick={this.goSupport.bind(this)}>
                                <img src="/images/contact-go-trashy.png" width="20" height="20" alt="trash"/>
                                Contact curb-it
                            </span>
                        </li>
                        <li>
                            <span href="https://curb-it.com/customer-tutorial/" target="__blank">
                                <img src="/images/tutorial.png" width="20" height="20" alt="tutorial"/>
                                Tutorial
                            </span>
                        </li>
                        <li>
                            <span href="https://gotrashy.zendesk.com/hc/en-us/categories/360000571993-Customers" target="__blank">
                                <img src="/images/q-mark.png" width="20" height="20" alt="help"/>
                                Help
                            </span>
                        </li>
                        <li>
                            <span onClick={this.logOut.bind(this)}>
                                <img src="/images/logout.png" width="20" height="20" alt="log out"/>
                                Log Out
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="close-area" onClick={() => this.props.onClose()}></div>
            </div>
        );
    }
}


const mapStateToProps = (reducer) => {
    const {} = reducer;

    return {}
};

export default withRouter(connect(mapStateToProps, {
    logout
})(SidebarMenu));