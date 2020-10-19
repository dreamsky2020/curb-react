import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { jobCreate } from '../../../apis/job'
import { Scrollbars } from 'react-custom-scrollbars';
import HistoryJobItem from 'components/historyJobItem';
import Modal from 'react-modal';


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

class PublishedJob extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            clientData: {},
            modalIsOpen: false,
            error: "",
        }

        this.handleGetBids = this.handleGetBids.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));
        this.setState({clientData: data});
    }

    handleGetBids() {
        let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));

        let params = data.jobDetails;

        let headers = { 
            'Content-Type': 'application/json',
            'x-api-key': 'KEEkjpOrvK7NAPUIhtj56cvVG8Bmawo9LtfLfcE5'
        };

        jobCreate(params, headers)
        .then(data => {
            console.log(data);
            this.props.history.push('/view-bids');
        })
        .catch(error => this.setState({error: JSON.stringify(error)}, () => {
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

        const { clientData } = this.state;

        return (
            <div id="published-job">
                <div className="navbar">
                    <a className="back-btn" onClick={() => this.props.history.goBack()}><i className="fa fa-chevron-left"></i></a>
                </div>
                <div className="page-title">Review Job Details</div>
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
                                    {clientData.currentJob.address.streetNumber} {clientData.currentJob.address.streetName}
                                </div>
                                <div>
                                    {clientData.currentJob.address.city}, {clientData.currentJob.address.region} {clientData.currentJob.address.zipCode} 
                                </div>
                            </div>
                        </div>                
                        
                        {clientData.jobDetails.jobCategory === "Yard Debris" && (
                            <JobComponent 
                                img_src="/images/yard-debris.png" 
                                title="Yard Debris" 
                                count={`${clientData.jobDetails.jobItems[0].count + " Big, " + clientData.jobDetails.jobItems[1].count + "Small"}`} 
                                price={`Price: $${clientData.jobDetails.jobItems[0].count*50 + clientData.jobDetails.jobItems[1].count*10}`}
                            />
                        )}

                        {clientData.jobDetails.jobCategory === "Count Category" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="Count Category" 
                                count={`${clientData.jobDetails.jobItems[0].count + " bag"}`} 
                                price={`Price: $${clientData.jobDetails.jobItems[0].count*10}`}
                            />
                        )}

                        {clientData.jobDetails.jobCategory === "Bid Category" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="Bid Category" 
                                count={""} 
                                price={""}
                            />

                        )}
                        {clientData.jobDetails.jobCategory === "JC new USA" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="JC new USA" 
                                count={""} 
                                price={""}
                            />
                        )}

                        {clientData.jobDetails.jobCategory === "WRS" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="WRS" 
                                count={`${clientData.jobDetails.jobItems[0].count + " Small Furniture, " 
                                        + clientData.jobDetails.jobItems[1].count + " Medium Furniture, "
                                        + clientData.jobDetails.jobItems[2].count  + " Couch/Reliner"}`} 
                                price=""
                            />
                        )}

                        {clientData.jobDetails.jobCategory === "Mixed Junk" && (
                            <JobComponent 
                                img_src="/images/quick-haul.png" 
                                title="Mixed Junk" 
                                count={""} 
                                price={""}
                            />
                        )}
                        
                        <div className="item">
                            <div className="item-logo">
                                <img src="/images/calendar.png" height="50" />
                            </div>
                            <div className="item-details">
                                <div className="title">Job Time</div>
                                <div>06/25/2020 Morning 9 PM - 12 AM</div>
                            </div>
                        </div>
                        
                        <div className="uploaded_img">
                        {clientData.jobDetails.pictures !== null ?
                            clientData.jobDetails.pictures.map((img_url, i) => {
                                return <label className="show-uploaded-file"  key={i}>
                                        <div className="image-loader" style={{background: `url(${img_url.base64})`}} />
                                    </label>
                            }): null
                        }
                        </div>

                        
                        <div className="categories">
                            <label>Items are</label>
                            <div>
                                <div className="checkbox-group">
                                    <div>
                                        <i className={`${clientData.jobDetails.areItemsOutside ? "fa fa-check-square": "far fa-square"}`}></i> Outside
                                    </div>
                                    <div>
                                        <i className={`${clientData.jobDetails.areItemsInside ? "fa fa-check-square": "far fa-square"}`}></i> Inside
                                    </div>
                                </div>
                                <div>
                                    <i className={`${clientData.jobDetails.isElevatorNeeded ? "fa fa-check-square": "far fa-square"}`}></i> Requires use of elevator
                                </div>
                                <div>
                                    <i className={`${clientData.jobDetails.areStairsNeeded ? "fa fa-check-square": "far fa-square"}`}></i> Requires use of stairs
                                </div>
                            </div>
                        </div>

                        <div className="notes">
                            <div className="title">
                                Confirm
                            </div>
                            <div className="detail">
                                <img src="images/not-hazardous.png" alt="not hazardous" />
                                <p>
                                    I affirm my job does not include hazardous materials.
                                </p>
                            </div>
                        </div>

                        <div className="actions">
                            <button onClick={() => this.props.history.goBack()}>Back</button>
                            <button onClick={() => this.handleGetBids()}>Get Bids</button>
                        </div>
                    </div>
                    )}
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


const mapStateToProps = (reducer) => {
    const {} = reducer;

    return {}
};

export default withRouter(connect(mapStateToProps, {
    
})(PublishedJob));