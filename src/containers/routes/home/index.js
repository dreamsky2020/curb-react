import React from 'react';
import {withRouter} from 'react-router-dom'
// import {connect} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Modal from 'react-modal';
import SidebarMenu from 'components/sidebar';

import './index.scss'

const MarkerComponent = ({ img_src }) => <div><img src={img_src} style={{width: "35px"}} alt="marker png" /></div>;

class Home extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 10,
            show_sidebar: false,
            address: "",
            job_address: {},
            coordinates: "",

            modalIsOpen: false,

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getJobAddress = this.getJobAddress.bind(this);
        this.handleSetJobLocation = this.handleSetJobLocation.bind(this);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(address) {
        this.setState({ address });
    };

    handleSelect(address) {
        geocodeByAddress(address)
        .then(results => {
                let address =  this.getJobAddress( results[0].address_components );
                this.setState({job_address: address});
        });

        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            this.setState({
                center: latLng,
                address: address
            });
            
        })
        .catch(error => console.error('Error', error));
    };

    getJobAddress(addressArray) {
        let address = {};
        address.city = "";
        address.country = "";
        address.region = "";
        address.streetName = "";
        address.streetNumber = "";
        address.zipCode = "";

        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && 'locality' === addressArray[ i ].types[0] ) {
                address.city = addressArray[ i ].short_name;
            }

            if ( addressArray[ i ].types[0] && 'country' === addressArray[ i ].types[0] ) {
                address.country = addressArray[ i ].short_name;
            }

            if ( addressArray[ i ].types[0] && "administrative_area_level_1" === addressArray[ i ].types[0] ) {
                address.region = addressArray[ i ].short_name;
            }

            if ( addressArray[ i ].types[0] && 'route' === addressArray[ i ].types[0] ) {
                address.streetName = addressArray[ i ].short_name;
            }

            if ( addressArray[ i ].types[0] && 'street_number' === addressArray[ i ].types[0] ) {
                address.streetNumber = addressArray[ i ].short_name;
            }

            if ( addressArray[ i ].types[0] && 'postal_code' === addressArray[ i ].types[0] ) {
                address.zipCode = addressArray[ i ].short_name;
            }
        }

        return address;
    };


    handleSetJobLocation() {
        const { job_address, center } = this.state;
        if(Object.keys(job_address).length !== 0 && job_address.streetNumber !== ""){
            let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));
            data.currentJob = { 
                address: job_address ,
                coordinates: center.lat + "," + center.lng 
            };
            data.completedJob = null;
            let clientId = data.jobDetails.clientId;
            data.jobDetails = {
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
            data.jobDetails.address = job_address;
            data.jobDetails.clientId = clientId;

            // test purpose
            if(clientId === "") data.jobDetails.clientId="praveen@j2.com";
            // ------

            localStorage.setItem('##GO_TRASHY_WEB_CLIENT_STORE##', JSON.stringify(data));
            this.props.history.push('/job-details');
        }
        else {
            this.setState({modalIsOpen: true});
        }
    }

    openModal() {
        this.setState({modalIsOpen: true});
      }
     
    closeModal(){
        this.setState({modalIsOpen: false});
    }
    
    

    render() {

        const { show_sidebar } = this.state;

        return (
            <div id="home">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.setState({ show_sidebar: true })}><i className="fa fa-bars"></i></span>
                </div>
                
                <div className="content">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBnxId9tM5yTShqzKULaCn8KHaZIQNZ36g" }}
                        defaultCenter={this.state.center}
                        center={this.state.center}
                        defaultZoom={this.state.zoom}
                        options={{fullscreenControl: false }}
                        className="map"
                    >
                        <MarkerComponent
                            lat={this.state.center.lat}
                            lng={this.state.center.lng}
                            img_src={"images/marker.png"}
                        />
                    </GoogleMapReact>

                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <div className="searchbox">
                                    <div className="title">JOB LOCATION</div>
                                    <div className="controls">
                                        <i className="fa fa-search"></i>
                                        <input
                                        {...getInputProps({
                                            placeholder: 'Search ...',
                                            className: 'location-search-input',
                                        })}
                                        />
                                        <span onClick={() => this.setState({ address: "" })} style={{cursor: "pointer"}}><i className="fa fa-times"></i></span>
                                    </div>
                                </div>

                                {suggestions.length > 0 && 
                                <div className="suggestions">
                                    { suggestions.map((suggestion, key) => 
                                        <div {...getSuggestionItemProps(suggestion)} key={key}>{suggestion.description}</div>
                                    )}
                                </div>
                                }
                                
                            </div>
                        )}

                    </PlacesAutocomplete>

                    <div className="sticky-setjob-container">
                        <button onClick={() => this.handleSetJobLocation()}>Set Job Location</button>
                    </div>


                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        className="Modal"
                        overlayClassName="Overlay"
                        ariaHideApp={false}
                    >
                        <div className="home-alert">
                            <p className="title" >Set Job Location</p>
                            <div>It appears there is not a house number</div>
                            <div className="footer">
                                <button onClick={this.closeModal}>OK</button>
                            </div>
                        </div>
                    
                    </Modal>

                </div>

                {show_sidebar &&
                    <SidebarMenu onClose={() => this.setState({ show_sidebar: false })} />
                }
            </div>
        );
    }
}


// const mapStateToProps = (reducer) => {
//     const {} = reducer;

//     return {}
// };

// export default withRouter(connect(mapStateToProps, {
    
// })(Home));

export default withRouter(Home);