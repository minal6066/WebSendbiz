import React,{ Component } from "react";
import { Row,Col,Input} from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import Card from "./applied_job_cards"
import AllResumeCards from "../All_applied_resume_Card"
class Resume extends Component{

    render(){
        return(
            <div>
                <div className="row">
                    <p className="resume-1">Applied Job : Data Analyst JobHunt</p>
                </div>
          
                <Card />
                <div className="row">
                    <p className="subheading-of-onclick-resume" style={{marginTop:30,font: "normal normal 400 24px/43px Gilroy Bold"}}>3 Candidates</p>
                </div>
                <AllResumeCards />
            </div>
        )
    }
}

export default Resume;