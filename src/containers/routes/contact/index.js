import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import SidebarMenu from 'components/sidebar';

import './index.scss'

class ContactUs extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            show_sidebar: false
        }
    }

    render() {

        const { show_sidebar } = this.state;

        return (
            <div id="contact">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.setState({ show_sidebar: true })}><i className="fa fa-bars"></i></span>
                </div>
                <div className="page-title">Contact Us</div>
                <div className="description">Please describe the issue</div>
                <div className="content">
                    <div>
                        <div className="form-group">
                            <textarea></textarea>
                        </div>
                        <div className="actions">
                            <button onClick={() => this.props.history.push("/home")}>Cancel</button>
                            <button>Send</button>
                        </div>
                    </div>
                </div>

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
    
})(ContactUs));