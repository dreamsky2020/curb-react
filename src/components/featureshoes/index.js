import React, { Component } from 'react'
import loadable from '@loadable/component'
import './index.scss'
import shoesData from 'utils/shoeses'
const ShoesItem = loadable(()=>import('./shoes_items'))





class FeatureShoes extends Component {

    constructor(props){

        super(props);

        this.state = {

            shoeses : shoesData
        }
    }

    render() {

        const displayShoes = () => {

            return this.state.shoeses.map((shoes, index) => {

                return <div className="col-xl-3 col-md-4 col-sm-6 d-flex justify-content-center mb-3" key={index}>
                    <ShoesItem shoes={shoes}/>
                </div>
                
            })
        }

        return (
            <section id="feature-shoes">
                <div className="container">
                    <h2 className="text-center section-title">Feature Shoes</h2>
                    <div className="shoes">
                        <div className="row">
                            { displayShoes() }
                        </div>
                    </div>
                </div>
            </section>
        )

    }
}


export default FeatureShoes;
