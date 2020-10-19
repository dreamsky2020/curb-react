import React, { Component } from 'react'
import loadable from '@loadable/component'
import './index.scss'
const SellerItem = loadable(()=>import('./seller_items'))

class FeatureSellers extends Component {

    constructor(props){

        super(props);

        this.state = {

            sellers :[

                { name: 'Alan E', country: 'US', city: 'New York', regDate: 'Apr 12th 2020', photo: 'https://loremflickr.com/200/200/paris, boy/all' }, 

                { name: 'Michale', country: 'US', city: 'New York', regDate: 'Apr 12th 2020', photo: 'https://loremflickr.com/200/200/paris, boy/all' },

                { name: 'Jonathon', country: 'US', city: 'New York', regDate: 'Apr 12th 2020', photo: 'https://loremflickr.com/200/200/paris, boy/all' }, 

                { name: 'Robert L', country: 'US', city: 'New York', regDate: 'Apr 12th 2020', photo: 'https://loremflickr.com/200/200/paris, boy/all' },
                
                { name: 'Alan E', country: 'US', city: 'New York', regDate: 'Apr 12th 2020', photo: 'https://loremflickr.com/200/200/paris, boy/all' }, 

                { name: 'Michale', country: 'US', city: 'New York', regDate: 'Apr 12th 2020', photo: 'https://loremflickr.com/200/200/paris, boy/all' },

                { name: 'Jonathon', country: 'US', city: 'New York', regDate: 'Apr 12th 2020', photo: 'https://loremflickr.com/200/200/paris, boy/all' }, 

                { name: 'Robert L', country: 'US', city: 'New York', regDate: 'Apr 12th 2020', photo: 'https://loremflickr.com/200/200/paris, boy/all' },
            ]
        }
    }

    render() {

        const displaySeller = () => {

            return this.state.sellers.map((seller, index) => {

                return <div className="col-xl-3 col-md-4 col-6 d-flex justify-content-center mb-3" key={index}>
                    <SellerItem seller={seller}/>
                </div>
                
            })
        }

        return (
            <section id="feature-sellers">
                <div className="container">
                    <h2 className="text-center section-title">Feature Sellers</h2>
                    <div className="sellers">
                        <div className="row">
                            { displaySeller() }
                        </div>
                    </div>
                </div>
            </section>
        )

    }
}


export default FeatureSellers;
