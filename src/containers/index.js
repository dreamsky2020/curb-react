import React from 'react';
import { withRouter, Route, Switch} from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import {connect} from 'react-redux';
import loadable from '@loadable/component'
const Routes = loadable(() => import('./routes'))
    
class Container extends React.Component {

    constructor(props){

        super(props);

        this.state = {
        }

    }


    render() {

        return (
            <LoadingOverlay
                active={this.props.loading}
                spinner
                // text='Loading your content...'
                className="loading-spinner"
            >
                <Switch>
                    <Route path='/' component={Routes}/>
                </Switch>

           </LoadingOverlay>

        );

    }

}


const mapStateToProps = state => ({
    loading: state.load.loading
})

export default withRouter(connect(mapStateToProps, {
    
})(Container));