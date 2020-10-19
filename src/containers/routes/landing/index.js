import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import './index.scss'

class Landing extends React.Component {

    constructor(props){

        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        let data = {
            auth: {
                isSigned: false
            },
            completedJob: null,
            currentJob: null,
            jobDetails: {
                address: null,
                amount: 0,
                apartmentNumber: "",
                areItemsInside: false,
                areItemsOutside: false,
                areStairsNeeded: false,
                pictures: null,
                bids: [],
                chips: [],
                clientId: "",
                complimentsNumber: null,
                isElevatorNeeded: false,
                jobCategories: [],
                jobCategoryId: "",
                jobCategory: "",
                jobId: "",
                jobItems: null,
                note: "",
                providerId: "",
                selectedJobCategory: "0",
                timeSlots: [],
                subCategories: [],
            }
        }
        localStorage.setItem('##GO_TRASHY_WEB_CLIENT_STORE##', JSON.stringify(data));
    }

    
    render() {

        return (
            <div id="landing">
                
                <div>
                    <button onClick={() => this.props.history.push('/signin')}>Sign In</button>
                    <h6>Learn how to become a Curb-it hauler.</h6>
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
    
})(Landing));