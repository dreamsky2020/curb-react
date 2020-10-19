import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import SidebarMenu from 'components/sidebar';

import './index.scss'

class PublishedJob extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            show_sidebar: false,
        }
    }

    render() {
        const { show_sidebar } = this.state;

        return (
            <div id="view-bids">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.setState({ show_sidebar: true })}><i className="fa fa-bars"></i></span>
                </div>
                <div className="page-title">Job Published</div>
                <div className="content">
                    
                    <div className="bids">
                        <div className="waiting-container">
                            <div className="icon">
                                <img src="images/waiting-hauler.png" alt="waiting-hauler" />
                            </div>
                            <div className="detail">
                                <h3>Waiting For Bids</h3>
                                <p>
                                    Did you know you can chat with potential haulers right now?
                                </p>
                                <p>
                                    After you receive your first bid, you have 40 minutes before your job times out to due inactivity.
                                </p>
                            </div>
                        </div>

                        <div className="actions">
                            <button>Cancel</button>
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
    
})(PublishedJob));