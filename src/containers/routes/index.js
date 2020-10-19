import React from 'react';
import { withRouter} from 'react-router-dom'
import { Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import loadable from '@loadable/component'
import {
    
} from 'store/actions/auth';
// const Header = loadable(() => import('components/header'))
// const Footer = loadable(() => import('components/footer'))
const Home = loadable(() => import('./home'))
const JobHistory = loadable(() => import('./job_history'))
const CompletedJob = loadable(() => import('./completed_job'))
const JobDetails = loadable(() => import('./job_details'))
const SetAvailability = loadable(() => import('./set-availability'))
const PublishedJob = loadable(() => import('./published_job'))
const ViewBids = loadable(() => import('./view-bids'))
const ContactUs = loadable(() => import('./contact'))
const Preferences = loadable(() => import('./preferences'))
const Landing = loadable(() => import('./landing'))
const SignIn = loadable(() => import('./auth/signin'))
const SignUp = loadable(() => import('./auth/signup'))
const ForgotPass = loadable(() => import('./auth/forgotpass'))
const Page404 = loadable(() => import('./page404'))
// const ProdDetails = loadable(() => import('./proddetails'))
// const CheckOut = loadable(() => import('./checkout'))
// const Bid = loadable(() => import('./bid'))
const RestrictedRoute = loadable(() => import('../restricted_routes'))



class Routes extends React.Component {

    constructor(props){

        super(props);

        this.state = {

            
        }
    }

    componentDidMount(){
        
    }

    componentDidUpdate () {
        
    }

    render() {

        return (
            <div id="route-container">
                {/* <Header/> */}
                <div id="route-content">
                    <Switch>
                        <Route exact path='/' component={Landing}/>
                        <Route exact path='/signin' component={SignIn}/>
                        <Route exact path='/signup' component={SignUp}/>
                        <Route exact path='/forgotpass' component={ForgotPass}/>
                        <RestrictedRoute  exact path='/home' component={Home}/>
                        <RestrictedRoute exact path='/history' component={JobHistory}/>
                        <RestrictedRoute exact path='/completed-job' component={CompletedJob}/>
                        <RestrictedRoute exact path="/job-details" component={JobDetails} />
                        <RestrictedRoute exact path="/set-availability" component={SetAvailability} />
                        <RestrictedRoute exact path="/published-job" component={PublishedJob} />
                        <RestrictedRoute exact path="/view-bids" component={ViewBids} />
                        <RestrictedRoute exact path="/contact" component={ContactUs} />
                        <RestrictedRoute exact path="/preferences" component={Preferences} />
                        <Route path='/404' component={Page404}/>
                        {/* <Route path='/checkout/:shoes_alias' component={CheckOut}/> */}
                        {/* <Route path='/bid/:shoes_alias' component={Bid}/> */}
                        {/* <Route path='/:shoes_alias' component={ProdDetails}/> */}
                        
                        {/* <Route path='/signup' component={SignUp}/>
                        <Route path='/signin' component={SignIn}/>
                        <Route path='/forgotpassword' component={ForgotPass}/>
                        <Route path="/confirm/:email" component={ConfirmAccount}/>
                        <Route path='/resetpassword/:email/:code' component={ResetPass}/> */}
                    </Switch>
                </div>
                {/* <Footer/> */}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default withRouter(connect(mapStateToProps, {
    
})(Routes));