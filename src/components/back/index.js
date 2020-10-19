import React, { Component } from 'react'
import {ArrowLeftOutlined} from '@ant-design/icons'
import './index.scss'

export default class Back extends Component {

    render() {
        return (
            <div className={`back ${this.props.className}`} onClick={this.props.onClick}>
                <ArrowLeftOutlined className="mr-4"/><span>{this.props.label}</span>
            </div>
        )
    }
}
