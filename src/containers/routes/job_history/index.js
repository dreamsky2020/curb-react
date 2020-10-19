import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import HistoryJobItem from 'components/historyJobItem';
import SidebarMenu from 'components/sidebar';

import { jobHistory } from '../../../apis/job'

import './index.scss'

class JobHistory extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            show_sidebar: false,

            jobHistoryData: [],
        }
    }

    componentWillMount() {
        const params = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {"status": "COMPLETED"}
                        },
                        {
                            "exists": {"field": "discount"}
                        }
                    ]
                }
            },
            "sort": {
                "modifyDate": {"order": "desc"}
            }
        }

        jobHistory(params)
        .then(data => {
            this.setState({jobHistoryData: data.hits.hits}); 
            console.log(data)
        });

    }

    render() {

        const { show_sidebar } = this.state;
        const { jobHistoryData } = this.state;

        return (
            <div id="history">
                <div className="navbar">
                    <a className="back-btn" onClick={() => this.setState({ show_sidebar: true })}><i className="fa fa-bars"></i></a>
                </div>
                <div className="page-title">Job History</div>

                {jobHistoryData.length > 0 && 
                    <div className="content">
                        <Scrollbars style={{ width: '100%', height: '100%' }} autoHide>
                            {jobHistoryData.map((jobData, i) => {
                                return <HistoryJobItem jobData={jobData} key={i}/>
                            })}

                        </Scrollbars>
                    </div>
                }

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
    
})(JobHistory));