import React from 'react';
import {withRouter} from 'react-router-dom'
import {Divider, Button, Select, Input, Form} from 'antd'
import {ClockCircleOutlined} from '@ant-design/icons'
import loadable from '@loadable/component'
import {connect} from 'react-redux';
import {} from 'store/actions/auth';
import moment from 'moment'
import shoesData from 'utils/shoeses'
import './index.scss'
const { Option } = Select;
const Back = loadable(() => import('components/back'))



class Bid extends React.Component {

    constructor(props){

        super(props);

        this.state = {

            loading: false,

            shoes: null,

            shippingFee: 2.57,

            tax: 1.54,

            fee: 2.63,

            price: 0,
        }
    }

    componentDidMount(){

        const shoeses = shoesData.filter(sh => sh.alias === this.props.match.params.shoes_alias);

        if (shoeses.length === 0) this.props.history.push('/404');
       
        this.setState({shoes: shoeses[0], price: shoeses[0].highestBid})
    }

    componentDidUpdate () {
        
    }

    changeSize = (value) => {

    }

    changePrice = (e) => {

        const price = Number(e.target.value);
        
        if (price) this.setState({price: price})
    }

    cardComplete = () => {
        
        this.setState({paymentMethod: 'card'})
    }

    bid = () => {

        this.setState({loading: true})

        setTimeout(()=>{ 
            
            this.setState({ loading: false}) 

            this.props.history.goBack();

        }, 3000)
    }

    goBack = () => {

        this.props.history.goBack()
    }

    render() {

        if (!this.state.shoes) return null;

        return (
            <div id="bid">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12"><Back label="BACK" className="mb-3" onClick={this.goBack}/></div>
                        <div className="col-lg-6">
                            <h2 className="text-dark title">{this.state.shoes.name}</h2>
                            <div className="trust-info text-grey h6 font-weight-light">
                                <span>Condition: </span><span className="text-success">{this.state.shoes.condition}</span>
                                <Divider type="vertical" className="bg-dark"/>
                                <span>Ticker: </span><span className="text-dark">{this.state.shoes.ticker}</span>
                                <Divider type="vertical" className="bg-dark"/>
                                <span className="text-success">{this.state.shoes.authentic}% </span><span className="text-success">Authentic</span>
                            </div>
                            <div className="photo">
                                <img src={this.state.shoes.photo} alt="shoes"/>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="prod-info font-family-secondary">
                                        <p className="m-0"><span className="text-grey">STYLE: </span><span className="font-weight-light text-dark">{this.state.shoes.style}</span></p>
                                        <p className="m-0"><span className="text-grey">COLOR: </span><span className="font-weight-light text-dark">{this.state.shoes.colors.join(', ').toUpperCase()}</span></p>
                                        <p className="m-0"><span className="text-grey">RETAIL PRICE: </span><span className="font-weight-light text-dark">$ {this.state.shoes.retailPrice}</span></p>
                                        <p className="m-0"><span className="text-grey">RELEASE DATE: </span><span className="font-weight-light text-dark">{moment(this.state.shoes.releaseDate, 'YYYY-MM-DD').format('MMM DD, YYYY')}</span></p>
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-3 mt-sm-0 d-flex justify-content-center align-items-center">
                                    <div className="text-center bid-price">
                                        <p className="text-success mb-0">${this.state.shoes.highestBid.toFixed(2)}</p>
                                        <p className="text-grey m-0">Highest Bid</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-3 mt-lg-0">
                            <div className="checkout-form font-family-secondary">
                                <Form>
                                    <Select defaultValue="8" onChange={this.changeSize} className="size mb-5" size="large" listHeight={200}>
                                        <Option value="7.0">US Men's Size 7</Option>
                                        <Option value="7.5">US Men's Size 7.5</Option>
                                        <Option value="8">US Men's Size 8</Option>
                                        <Option value="9">US Men's Size 9</Option>
                                        <Option value="10">US Men's Size 10</Option>
                                        <Option value="11">US Men's Size 11</Option>
                                        <Option value="12">US Men's Size 12</Option>
                                        <Option value="13">US Men's Size 13</Option>
                                    </Select>
                                    <div className="price d-flex align-items-center mb-5">
                                        <h6 className="text-dark w-50 mb-0">PRICE</h6>
                                        <Form.Item name="username" rules={[{ required: true, message: 'Please input price'}]} className="w-50 mb-0">
                                            <Input prefix="$" suffix="USD" size="large" defaultValue={this.state.price} name="price" onChange={this.changePrice}/>
                                        </Form.Item>
                                    </div>
                                    <div className="fee d-flex align-items-center">
                                        <h6 className="text-dark w-50">PROCESSING FEE</h6>
                                        <h5 className="text-success w-50 text-right">${this.state.fee}</h5>
                                    </div>
                                    <Divider className="divider" dashed />
                                    <div className="fee d-flex align-items-center">
                                        <h6 className="text-dark w-50">SHIPPING</h6>
                                        <h5 className="text-success w-50 text-right">${this.state.shippingFee}</h5>
                                    </div>
                                    <Divider className="divider" dashed />
                                    <div className="fee d-flex align-items-center">
                                        <h6 className="text-dark w-50">TAX</h6>
                                        <h5 className="text-success w-50 text-right">${this.state.tax}</h5>
                                    </div>
                                    <Divider className="divider" dashed />
                                    <div className="fee d-flex align-items-center">
                                        <h5 className="font-weight-bold text-dark w-50">TOTAL</h5>
                                        <h4 className="text-success w-50 text-right">${(this.state.price + this.state.fee + this.state.shippingFee + this.state.tax).toFixed(2)}</h4>
                                    </div>
                                    <div className="text-center mt-5">
                                        <Button loading={this.state.loading} type="primary" 
                                            icon={<ClockCircleOutlined className="mr-3"/>} className=" w-100" size="large" 
                                            style={{minHeight: '50px'}} onClick={this.bid}>BID</Button>
                                    </div>
                                    
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (reducer) => {

    const { isLoader, user} = reducer;

    return {isLoader, user}
};

export default withRouter(connect(mapStateToProps, {
    
})(Bid));