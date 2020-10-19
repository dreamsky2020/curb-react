import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Modal from 'react-modal';

import './index.scss'

class JobDetails extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            yard_debris: false,
            count_category: false,
            bid_category: false,
            jc_new_usa: false,
            wrs: false,
            mixed_junk: false,

            files: [],
            imagePreviewUrls: [],
            imageIndex: 0,

            yard_debris_big_count: 0,
            yard_debris_small_count:0,
            bag_count: 0,
            wrs_small_count: 0,
            wrs_medium_count: 0,
            wrs_couch_count: 0,

            areItemsOutside: false,
            areItemsInside: false,
            areStairsNeeded: false,
            isElevatorNeeded: false,

            remainedTextLength: 5000,
            comments: "",

            modalNextAlertIsOpen: false,
            modalImageUploadOpen: false,
            modalImageRemoveOpen: false,

        }

        this.changeJobCategory = this.changeJobCategory.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleComments = this.handleComments.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.openImageUploadAlertModal =  this.openImageUploadAlertModal.bind(this);
        this.closeImageUploadAlertModal = this.closeImageUploadAlertModal.bind(this);
        this.openImageRemoveAlertModal = this.openImageRemoveAlertModal.bind(this);
        this.closeImageRemoveAlertModal = this.closeImageRemoveAlertModal.bind(this);
        this.openNextAlertModal = this.openNextAlertModal.bind(this);
        this.closeNextAlertModal = this.closeNextAlertModal.bind(this);

    }

    componentDidMount() {
        let data = JSON.parse( localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##") );
        
        if(data.jobDetails.jobCategory === "") {
            this.setState({yard_debris: true});
        }

        if(data.jobDetails.jobCategory === "Yard Debris") {
            this.setState({
                yard_debris: true,
                yard_debris_big_count: data.jobDetails.jobItems[0].count,
                yard_debris_small_count: data.jobDetails.jobItems[1].count
            });
        }

        if(data.jobDetails.jobCategory === "Count Category") {
            this.setState({
                count_category: true,
                bag_count: data.jobDetails.jobItems[0].count,
            });
        }

        if(data.jobDetails.jobCategory === "Bid Category" || data.jobDetails.jobCategory === "JC new USA" || data.jobDetails.jobCategory === "Mixed Junk") {
            if (data.jobDetails.jobCategory === "Bid Category") {
                this.setState({ bid_category: true });
            }

            if (data.jobDetails.jobCategory === "JC new USA") {
                this.setState({ jc_new_usa: true });
            }

            if (data.jobDetails.jobCategory === "Mixed Junk") {
                this.setState({ mixed_junk: true });
            }
            

            for(let i = 0; i < data.jobDetails.pictures.length; i++) {
                this.setState((prevState) => {
                var tmpArr = [...prevState.imagePreviewUrls];
                tmpArr.push(data.jobDetails.pictures[i].base64);
                return {
                    imagePreviewUrls: tmpArr
                    }
                })
            }
        }
        

        if(data.jobDetails.jobCategory === "WRS") {
            this.setState({
                wrs: true,
                wrs_small_count: data.jobDetails.jobItems[0].count,
                wrs_medium_count: data.jobDetails.jobItems[1].count,
                wrs_couch_count: data.jobDetails.jobItems[2].count,
            });
        }

        this.setState({
            areItemsOutside: data.jobDetails.areItemsOutside,
            areItemsInside: data.jobDetails.areItemsInside,
            areStairsNeeded: data.jobDetails.areStairsNeeded,
            isElevatorNeeded: data.jobDetails.isElevatorNeeded,
        })
    }

    changeJobCategory(cat) {
        // *** init state ***//
        this.setState({
            yard_debris: false,
            count_category: false,
            bid_category: false,
            jc_new_usa: false,
            wrs: false,
            mixed_junk: false,
            files: [],
            imagePreviewUrls: [],

            yard_debris_big_count: 0,
            yard_debris_small_count:0,
            bag_count: 0,
            wrs_small_count: 0,
            wrs_medium_count: 0,
            wrs_couch_count: 0,

            areItemsOutside: false,
            areItemsInside: false,
            areStairsNeeded: false,
            isElevatorNeeded: false,

            remainedTextLength: 5000,
            comments: "",
        });
        this.setState({[cat]: true});
    }

    handleImageChange(e) {
        e.preventDefault();
        if(this.state.imagePreviewUrls.length === 0) {
            this.setState({modalImageUploadOpen: true});
        }
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            files: this.state.files.concat(file),
            imagePreviewUrls: this.state.imagePreviewUrls.concat( reader.result )
          });
        }
    
        reader.readAsDataURL(file)
    }

    removeImage(index) {
        this.setState({modalImageRemoveOpen: true, imageIndex: index});
    }

    handleImageRemove(condition) {
        if(condition) {
            const { imageIndex } = this.state;
            const listImage = this.state.imagePreviewUrls;
            const listFiles = this.state.files;
            listImage.splice(imageIndex, 1);
            listFiles.splice(imageIndex, 1);
            this.setState({
                files: listFiles,
                imagePreviewUrls: listImage
            });
        }

        this.setState({modalImageRemoveOpen: false});
    }

    handleComments(e) {
        this.setState({comments: e.target.value});
        this.setState({remainedTextLength: 5000 - e.target.value.length});
    }

    handleNext() {
        const { yard_debris, count_category, bid_category, jc_new_usa, wrs, mixed_junk, imagePreviewUrls } = this.state;
        const { yard_debris_big_count, yard_debris_small_count, bag_count, wrs_medium_count, wrs_small_count, wrs_couch_count } = this.state;
        const { areItemsOutside, areItemsInside, isElevatorNeeded, areStairsNeeded } = this.state;

        let next_condition = false;
        if((areItemsOutside || areItemsInside)) {
            if(yard_debris_small_count !==0 || yard_debris_big_count !==0) next_condition = true;
            if(bag_count !==0) next_condition = true;
            if(imagePreviewUrls.length > 0) next_condition = true;
            if(wrs_small_count !==0 || wrs_medium_count !==0 || wrs_couch_count !==0 ) next_condition = true;
        }

        if(next_condition) {

            let data = JSON.parse(localStorage.getItem("##GO_TRASHY_WEB_CLIENT_STORE##"));

            // init ****
            data.jobDetails.areItemsOutside = false;
            data.jobDetails.areItemsInside = false;
            data.jobDetails.isElevatorNeeded = false;
            data.jobDetails.areStairsNeeded = false;
            data.jobDetails.pictures = null;
            data.jobDetails.jobCategory = "";
            data.jobDetails.jobItems = null;
            // ***

            if(yard_debris === true){
                data.jobDetails.jobCategory = "Yard Debris";
                data.jobDetails.jobItems = [
                    {
                        subCategoryId: "Big", 
                        count: yard_debris_big_count
                    },
                    {
                        subCategoryId: "Small", 
                        count: yard_debris_small_count
                    }
                ];
            }

            if(count_category === true) {
                data.jobDetails.jobCategory = "Count Category";
                data.jobDetails.jobItems = [
                    {
                        subCategoryId: "bag", 
                        count: bag_count
                    }
                ];
            }

            if(bid_category === true) {
                data.jobDetails.jobCategory = "Bid Category";
                data.jobDetails.pictures = [];
                for(let i = 0; i < imagePreviewUrls.length; i++){
                    data.jobDetails.pictures.push( {
                        base64: imagePreviewUrls[i],
                        type: "JOB_PICTURE"
                    })
                }
            }

            if(jc_new_usa === true) {
                data.jobDetails.jobCategory = "JC new USA";
                data.jobDetails.pictures = [];
                for(let i = 0; i < imagePreviewUrls.length; i++){
                    data.jobDetails.pictures.push( {
                        base64: imagePreviewUrls[i],
                        type: "JOB_PICTURE"
                    })
                }
            }

            if(wrs === true) {
                data.jobDetails.jobCategory = "WRS";
                data.jobDetails.jobItems = [
                    {
                        subCategoryId: "Small Furniture", 
                        count: wrs_small_count
                    },
                    {
                        subCategoryId: "Medium Furniture", 
                        count: wrs_medium_count
                    },
                    {
                        subCategoryId: "Couch/Reliner", 
                        count: wrs_couch_count
                    }
                ];
            }

            if(mixed_junk === true) {
                data.jobDetails.jobCategory = "Mixed Junk";
                data.jobDetails.pictures = [];
                for(let i = 0; i < imagePreviewUrls.length; i++){
                    data.jobDetails.pictures.push( {
                        base64: imagePreviewUrls[i],
                        type: "JOB_PICTURE"
                    })
                }
            }

            if(areItemsOutside === true) data.jobDetails.areItemsOutside = true;
            if(areItemsInside === true) data.jobDetails.areItemsInside = true;
            if(isElevatorNeeded === true) data.jobDetails.isElevatorNeeded = true;
            if(areStairsNeeded === true) data.jobDetails.areStairsNeeded = true;

            data.jobDetails.note = this.state.comments;

            localStorage.setItem("##GO_TRASHY_WEB_CLIENT_STORE##", JSON.stringify(data));
            this.props.history.push('/set-availability');
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

    openImageUploadAlertModal() {
        this.setState({modalImageUploadOpen: true});
    }

    closeImageUploadAlertModal() {
        this.setState({modalImageUploadOpen: false});
    }

    openImageRemoveAlertModal() {
        this.setState({modalImageRemoveOpen: true});
    }

    closeImageRemoveAlertModal() {
        this.setState({modalImageRemoveOpen: false});
    }

    render() {

        const { yard_debris, count_category, bid_category, jc_new_usa, wrs, mixed_junk, imagePreviewUrls } = this.state;
        const { yard_debris_big_count, yard_debris_small_count, bag_count, wrs_medium_count, wrs_small_count, wrs_couch_count } = this.state;
        const { areItemsOutside, areItemsInside, isElevatorNeeded, areStairsNeeded } = this.state;
        const { remainedTextLength, comments } = this.state;
        return (
            <div id="job-details">
                <div className="navbar">
                    <span className="back-btn" onClick={() => this.props.history.goBack()}><i className="fa fa-chevron-left"></i></span>
                </div>
                <div className="page-title">Set Job Details</div>
                <div className="content">
                    
                    <div className="job">
                        <div className="item">
                            <div className="item-title">
                                Job Location
                            </div>
                            <div className="item-details">
                                19564 Southwest Sharoaks Drive
                                <br />
                                Beaverton, OR 97006
                            </div>
                        </div>

                        <div className="item">
                            <div className="item-title">
                                Select Job Category
                            </div>
                            <div className="category-list scrollable">
                               <div className="horizontal-scroll">
                                   <button className={`${yard_debris ? "button-selected": null }`} onClick={() => this.changeJobCategory("yard_debris")}>
                                       <span>
                                            {yard_debris ?
                                                <img src="/images/yard-debris-active.png" alt="yard debris active" />
                                                :
                                                <img src="/images/yard-debris.png" alt="yard debris active" />
                                            }

                                           <p>Yard Debris</p>
                                       </span>
                                   </button>
                                   <button className={`${count_category ? "button-selected": null }`}  onClick={() => this.changeJobCategory("count_category")}>
                                       <span>
                                           {count_category ? 
                                               <img src="/images/quick-haul-active.png" alt="quick-haul" />
                                               :
                                               <img src="/images/quick-haul.png" alt="quick-haul" />
                                           }
                                           <p>Count Category</p>
                                       </span>
                                   </button>
                                   <button className={`${bid_category ? "button-selected": null }`}  onClick={() => this.changeJobCategory("bid_category")}>
                                       <span>
                                            {bid_category ? 
                                               <img src="/images/quick-haul-active.png" alt="quick-haul" />
                                               :
                                               <img src="/images/quick-haul.png" alt="quick-haul" />
                                            }
                                           <p>Bid Category</p>
                                       </span>
                                   </button>
                                   <button className={`${jc_new_usa ? "button-selected": null }`} onClick={() => this.changeJobCategory("jc_new_usa")}>
                                       <span>
                                            {jc_new_usa ? 
                                               <img src="/images/quick-haul-active.png" alt="quick-haul" />
                                               :
                                               <img src="/images/quick-haul.png" alt="quick-haul" />
                                            }
                                           <p>JC new USA</p>
                                       </span>
                                   </button>
                                   <button className={`${wrs ? "button-selected": null }`} onClick={() => this.changeJobCategory("wrs")}>
                                       <span>
                                            {wrs ? 
                                               <img src="/images/quick-haul-active.png" alt="quick-haul" />
                                               :
                                               <img src="/images/quick-haul.png" alt="quick-haul" />
                                            }
                                           <p>WRS</p>
                                       </span>
                                   </button>
                                   <button className={`${mixed_junk ? "button-selected": null }`} onClick={() => this.changeJobCategory("mixed_junk")}>
                                       <span>
                                            {mixed_junk ? 
                                               <img src="/images/quick-haul-active.png" alt="quick-haul" />
                                               :
                                               <img src="/images/quick-haul.png" alt="quick-haul" />
                                            }
                                           <p>Mixed Junk</p>
                                       </span>
                                   </button>
                               </div>
                            </div>
                        </div>

                        <div className="item">
                            <div className="item-title">
                                Specify the number of items
                            </div>
                            { ( yard_debris ) && (
                                <div className="category-list scrollable">
                                    <div className="horizontal-scroll">
                                        <div className="sub-category-item">
                                            <div className="border-container">
                                                <div className="junk-icon">
                                                    <img src="/images/big.png" alt="big"/>
                                                    <p>Big</p>
                                                </div>
                                                <input type="number" min={0} className="number-of-items" 
                                                    value={yard_debris_big_count} 
                                                    onChange={(e) => this.setState({yard_debris_big_count: Number(e.target.value)})}
                                                />
                                                <ul className="buttons">
                                                    <li>
                                                        <button className="plus-button" name="plus" 
                                                            onClick={() => this.setState({yard_debris_big_count: yard_debris_big_count + 1})}
                                                        >+</button>
                                                    </li>
                                                    <li>
                                                        <button className="minus-button" name="minus" 
                                                            onClick={() => {
                                                                if (yard_debris_big_count !== 0) 
                                                                    this.setState({yard_debris_big_count: yard_debris_big_count - 1})}
                                                            } 
                                                        >-</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="sub-category-item">
                                            <div className="border-container">
                                                <div className="junk-icon">
                                                    <img src="/images/small.png" alt="small"/>
                                                    <p>Small</p>
                                                </div>
                                                <input type="number" min="0" className="number-of-items" 
                                                    value={yard_debris_small_count} 
                                                    onChange={(e) => this.setState({yard_debris_small_count: Number(e.target.value)})}
                                                />
                                                <ul className="buttons">
                                                    <li>
                                                        <button className="plus-button" name="plus"
                                                            onClick={() => this.setState({yard_debris_small_count: yard_debris_small_count + 1})}
                                                        >+</button>
                                                    </li>
                                                    <li>
                                                        <button className="minus-button" name="minus" 
                                                            onClick={() => {
                                                                if (yard_debris_small_count !== 0) 
                                                                this.setState({yard_debris_small_count: yard_debris_small_count - 1})}
                                                            }
                                                        >-</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            { ( count_category ) && (
                                <div className="category-list scrollable">
                                    <div className="horizontal-scroll">
                                        <div className="sub-category-item">
                                            <div className="border-container">
                                                <div className="junk-icon">
                                                    <img src="/images/small.png" alt="small"/>
                                                    <p>bag</p>
                                                </div>
                                                <input type="number" min="0" className="number-of-items" 
                                                    value={bag_count} 
                                                    onChange={(e) => this.setState({bag_count: Number(e.target.value)})}
                                                />
                                                <ul className="buttons">
                                                    <li>
                                                        <button className="plus-button" name="plus"
                                                            onClick={() => this.setState({bag_count: bag_count + 1})}
                                                        >+</button>
                                                    </li>
                                                    <li>
                                                        <button className="minus-button" name="minus" 
                                                            onClick={() => {
                                                                if(bag_count !==0 ) this.setState({bag_count: bag_count - 1})
                                                            }}>-</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {(bid_category || jc_new_usa || mixed_junk) && (
                                <div className="list-images">
                                    {imagePreviewUrls.length > 0 && (
                                        imagePreviewUrls.map((imagePreviewUrl, i) => {
                                            return <label className="show-uploaded-file" key={i}>
                                                <div className="badge-img">
                                                    <div className="image-loader" style={{backgroundImage: `url(${imagePreviewUrl})`}}></div>
                                                    <span>
                                                        <div className="delete-icon" onClick={() => this.removeImage(i)} />
                                                    </span>
                                                </div>
                                            </label>
                                        })
                                    )}
                                    
                                    <label className="custom-file-upload">
                                        <input className="fileInput" type="file" accept="image/*" onChange={(e)=>this.handleImageChange(e)} />
                                        <div className="upload-icon"></div>
                                    </label>

                                </div>
                                )
                            }

                            {wrs && (
                                <div className="category-list scrollable">
                                    <div className="horizontal-scroll">
                                        <div className="sub-category-item">
                                            <div className="border-container">
                                                <div className="junk-icon">
                                                    <img src="/images/small.png" alt="small"/>
                                                    <p>Small Furniture</p>
                                                </div>
                                                <input type="number" min="0" className="number-of-items" 
                                                    value={wrs_small_count} 
                                                    onChange={(e) => this.setState({wrs_small_count: Number(e.target.value)})}
                                                />
                                                <ul className="buttons">
                                                    <li>
                                                        <button className="plus-button" name="plus"
                                                            onClick={() => this.setState({wrs_small_count: wrs_small_count + 1})}
                                                        >+</button>
                                                    </li>
                                                    <li>
                                                        <button className="minus-button" name="minus"
                                                            onClick={() => {
                                                                if(wrs_small_count !==0 ) this.setState({wrs_small_count: wrs_small_count - 1})
                                                        }}>-</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="sub-category-item">
                                            <div className="border-container">
                                                <div className="junk-icon">
                                                    <img src="/images/small.png" alt="small"/>
                                                    <p>Medium Furniture</p>
                                                </div>
                                                <input type="number" min="0" className="number-of-items" 
                                                    value={wrs_medium_count} 
                                                    onChange={(e) => this.setState({wrs_medium_count: Number(e.target.value)})} 
                                                />
                                                <ul className="buttons">
                                                    <li>
                                                        <button className="plus-button" name="plus"
                                                            onClick={() => this.setState({wrs_medium_count: wrs_medium_count + 1})}
                                                        >+</button>
                                                    </li>
                                                    <li>
                                                        <button className="minus-button" name="minus"
                                                            onClick={() => {
                                                                if(wrs_medium_count !==0 ) this.setState({wrs_medium_count: wrs_medium_count - 1})
                                                            }}
                                                        >-</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="sub-category-item">
                                            <div className="border-container">
                                                <div className="junk-icon">
                                                    <img src="/images/small.png" alt="small"/>
                                                    <p>Couch/Reliner</p>
                                                </div>
                                                <input type="number" min="0" className="number-of-items" 
                                                    value={wrs_couch_count}
                                                    onChange={(e) => this.setState({wrs_couch_count: Number(e.target.value)})}
                                                />
                                                <ul className="buttons">
                                                    <li>
                                                        <button className="plus-button" name="plus"
                                                            onClick={() => this.setState({wrs_couch_count: wrs_couch_count + 1})}
                                                        >+</button>
                                                    </li>
                                                    <li>
                                                        <button className="minus-button" name="minus"
                                                            onClick={() => {
                                                                if(wrs_couch_count !==0 ) this.setState({wrs_couch_count: wrs_couch_count - 1})}
                                                            } >-</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="item">
                            <div className="item-title">
                                Job Details
                            </div>
                            <div className="category-list categories">
                                <label>Items are</label>
                                <div>
                                    <div className="checkbox-group">
                                        <div onClick={() => this.setState({areItemsOutside: !areItemsOutside})}>
                                            <i className={`${areItemsOutside ? "fa fa-check-square" : "far fa-square"}`}></i> Outside
                                        </div>
                                        <div onClick={() => this.setState({areItemsInside: !areItemsInside})}>
                                            <i className={`${areItemsInside ? "fa fa-check-square" : "far fa-square"}`}></i> Inside
                                        </div>
                                    </div>
                                    <div onClick={() => this.setState({isElevatorNeeded: !isElevatorNeeded})}>
                                        <i className={`${isElevatorNeeded ? "fa fa-check-square" : "far fa-square"}`}></i> Requires use of elevator
                                    </div>
                                    <div onClick={() => this.setState({areStairsNeeded: !areStairsNeeded})}>
                                        <i className={`${areStairsNeeded ? "fa fa-check-square" : "far fa-square"}`}></i> Requires use of stairs
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="item">
                            <div className="item-title">
                                Comments
                            </div>
                            <div className="category-list textarea-container">
                                <div className="counter">
                                    <label>{remainedTextLength} characters left</label>
                                </div>
                                <textarea maxLength="5000" value={comments} onChange={(e) => this.handleComments(e)} />
                            </div>
                        </div>
                        
                        <div className="sticky-footer-btn">
                            <button onClick={() => this.handleNext()}>Next</button>
                        </div>



                        <Modal
                            isOpen={this.state.modalImageUploadOpen}
                            onRequestClose={this.closeImageUploadAlertModal}
                            className="Modal"
                            overlayClassName="Overlay"
                            ariaHideApp={false}
                        >
                            <div className="home-alert">
                                <p className="title" >Set Job Details</p>
                                <div>Please upload two or more pictures taken from different angles.</div>
                                <div className="footer">
                                    <button onClick={() => this.closeImageUploadAlertModal()}>OK</button>
                                </div>
                            </div>
                        </Modal>

                        <Modal
                            isOpen={this.state.modalImageRemoveOpen}
                            onRequestClose={this.closeImageRemoveAlertModal}
                            className="Modal"
                            overlayClassName="Overlay"
                            ariaHideApp={false}
                        >
                            <div className="home-alert">
                                <p className="title" >Confirm removal</p>
                                <div>Delete picture?</div>
                                <div className="footer">
                                    <button onClick={() => this.handleImageRemove(false)}>No</button>
                                    <button onClick={() => this.handleImageRemove(true)}>yes</button>
                                </div>
                            </div>
                        </Modal>

                        <Modal
                            isOpen={this.state.modalNextAlertIsOpen}
                            onRequestClose={this.closeNextAlertModal}
                            className="Modal"
                            overlayClassName="Overlay"
                            ariaHideApp={false}
                        >
                            <div className="home-alert">
                                <p className="title" >Set Job Details</p>
                                <div>The required fields are not selected.</div>
                                <div className="footer">
                                    <button onClick={() => this.closeNextAlertModal()}>OK</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (reducer) => {
    const {} = reducer;

    return {}
};

export default withRouter(connect(mapStateToProps, {
    
})(JobDetails));