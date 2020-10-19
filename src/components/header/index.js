import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link} from 'react-scroll';
import './index.scss'


class Header extends Component {

    constructor(props){

        super(props);

        this.state = {

            isHome: this.props.location.pathname === '/' ? true : false,

            isShow: false
        }

        this.headerRef = React.createRef()
    }

    componentDidMount(){

        if (this.state.isHome) {
            
            window.addEventListener('scroll', this.stickyHeader)
        }else{

            this.headerRef.current.className = 'show'

            this.setState({isShow : true})
        }
    }

    componentDidUpdate(prevProps, prevStatus) {

        if (prevProps.location.pathname !== '/' && this.props.location.pathname === '/') {

            this.stickyHeader();

            return window.addEventListener('scroll', this.stickyHeader)
        }

        if (prevProps.location.pathname === '/' && this.props.location.pathname !== '/') {

            this.headerRef.current.className = 'show'

            this.setState({isShow : true})

            return window.removeEventListener('scroll', this.stickyHeader)
        }
    }

    stickyHeader = () => {

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop

        if (winScroll > 150 & !this.state.isShow) {

            this.headerRef.current.className = 'show'

            this.setState({isShow : true})
        }

        if (winScroll <= 150  & this.state.isShow) {

            this.headerRef.current.className = 'hide'

            this.setState({isShow : false})
        }
    }

    goHome = () => {

        this.props.history.push('/')
    }

    render() {

        return (
            <div id="header" ref={this.headerRef} className="hide">
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-12 d-flex justify-content-between align-items-center h-100">
                            <div className="logo pointer"><img src="/images/logo.png" alt="logo" onClick={this.goHome}/></div>
                            <div className="menu">
                                <Link to="" className="menu-item">Browsing</Link>
                                <Link activeClass="active" to="feature-sellers" className="menu-item" spy={true} smooth={true} offset={-80} duration={500}>Feature Sellers</Link>
                                <Link activeClass="active" to="feature-shoes" className="menu-item" spy={true} smooth={true} offset={-80} duration={500}>Feature Shoes</Link>
                                <Link to="" className="menu-item">Login</Link>
                                <Link to="" className="menu-item">Signup</Link>
                            </div>
                            <button className="sell-btn">Sell</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (reducer) => {

    const { user } = reducer;

    return {user}

};


export default withRouter(connect(mapStateToProps, {})(Header));
