import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'


class ShoesItem extends Component {

    constructor(props){

        super(props);

        this.state = {}
    }

    goDetails = () => {

        this.props.history.push(`/${this.props.shoes.alias}`)
    }

    render() {

        return (
            <div className="shoes-item" onClick={this.goDetails}>
                <div className="photo mb-3">
                    <img src={this.props.shoes.photo} alt="seller-photo"/>
                    <div className="mask"></div>
                </div>
                <h6 className="mb-2 name px-2">{this.props.shoes.name}</h6>
                <div className="text-left px-3">
                    <small className="text-grey font-weight-bold">Lowest Bid</small>
                    <h4 className="text-dark mb-0">${this.props.shoes.lowestBid}</h4>
                    <small className="text-grey font-weight-light">Sold: {this.props.shoes.soldCount}</small>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (reducer) => {

    const {user} = reducer;

    return {user}
};

export default withRouter(connect(mapStateToProps, {
    
})(ShoesItem));
