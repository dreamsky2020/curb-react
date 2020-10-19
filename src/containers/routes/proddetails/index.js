import React from 'react';
import {withRouter} from 'react-router-dom'
import {Divider, Button, Table, Avatar} from 'antd'
import {ShareAltOutlined, UserAddOutlined, ShoppingOutlined, ShopOutlined, QuestionCircleOutlined, ClockCircleOutlined} from '@ant-design/icons'
import loadable from '@loadable/component'
import {connect} from 'react-redux';
import {} from 'store/actions/auth';
import moment from 'moment'
import shoesData from 'utils/shoeses'
import asksData from 'utils/asks'
import bidsData from 'utils/asks'
import salesData from 'utils/sales'
import './index.scss'
const Back = loadable(() => import('components/back'))



class ProdDetails extends React.Component {

    constructor(props){

        super(props);

        this.state = {

            shoes: null,

            asksDataSource: asksData,

            asksColumns: [],

            bidsDataSource: bidsData,

            bidsColumns: [],
            
            salesDataSource: salesData,

            salesColumns: []
        }
    }

    componentDidMount(){

        const shoeses = shoesData.filter(sh => sh.alias === this.props.match.params.shoes_alias);

        if (shoeses.length === 0) this.props.history.push('/404');
       
        this.setState({

            shoes: shoeses[0],

            asksColumns: [

                { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => {

                    return <span>${price}</span>
                    
                }, className:"p-0 py-1 text-center"},

                { title: '# of Ask', dataIndex: 'count', key: 'count', className:"p-0 py-1 text-center"},

                { title: 'User', dataIndex: 'user', key: 'user', render: (user) => {

                    return <div><Avatar src={user.photo}/><small className="m-0 d-block">{user.name}</small></div>
                }, className:"p-0 py-1 text-center"}
            ],

            bidsColumns: [

                { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => {

                    return <span>${price}</span>
                    
                }, className:"p-0 py-1 text-center"},

                { title: '# of Bid', dataIndex: 'count', key: 'count', className:"p-0 py-1 text-center"},

                { title: 'User', dataIndex: 'user', key: 'user', render: (user) => {

                    return <div><Avatar src={user.photo}/><small className="m-0 d-block">{user.name}</small></div>
                }, className:"p-0 py-1 text-center"}
            ],

            salesColumns: [

                { title: 'Size', dataIndex: 'size', key: 'size', className:"p-0 py-1 text-center"},

                { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => {

                    return <span>${price}</span>
                    
                }, className:"p-0 py-1 text-center"},

                { title: 'Date', dataIndex: 'date', key: 'date', render: (date) => {

                    return <span>{moment(date, 'YYYY-MM-DD HH:mm A').format("MMM DD, YYYY HH:mm A")}</span>
                    
                }, className:"p-0 py-1 text-center"},

                { title: 'User', dataIndex: 'user', key: 'user', render: (user) => {

                    return <div><Avatar src={user.photo}/><small className="m-0 d-block">{user.name}</small></div>

                }, className:"p-0 py-1 text-center"}
            ]
        })
    }

    componentDidUpdate () {
        
    }

    bid = () => {
       
        this.props.history.push(`/bid/${this.state.shoes.alias}`)
    }

    ask = () => {

    }

    buy = () => {

        this.props.history.push(`/checkout/${this.state.shoes.alias}`)
    }

    sell = () => {

    }

    goBack = () => {

        this.props.history.goBack()
    }

    render() {

        if (!this.state.shoes) return null;

        return (
            <div id="prod-details">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12"><Back label="BACK" className="mb-3" onClick={this.goBack}/></div>
                        <div className="col-lg-8">
                            <h1 className="text-dark title">{this.state.shoes.name}</h1>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <div className="share-btns h-100">
                                <Button icon={<ShareAltOutlined />} siz="small" shape="round">Share</Button>
                                <Button icon={<UserAddOutlined />} siz="small" shape="round">Follow</Button>
                            </div>
                        </div>
                        <div className="col-lg-8">
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
                                <div className="col-lg-4 mb-3">
                                    <div className="prod-info font-family-secondary">
                                        <p className="m-0"><span className="text-grey">STYLE: </span><span className="font-weight-light text-dark">{this.state.shoes.style}</span></p>
                                        <p className="m-0"><span className="text-grey">COLOR: </span><span className="font-weight-light text-dark">{this.state.shoes.colors.join(', ').toUpperCase()}</span></p>
                                        <p className="m-0"><span className="text-grey">RETAIL PRICE: </span><span className="font-weight-light text-dark">$ {this.state.shoes.retailPrice}</span></p>
                                        <p className="m-0"><span className="text-grey">RELEASE DATE: </span><span className="font-weight-light text-dark">{moment(this.state.shoes.releaseDate, 'YYYY-MM-DD').format('MMM DD, YYYY')}</span></p>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <p>{this.state.shoes.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sale-situation font-family-secondary d-flex justify-content-around">
                                <div>
                                    <h5 className="h5 text-grey font-weight-lighter">SOLD </h5>
                                    <h2 className="h2 text-success font-weight-bolder">{this.state.shoes.soldCount}</h2>
                                </div>
                                <div>
                                    <h5 className="h5 text-dark font-weight-lighter">LAST SALE </h5>
                                    <h2 className="h2 text-success font-weight-bold">${this.state.shoes.lastSale}</h2>
                                </div>
                            </div>
                            <div className="asks-table font-family-secondary">
                                <Divider><h6 className=" text-dark">Asks</h6></Divider>
                                <Table 
                                    columns={this.state.asksColumns} dataSource={this.state.asksDataSource} 
                                    bordered={true} scroll={{ y: 240 }} pagination={false} className="border-grey-bottom"/>
                            </div>
                            <div className="bids-table mt-4 font-family-secondary">
                                <Divider><h6 className=" text-dark">Bids</h6></Divider>
                                <Table 
                                    columns={this.state.bidsColumns} dataSource={this.state.bidsDataSource} 
                                    bordered={true} scroll={{ y: 240 }} pagination={false} className="border-grey-bottom"/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="sales-table mt-4 font-family-secondary">
                                <Divider><h6 className=" text-dark">Sales At Price Sold</h6></Divider>
                                <Table
                                    columns={this.state.salesColumns} dataSource={this.state.salesDataSource} 
                                    bordered={true} scroll={{ y: 240 }} pagination={false} className="border-grey-bottom"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="controls-sheet">
                    <div className="container h-100">
                        <div className="row h-100 py-2">
                            <div className="col-lg-5 d-flex justify-content-around font-family-secondary align-items-center">
                                <div className="text-center bid-price">
                                    <p className="text-success mb-0">${this.state.shoes.lowestBid.toFixed(2)}</p>
                                    <p className="text-grey m-0">Lowest Ask</p>
                                </div>
                                <div className="text-center bid-price">
                                    <p className="text-success mb-0">${this.state.shoes.highestBid.toFixed(2)}</p>
                                    <p className="text-grey m-0">Highest Bid</p>
                                </div>
                            </div>
                            <div className="col-lg-7 d-flex justify-content-around align-items-center">
                                <button className="bid-btn" onClick={this.bid}><ClockCircleOutlined className="mr-1 mr-sm-3"/>BID</button>
                                <button className="buy-btn mr-3" onClick={this.buy}><ShoppingOutlined className="mr-1 mr-sm-3"/>BUY</button>
                                <button className="ask-btn" onClick={this.ask}><QuestionCircleOutlined className="mr-1 mr-sm-3"/>ASK</button>
                                <button className="sale-btn" onClick={this.sell}><ShopOutlined className="mr-1 mr-sm-3"/>SELL</button>
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
    
})(ProdDetails));