import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import moment from 'moment'
import Modal from 'react-modal';

import './index.scss'
import { expr } from 'jquery';
class SetAvailability extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            date: moment(),
            timeSlots: [],
            modalNextAlertIsOpen: false,

        }

        this.handleNext = this.handleNext.bind(this);
        this.inittimeSlots = this.inittimeSlots.bind(this);
        this.getStartAndEndtimeSlots = this.getStartAndEndtimeSlots.bind(this);
        this.selectSlot = this.selectSlot.bind(this);
        this.openNextAlertModal = this.openNextAlertModal.bind(this);
        this.closeNextAlertModal = this.closeNextAlertModal.bind(this);
    }

    componentDidMount() {
        let time =  moment(this.state.date).toDate().getHours();

        if (time>=7 && time < 9 ) {
            this.inittimeSlots(0, 7, 9, 1);
            this.inittimeSlots(0, 9, 11, 0);
            this.inittimeSlots(0, 11, 14, 0);
            this.inittimeSlots(0, 14, 17, 0);
            this.inittimeSlots(0, 17, 20, 0);
        }

        if(time >=9 && time<11) {
            this.inittimeSlots(0, 9, 11, 1);
            this.inittimeSlots(0, 11, 14, 0);
            this.inittimeSlots(0, 14, 17, 0);
            this.inittimeSlots(0, 17, 20, 0);
        }

        if(time >=11 && time<14) {
            this.inittimeSlots(0, 11, 14, 1);
            this.inittimeSlots(0, 14, 17, 0);
            this.inittimeSlots(0, 17, 20, 0);
        }

        if(time >=14 && time<17) {
            this.inittimeSlots(0, 14, 17, 1);
            this.inittimeSlots(0, 17, 20, 0);
        }

        if(time >=17 && time<20) {
            this.inittimeSlots(0, 17, 20, 1)
        }

        if(time>=20 || time<7) {
            this.inittimeSlots(1, 7, 9, 0);
            this.inittimeSlots(1, 9, 11, 0);
            this.inittimeSlots(1, 11, 14, 0);
            this.inittimeSlots(1, 14, 17, 0);
            this.inittimeSlots(1, 17, 20, 0);
        }

    }

    getStartAndEndtimeSlots(offsetDay, startTime, endTime, isNow) {
        const { date } = this.state;
        var startSlotTime = moment(date).add(offsetDay, 'days').toDate(); 
        var endSlotTime = moment(date).add(offsetDay, 'days').toDate(); 
        startSlotTime.setHours(startTime);
        startSlotTime.setMinutes(0);
        startSlotTime.setSeconds(0);
        startSlotTime.setMilliseconds(0);

        endSlotTime.setHours(endTime);
        endSlotTime.setMinutes(0);
        endSlotTime.setSeconds(0);
        endSlotTime.setMilliseconds(0);
        let slot = {};
        
        if(isNow !== 1) {
            slot = {
                dateFrom: startSlotTime.getTime(),
                dateTo: endSlotTime.getTime()
            };
        }
        else {
            slot = {
                dateFrom: startSlotTime.getTime(),
                dateTo: endSlotTime.getTime(),
                isNow: true
            };
        }
        return slot;
    }

    inittimeSlots(offsetDay, startTime, endTime, isNow) {
        let slot = this.getStartAndEndtimeSlots( offsetDay, startTime, endTime, isNow);
        this.setState((prevState) => {
            var tmpArr = [...prevState.timeSlots];
            tmpArr.push(slot);
            return {
                timeSlots: tmpArr
                }
            })

    }

    selectSlot(e, offsetDay, startTime, endTime, isNow) {
        
        let slot = this.getStartAndEndtimeSlots( offsetDay, startTime, endTime, isNow);
       
        if(e.target.classList.contains("chip-selected")) {
            e.target.classList.remove("chip-selected");
            let listtimeSlots = this.state.timeSlots;
            for(let i = 0; i < this.state.timeSlots.length; i++){
                if(this.state.timeSlots[i].dateFrom ===  slot.dateFrom)
                    listtimeSlots.splice(i, 1);
            }
            this.setState({
                slot: listtimeSlots,
            });
        }
        else {
            e.target.classList.add("chip-selected");
            this.setState({timeSlots: this.state.timeSlots.concat(slot)});
        }
    }

    handleNext() {
        if(this.state.timeSlots.length !== 0) {
            let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));
            data.jobDetails.timeSlots = this.state.timeSlots;
            console.log(this.state.timeSlots)
            localStorage.setItem("##GO_TRASHY_WEB_CLIENT_STORE##", JSON.stringify(data));
            this.props.history.push('/published-job');
        }
        else {
            this.setState({modalNextAlertIsOpen: true});
        }
    }

    openNextAlertModal() {
        this.setState({modalNextAlertIsOpen: true});
      }
     
    closeNextAlertModal(){
        this.setState({modalNextAlertIsOpen: false});
    }

    render() {
            const { date } = this.state;
            const availablityItems = [];
            let time =  moment(this.state.date).toDate().getHours();
            if( time < 20 && time >= 7) {
                availablityItems.push(
                        <div className="item" key={8}>
                            <div className="date-avatar">
                                <p className="small-text">{moment(date).format('ddd')}</p>
                                <p>{moment(date).format('DD')}</p>
                            </div>
                            <div className="item-times">
                                {time >=7 && time < 9 && (
                                    <>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 7, 9, 1)}>Now - 9 am</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 9, 11, 0)}>9 - 11 am</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 11, 14, 0)}>11 - 2 am</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 14, 17, 0)}>2 - 5 pm</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 17, 20, 0)}>5 - 8 pm</div>
                                    </>
                                )}
                                {(time >=9 && time<11) && (
                                    <>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 9, 11, 1)}>Now - 11 am</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 11, 14, 0)}>11 - 2 am</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 14, 17, 0)}>2 - 5 pm</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 17, 20, 0)}>5 - 8 pm</div>
                                    </>
                                )}
                                {(time >=11 && time<14) && (
                                    <>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 11, 14, 1)}>Now - 2 am</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 14, 17, 0)}>2 - 5 pm</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 17, 20, 0)}>5 - 8 pm</div>
                                    </>
                                )}
                                {(time >=14 && time<17) && (
                                    <>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 14, 17, 1)}>Now - 5 pm</div>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 17, 20, 0)}>5 - 8 pm</div>
                                    </>
                                )}
                                {(time >=17 && time<20) && (
                                    <>
                                    <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 0, 17, 20, 1)}>Now - 8 pm</div>
                                    </>
                                )}
                            </div>
                        </div>
                );
                for (let i = 0; i < 6; i++) {
                    availablityItems.push(
                        <div className="item" key={i}>
                            <div className="date-avatar">
                                <p className="small-text">{moment(date).add(i+1, 'days').format('ddd')}</p>
                                <p>{moment(date).add(i+1, 'days').format('DD')}</p>
                            </div>
                            <div className="item-times">
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 7, 9, 0)}>7 - 9 am</div>
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 9, 11, 0)}>9 - 11 am</div>
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 11, 14, 0)}>11 - 2 am</div>
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 14, 17, 0)}>2 - 5 pm</div>
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 17, 20, 0)}>5 - 8 pm</div>
                            </div>
                        </div>
                    )
                }
            }
            else {
                availablityItems.push(
                    <div className="item" key={8}>
                        <div className="date-avatar">
                            <p className="small-text">{moment(date).add(1, 'days').format('ddd')}</p>
                            <p>{moment(date).add(1, 'days').format('DD')}</p>
                        </div>
                        <div className="item-times">
                            <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 1, 7, 9, 0)}>7 - 9 am</div>
                            <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 1, 9, 11, 0)}>9 - 11 am</div>
                            <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 1, 11, 14, 0)}>11 - 2 am</div>
                            <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 1, 14, 17, 0)}>2 - 5 pm</div>
                            <div className="chip chip-selected" onClick={(e) => this.selectSlot(e, 1, 17, 20, 0)}>5 - 8 pm</div>
                        </div>
                    </div>
                )

                for (let i = 1; i < 7; i++) {
                    availablityItems.push(
                        <div className="item" key={i}>
                            <div className="date-avatar">
                                <p className="small-text">{moment(date).add(i+1, 'days').format('ddd')}</p>
                                <p>{moment(date).add(i+1, 'days').format('DD')}</p>
                            </div>
                            <div className="item-times">
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 7, 9, 0)}>7 - 9 am</div>
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 9, 11, 0)}>9 - 11 am</div>
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 11, 14, 0)}>11 - 2 am</div>
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 14, 17, 0)}>2 - 5 pm</div>
                                <div className="chip" onClick={(e) => this.selectSlot(e, i+1, 17, 20, 0)}>5 - 8 pm</div>
                            </div>
                        </div>
                    )
                }
            }

        return (
            <div id="set-availability">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.props.history.goBack()}><i className="fa fa-chevron-left"></i></span>
                </div>
                <div className="page-title">Set Availability</div>
                <div className="date-time-header">
                    <span className="month">{moment(date).format('MMM')}</span>
                    <span className="year">{moment(date).format('YYYY')}</span>
                </div>

                <div className="content">
                    
                    <div className="available-times">

                        <div className="scrollbar-container">

                            {
                                availablityItems
                            }
                            
                        </div>
                        
                        <div className="sticky-footer-btn">
                            <button onClick={() => this.props.history.goBack()}>Back</button>
                            <button onClick={() => this.handleNext()}>Next</button>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={this.state.modalNextAlertIsOpen}
                    onRequestClose={this.closeNextAlertModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    ariaHideApp={false}
                >
                    <div className="home-alert">
                        <p className="title" >Set Availiability</p>
                        <div>Please set two or more availiability</div>
                        <div className="footer">
                            <button onClick={() => this.closeNextAlertModal()}>OK</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (reducer) => {
    const {} = reducer;

    return {}
};

export default withRouter(connect(mapStateToProps, {
    
})(SetAvailability));
