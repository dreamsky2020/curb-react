import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import {FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined} from '@ant-design/icons'
import './index.scss'


class Footer extends Component {

    constructor(props) {

        super(props);

        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <section id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-md-3 mb-5 mb-md-0">
                                <h6 className="mb-4">Information</h6>
                                <ul className="m-0 p-0">
                                    <li className=" mb-3 list-unstyled"><NavLink to="/">About Us</NavLink></li>
                                    <li className=" mb-3 list-unstyled"><NavLink to="/">Privacy</NavLink></li>
                                    <li className=" mb-3 list-unstyled"><NavLink to="/">Fee</NavLink></li>
                                    <li className="list-unstyled"><NavLink to="/">Contact Us</NavLink></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-3 mb-5 mb-md-0">
                                <h6 className="mb-4">Popular Releases</h6>
                                <ul className="m-0 p-0">
                                    <li className=" mb-3 list-unstyled"><NavLink to="/">Jordan 1 Court Purple</NavLink></li>
                                    <li className=" mb-3 list-unstyled"><NavLink to="/">Nike Air Zoom Stussy Fossil</NavLink></li>
                                    <li className=" mb-3 list-unstyled"><NavLink to="/">Jordan 6 Retro DMP</NavLink></li>
                                    <li className="list-unstyled"><NavLink to="/">Yeezy 700 Alvah</NavLink></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-3">
                                <h6 className="mb-4">Accepted Payments</h6>
                                <img className="payment-icon" src="/images/paypal.png" alt="paypal-icon"/>
                                <img className="payment-icon" src="/images/card.png" alt="card-icon"/>
                                <img className="payment-icon" src="/images/deposit.png" alt="deposit-icon"/>
                            </div>
                            <div className="col-6 col-md-3">
                                <img className="logo" src="/images/logo.png" alt="logo"/>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="share">
                    <div className="w-100 d-flex justify-content-center h4">
                        <FacebookOutlined className="mr-3 pointer"/>
                        <InstagramOutlined className="mr-3 pointer"/>
                        <LinkedinOutlined className="mr-3 pointer"/>
                        <TwitterOutlined className=" pointer"/>
                    </div>
                    <p className="font-italic text-center mb-0 font-weight-lighter mt-3">©2020 Investakickz All Right Reversed</p>
                </div>
            </React.Fragment>
        )
    }
}

export default Footer
