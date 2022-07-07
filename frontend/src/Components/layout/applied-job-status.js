import React,{ Component } from 'react';
import { Row,Col,Input} from 'antd';
import ApplicationStatus from './application-status-modal'



class AppliedJobStatus extends Component{
	state = {
		callAddMedia:false
	}

	handleClick = () =>{
		this.setState({callAddMedia:true})
	}
	closeModal = () =>{
		this.setState({callAddMedia:false})
	}
	
	render(){
	// console.log(this.props)
	return(
		<>
			<Row>
				<img src={process.env.PUBLIC_URL + "/"+ this.props.status +".png"} style={{width:"100%"}} />
	            <p className="all-applied-resume-card-9 w-100" onClick={this.handleClick}>next status</p>
			</Row>
			{ this.state.callAddMedia ? 
		        	<ApplicationStatus isClose={this.closeModal} job_id={this.props.job_id} status={this.props.status} isOpen={this.state.callAddMedia} />
		        :null}
		</>
		)}
}

export default AppliedJobStatus;