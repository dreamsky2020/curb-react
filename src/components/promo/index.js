import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import './index.scss'

class Promo extends Component {

    constructor(props){

        super(props);

        this.state = {}
    }

    render() {
        return (
            <section id="promo" className="d-flex position-relative" style={{
                backgroundImage: 'url("/images/promo1.jpeg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
                <div className="mask"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="text-white mb-3">60% off Shoes</h1>
                            <p className="text-white mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vel provident qui laudantium possimus aliquid quam quas facilis doloremque sed adipisci praesentium doloribus eius, cupiditate consectetur velit libero ullam blanditiis! Voluptatibus minima accusantium perspiciatis non neque et saepe minus recusandae.</p>
                            <button className="browsing-btn"><SearchOutlined className="mr-3"/> Browsing</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Promo

