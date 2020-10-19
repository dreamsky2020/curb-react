import React, { Component } from 'react'
import loadable from '@loadable/component'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.scss'

const SlidScreen = loadable(() => import('./slide_screen'))

class Jumbotron extends Component {

    constructor(props){

        super(props);

        this.state = {}
    }

    render() {

        return (
            <div id="jumbotron">
                <Carousel 
                    showArrows={false} showStatus={false} showThumbs={false} 
                    autoPlay={true} interval={4000} transitionTime={1500}
                    infiniteLoop={true}
                >
                    <SlidScreen 
                        title='Adidas Ultra Boost'
                        description='Shop below for every collab and colorway of the coziest innovation in adidas history, the adidas Ultra Boost.'
                        photo='/images/slid_shoes1.png'/>
                    <SlidScreen 
                        title='Air Jordan'
                        description="Buy and sell the greatest retro Air Jordans. We've got every Air Jordan silhouette, every collaboration, every colorway, in every size. Shop below."
                        photo='/images/slid_shoes2.png'/>
                    <SlidScreen 
                        title='Nike'
                        description="Buy and sell the greatest Nike shoes. We've got every Nike sneaker, every silhouette, every collaboration, every colorway, in every size. Shop below."
                        photo='/images/slid_shoes3.png'/>
                    <SlidScreen 
                        title='Sneakers'
                        description='From forecasting a sneaker’s market price, to their historical & cultural relevance, the StockX blog has you covered with all of the sneaker analysis you need.'
                        photo='/images/slid_shoes4.png'/>
                </Carousel>
            </div>
        )

    }
}


export default Jumbotron;
