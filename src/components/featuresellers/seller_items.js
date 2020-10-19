import React, { Component } from 'react'
import { UserOutlined, BarsOutlined, WechatOutlined } from '@ant-design/icons';



class SellerItem extends Component {

    constructor(props){

        super(props);

        this.state = {}
    }

    render() {

        return (
            <div className="seller-item">
                <div className="photo mb-3">
                    <img src={this.props.seller.photo} alt="seller-photo"/>
                    <div className="ctl">
                        <BarsOutlined  className="mr-3"/>
                        <UserOutlined  className="mr-3"/>
                        <WechatOutlined />
                    </div>
                    <div className="mask"></div>
                </div>
                <h6 className="mb-2 name">{this.props.seller.name}</h6>
                <p className="mb-0 text-grey">{this.props.seller.city} / {this.props.seller.country}</p>
                <p className="mb-0 text-grey">{this.props.seller.regDate}</p>
            </div>
        )
    }
}

export default SellerItem
