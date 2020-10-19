import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
// import { jobCreate } from '../../../apis/job'
import { Scrollbars } from 'react-custom-scrollbars';
import HistoryJobItem from 'components/historyJobItem';

import axios from 'axios';
import './index.scss'



const JobComponent = ({ img_src, title, count, price }) => 
    <div className="item">
        <div className="item-logo">
            <img src={img_src} height="50" />
        </div>
        <div className="item-details">
            <div className="title">{title}</div>
            <div>{count}</div>
            <div>{price}</div>
        </div>
    </div>
;

class CompletedJob extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            clientData: {}
        }

        this.repost = this.repost.bind(this);
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));
        this.setState({clientData: data.completedJob}, () => {
            console.log(this.state.clientData)
        });
    }

    repost() {

        const { clientData } = this.state;
        let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));
        console.log(clientData.address)
        data.jobDetails.address = clientData.address;
        
        // data.jobDetails.jobCategory
        // data.jobDetails.jobItems
        data.jobDetails.areItemsOutside = clientData.areItemsOutside;
        data.jobDetails.areItemsInside = clientData.areItemsInside;
        data.jobDetails.areStairsNeeded = clientData.areStairsNeeded !== undefined ? clientData.areStairsNeeded: false;
        data.jobDetails.isElevatorNeeded = clientData.isElevatorNeeded !== undefined ? clientData.isElevatorNeeded: false;

        localStorage.setItem("##GO_TRASHY_WEB_CLIENT_STORE##", JSON.stringify(data));
        this.props.history.push("/set-availability");

    }
    
    render() {
        
        const { clientData } = this.state;

        return (
            <div id="completed-job">
                <div className="navbar">
                    <a className="back-btn" onClick={() => this.props.history.goBack()}><i className="fa fa-chevron-left"></i></a>
                </div>
                <div className="page-title">Cancelled by customer - {clientData.idHumanReadable}</div>
                <div className="content">
                    {Object.keys(clientData).length !== 0 && (
                    <div className="job">
                        <div className="item">
                            <div className="item-logo">
                                <img src="/images/pickup-location.png" height="50" />
                            </div>
                            <div className="item-details">
                                <div className="title">Job Location</div>
                                <div>
                                    {clientData.address.streetName}
                                </div>
                                <div>
                                    {clientData.address.city}, {clientData.address.region} {clientData.address.zipCode} 
                                </div>
                            </div>
                        </div>        

                        <JobComponent 
                                img_src="/images/yard-debris.png" 
                                title="Yard Debris" 
                                count={`1 Big, 2 Small`} 
                                price={`Price: $70.00`}
                            />        
                        
                        {/* {clientData.jobCategory.name === "Yard Debris" && (
                            <JobComponent 
                                img_src="/images/yard-debris.png" 
                                title="Yard Debris" 
                                count={`${clientData.jobDetails.jobItems[0].count + " Big, " + clientData.jobDetails.jobItems[1].count + "Small"}`} 
                                price={`Price: $${clientData.jobDetails.jobItems[0].count*50 + clientData.jobDetails.jobItems[1].count*10}`}
                            />
                        )}

                        {clientData.jobCategory.nam === "Count Category" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="Count Category" 
                                count={`${clientData.jobDetails.jobItems[0].count + " bag"}`} 
                                price={`Price: $${clientData.jobDetails.jobItems[0].count*10}`}
                            />
                        )}

                        {clientData.jobCategory.nam === "Bid Category" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="Bid Category" 
                                count={""} 
                                price={""}
                            />

                        )}
                        {clientData.jobCategory.nam === "JC new USA" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="JC new USA" 
                                count={""} 
                                price={""}
                            />
                        )}

                        {clientData.jobCategory.nam === "WRS" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="WRS" 
                                count={`${clientData.jobDetails.jobItems[0].count + " Small Furniture, " 
                                        + clientData.jobDetails.jobItems[1].count + " Medium Furniture, "
                                        + clientData.jobDetails.jobItems[2].count  + " Couch/Reliner"}`} 
                                price=""
                            />
                        )}

                        {clientData.jobCategory.nam === "Mixed Junk" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="Mixed Junk" 
                                count={""} 
                                price={""}
                            />
                        )} */}
                        
                        <div className="item">
                            <div className="item-logo">
                                <img src="/images/calendar.png" height="50" />
                            </div>
                            <div className="item-details">
                                <div className="title">Job Time</div>
                                <div>06/25/2020 Morning 9 PM - 12 AM</div>
                            </div>
                        </div>
                        
                        {/* <div className="uploaded_img">
                        {clientData.jobDetails.pictures !== null ?
                            clientData.jobDetails.pictures.map((img_url, i) => {
                                return <label className="show-uploaded-file"  key={i}>
                                        <div className="image-loader" style={{background: `url(${img_url.base64})`}} />
                                    </label>
                            }): null
                        }
                        </div> */}

                        
                        <div className="categories">
                            <label>Items are</label>
                            <div>
                                <div className="checkbox-group">
                                    <div>
                                        <i className={`${clientData.areItemsOutside ? "fa fa-check-square": "far fa-square"}`}></i> Outside
                                    </div>
                                    <div>
                                        <i className={`${clientData.areItemsInside ? "fa fa-check-square": "far fa-square"}`}></i> Inside
                                    </div>
                                </div>
                                <div>
                                    <i className={`${clientData.isElevatorNeeded ? "fa fa-check-square": "far fa-square"}`}></i> Requires use of elevator
                                </div>
                                <div>
                                    <i className={`${clientData.areStairsNeeded ? "fa fa-check-square": "far fa-square"}`}></i> Requires use of stairs
                                </div>
                            </div>
                        </div>

                        <div className="actions">
                            <button onClick={() => this.repost()}>Repost</button>
                            <button onClick={() => this.props.history.push("/contact")}>Support</button>
                        </div>
                    </div>
                    )}
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
    
})(CompletedJob));