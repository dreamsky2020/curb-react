import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import './index.scss'

class HistoryJobItem extends React.Component {

    constructor(props){

        super(props);

        this.state = {
        }

        this.dateFormat = this.dateFormat.bind(this);
        this.handleLinkJob = this.handleLinkJob.bind(this);
    }

    dateFormat(timeStamp) {
        let date= new Date(timeStamp).toLocaleDateString("en-US");
        let hour = new Date(timeStamp).toLocaleTimeString("en-US")
        return date +" " + hour;
    }

    handleLinkJob() {
        const { jobData } = this.props;
        let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));
        data.completedJob = jobData._source;
        localStorage.setItem("##GO_TRASHY_WEB_CLIENT_STORE##", JSON.stringify(data));
        this.props.history.push("/completed-job");
    }

    
    render() {

        const { jobData } = this.props;

        return (
            <div id="history-job-item" onClick={() => this.handleLinkJob()}> 
                <img src="/images/private-home.png" width="40" height="50" alt="" />
                <div className="job-details">
                    <div className="title">Styrofoam Recycle - <i className="cancelled">Cancelled</i></div>
                    <div>2 Small, 1 Medium , 0 Large</div>
                    <div>
                        {this.dateFormat(jobData._source.completeDate)}
                    </div>
                    <div>
                        {jobData._source.address.city}, {jobData._source.address.region} {jobData._source.address.zipCode}
                    </div>
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
    
})(HistoryJobItem));