import React, { Component } from 'react'
import { CheckCircleOutlined, SearchOutlined } from '@ant-design/icons';

class SlideScreen extends Component {

    constructor(props){

        super(props);

        this.state = {}
    }

    render() {

        return (
            <div className="slid-screen">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center order-md-0 order-1">
                            <div className="w-100">
                                <div className="text-left d-md-block d-none">
                                    <h1 className="mb-5">{this.props.title}</h1>
                                    <p className="text-grey mb-3">{this.props.description}</p>
                                </div>
                                <div className="price-controls text-md-left text-center">
                                    <small className="text-grey">Latest Bid</small>
                                    <p> --- $38.90 <del className="ml-3 text-grey">$53.80</del></p>
                                    <div className="d-flex align-items-center justify-content-md-start justify-content-center">
                                        <button className="bid-btn"><CheckCircleOutlined className="mr-3" /> Bid</button>
                                        <button className="browsing-btn"><SearchOutlined className="mr-3"/> Browsing</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-1 order-0">
                            <img src={this.props.photo} alt="slid-photo"/>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default SlideScreen
