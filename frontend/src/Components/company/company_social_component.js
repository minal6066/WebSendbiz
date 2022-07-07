import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Formik } from "formik";
import { Row,Col,Input} from 'antd';
import RightModal from '../job/rightModal.js';
import CreateLink from '../createprofile/create-link.js';
const { TextArea } = Input;

let formButton=null;

let initialValues = {
    LinkedIn:"",
    Facebook: "",
    Instagram: "",
    Twitter: "",
    
  };
class CompanySocial extends Component{
    constructor(props){
        super(props)
        this.linkElement = React.createRef();
    }
    state = {
        socialLinkData:[],
        initialdata : {},
        modalShow: false
    }
	onSubmit=(e)=>{
        console.log(e)
        this.convertData(e)
    }
    convertData = (data) =>{
        let allSocialLinkData=[];
        let social1=[];
        let social2=[];
        if(Object.keys(data).length!=0){
            for(let i=0;i<Object.keys(data).length;i++){
                allSocialLinkData.push({
                    tag:Object.keys(data)[i],
                    link:data[Object.keys(data)[i]],
                })
            this.setState({socialLinkData:allSocialLinkData})
            }
        }
        this.props.setdata(this.state.socialLinkData)
    }
    CreateSocial=()=>{
        formButton.click()
    }
    makeSocialLinkDynamic=(data)=>{
        // console.log(data)
        let allSocialLinkData=[];
        let social1=[];
        let social2=[];
        if(Object.keys(data).length!=0){
            for(let i=0;i<Object.keys(data).length;i++){
                allSocialLinkData.push({
                    tag:Object.keys(data)[i],
                    link:data[Object.keys(data)[i]],
                })
            // console.log(allSocialLinkData)
            this.setState({socialLinkData:allSocialLinkData})
            }
        }
    }
    componentWillMount(){
        let data = this.props.initialdata
        // this.makeSocialLinkDynamic(initialValues)
        if(data.length > 0){
            let initialdata = {}
            for(let i=0; i<data.length; i++){
                initialdata[data[i].tag] = data[i].link
            }
            this.makeSocialLinkDynamic(initialdata)
            initialValues = initialdata
        }
        else{
            this.makeSocialLinkDynamic(initialValues)
        }
        
    }
    addSocialLink = () =>{
        this.setState({modalShow:true});
    }
    closeModal = () =>{
        this.setState({modalShow:false})
    }
    setformdata = (data) => {
        // console.log(data)
        let social_Link_data=this.state.socialLinkData;
        let social_Links = this.state.social_Links
        let len = social_Link_data.length
        if(data.Title.length > 0 && data.Link.length){
            social_Link_data.push({
                tag:"",
                link:""
            })

            initialValues[data.Title] = data.Link

            social_Link_data[len].tag = data.Title
            social_Link_data[len].link = data.Link
        }
        // console.log(social_Link_data)
        this.setState({modalShow:false,social_Link_data})
    }
    handleSubmit = () =>{
        this.linkElement.current.clickSubmitClick()
    }
	render(){
        // console.log(initialValues)
		return(
			<>    
                { this.state.modalShow ?
                    <RightModal isClose={this.closeModal} className={"social-modal"} onSubmit={this.handleSubmit} 
                    component={<CreateLink  setdata={this.setformdata} ref={ this.linkElement } />}  
                    title={"Add Link"}  isOpen={this.state.modalShow}/>
                :
                null}
				<Formik initialValues={initialValues} 
                onSubmit={this.onSubmit}>
                    {(formikProps) => {
                        const {
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            touched,
                        } = formikProps;
                    return (
                        <form onSubmit={formikProps.handleSubmit}>
                            <Row>
                                {this.state.socialLinkData.map((val,index)=>{
                                    if(index%2==0){
                                        return(<Col span={12} key={index} className="form-padding-right">
                                                <label className="input_label_profile">{val.tag}</label>
                                                <Input name={val.tag} value={values[val.tag]} 
                                                    onChange={handleChange} 
                                                    className="input-field-custom-type-1-left"
                                                    />
                                        </Col>)
                                    }else if(index%2==1){
                                        return(<Col span={12} key={index} className="form-padding-left">
                                                <label className="input_label_profile">{val.tag}</label>
                                                <div style={{textAlign:"right"}}>
                                                    <Input name={val.tag}
                                                        className="input-field-custom-type-1-left" 
                                                        value={values[val.tag]} onChange={handleChange}
                                                        />
                                                </div>
                                        </Col>)
                                    }
                                })}
                            </Row>
                            <div className="custom-file">
                                <label className="custom-file-label-3" onClick={this.addSocialLink} style={{paddingTop:20}} htmlFor="inputGroupFile01"><img src={process.env.PUBLIC_URL + "/link.svg"} />&nbsp;&nbsp;
                                Add another link</label>
                            </div>
                            <button style={{opacity:0}} type={"submit"} ref={(e) => { formButton = e }} ></button>
          
                        </form>
            );
          }}
        </Formik>
			</>
			)
	}
}

export default CompanySocial;