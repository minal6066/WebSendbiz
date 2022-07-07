import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs ,Divider, Button} from 'antd';
import { Row,Col,Input,Image,Affix} from 'antd';
import CompanyModal from '../layout/editCompanyModal';
const { TextArea } = Input;
const { TabPane } = Tabs;
class CompanyMedia extends Component{
	constructor(props){
		super(props)
		this.modalElement = React.createRef();
	}
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
		console.log(this.props.initialdata)
		const media = this.props.initialdata
		let operations =
		    <Button className="add_media_button" onClick={this.handleClick}>
		    	<img
					width={"auto"}
					src={ process.env.PUBLIC_URL + "/add-circle.png"}
				/>&nbsp;&nbsp;
		      Add media
		    </Button>;
		return(
			<>
			<Tabs className="company_media_tabs" tabBarExtraContent={operations} defaultActiveKey="1" type="card" style={{backgroundColor:"white"}} >
	          <TabPane tab="5 Images" key="1">
	            <p className="company_media_image_para">In order to have the most beautiful card do not hesitate to call upon professionals of the photo or video. Click here if there are some who are registered in JobHunt near you.</p>
	          	
	          	<Row style={{paddingBottom:"12px",paddingTop:"25px"}}>
	          	{ media.map((val,index)=>{
	          		if(val.fileType.startsWith("image")){
	          			if(index%2==0){
	          				return(
	          					<Col span={12} key={index} style={{paddingBottom:"12px"}}>
									<Image
										width={"94%"}
										src={ val.path }
									/>
								</Col>
	          				)
	          			}
	          			else{
	          				return(
	          					<Col span={12} key={index} style={{paddingBottom:"12px"}}>
									<Image
										width={"94%"}
										src={ val.path }
									/>
								</Col>
	          				)
	          			}
	          		}
	          	})}
	          		
					
	          	</Row>
	          </TabPane>
	          
	          <TabPane tab="2 Videos" key="2">
	            <p className="company_media_image_para">In order to have the most beautiful card do not hesitate to call upon professionals of the photo or video. Click here if there are some who are registered in JobHunt near you.</p>
	          	{ media.map((val,index)=>{
	          		if(val.fileType === "image"){
	          			if(index%2==0){
	          				return(
	          					<Col span={12} key={index}>
									<Image
										width={"94%"}
										src={ val.path }
									/>
								</Col>
	          				)
	          			}
	          			else{
	          				return(
	          					<Col span={12} key={index}>
									<Image
										width={"94%"}
										src={ val.path }
									/>
								</Col>
	          				)
	          			}
	          		}
	          	})}
	          </TabPane>
	          
	        </Tabs>
	        { this.state.callAddMedia ? 
	        	<CompanyModal isClose={this.closeModal} ref={this.modalElement}  isOpen={this.state.callAddMedia} />
	        :null}
	        
	        </>
			)
	}
}
export default CompanyMedia;