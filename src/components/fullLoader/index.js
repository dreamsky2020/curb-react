import React, { Component } from 'react'
import './index.scss'
import CircularProgress from 'components/circleProgress';

export default class FullLoader extends Component {

    constructor(props){

        super(props);

        this.state = {

        }
    }

    render() {

        return (

            <div id="full-loader" className={`${this.props.loading ? 'd-flex' : 'd-none'}`}>
                <CircularProgress size="15"/>
            </div>

        )

    }

}
