import React , { Component } from 'react';
import Modal from 'react-modal';
import cancelImage from "../asset/cancel-circle.png"

const customStyles = {
    content : {
      right                 : "0px",
      bottom                : 'auto',
      width                 : '50%',
      top:0,
      marginLeft:"50%",
      padding:0

    }
  };
  Modal.setAppElement("#modalApp")

class SocialPopup extends Component {

    closeModal=()=>{
        this.props.close();
    }

    render(){
        return(
            <Modal
            isOpen={this.props.open}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

        <div >
		<div style={{minHeight:500}} className="row custom_row">

            <div  style={{width:"100%"}}>
            <div style={{backgroundColor:"white"}} >
            <img  onClick={this.props.close}style={{marginLeft:"88%"}} src={cancelImage} />
                <p style={{paddingTop:19,marginLeft:15,font:"normal normal bold 27px/40px Gilroy",backgroundColor:"white",color:"black"}}>
                Add link
                </p>
                </div>
            <div style={{backgroundColor:"white",marginTop:"-13px",minHeight:400,borderTopStyle:"solid",borderTopWidth:2,borderTopColor:"#F4F6F9"}}>
            <p style={{paddingTop:20,marginLeft:15}}>Domain</p>
			<input style={{height:37,marginLeft:15,width:"93%",borderRadius:5,fontSize:15}}type="text" onChange={(e)=>{this.props.addDataDomain(e)}} />
            <p style={{paddingTop:49,marginLeft:15}}>Link</p>
			<input style={{height:37,marginLeft:15,width:"93%",borderRadius:5,fontSize:15}}type="text" onChange={(e)=>{this.props.addDataLink(e)}}/>
            </div>
            <div style={{backgroundColor:"white",marginTop:6,height:70,borderTopStyle:"solid",borderTopWidth:2,borderTopColor:"#F4F6F9"}}>
                <button onClick={this.closeModal}style={{backgroundColor:"black",marginTop:10,height:35,width:180,borderRadius:5,marginLeft:15,color:"white"}}>Add Link</button>
            </div>
            </div>
            </div>
            

        </div>
        </Modal>
        )
    }

}

export default SocialPopup;
