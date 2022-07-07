import React,{ Component } from 'react';
import { Row,Col,Input} from 'antd';
import AppliedJobStatus from '../layout/applied-job-status'
import moment from 'moment';
import APIManager from '../../APIManager/index';
import { connect } from 'react-redux';
import { ImageUrl } from '../../Shared/imageUrlPath'
class AppliedJobCards extends Component{
    state = {
      callAddMedia:false
    }
    componentDidMount(){
      // var ls = require('local-storage');
      // var applied_job_id = ls.get('applied_jobId');
      let job_id = this.props.job_id
      // console.log(job_id,"dfgfdgfg")
      APIManager.getAppliedOnJobList(job_id);
    }
    handleClick = () =>{
      this.setState({callAddMedia:true})
    }
    closeModal = () =>{
      this.setState({callAddMedia:false})
    }
    render(){
      console.log(this.props);
      let data = []
      let isloading = this.props.data
      if(isloading === null){
        data = []
      }
      else{
        data = this.props.data.data
      }
      console.log(data)
        return(
            <div className={"job-card"}>
            { data.length === 0 ? (
              <div className="row text-center">
                 No data found
              </div>
             ):(
             <>
               { data.map((val,index) =>(
                <Row className={"resume-card-2 mt-3 p-0"} key={index}>
                    <div className="col-sm-2 all-applied-resume-card-1">
                    { val.candidate.image === "" ? (
                      <img className="w-100 rounded-circle" src={process.env.PUBLIC_URL + "/resume-profile-logo.png"} />
                    ):(
                      <img className="w-100 rounded-circle" src={ImageUrl.imageUrlPath+val.candidate.image} />
                    )}
                      
                    
                    </div>
                    <div className="col-sm-10 all-applied-resume-card-7">
                      <div className="row">
                        <div className="col-sm-9 all-applied-resume-card-10">
                          <p className="all-applied-resume-card-2"> { val.candidate.name }</p>
                          <p className="all-applied-resume-card-3">{val.candidate.email }</p>
                           <ul className="all-applied-resume-card-8">
                                <li>
                                  <a style={{textDecoration:'none'}} className="p-0" href={ImageUrl.imageUrlPath+val.candidate.resume}>
                                    <p className="all-applied-resume-card-4">
                                        <img src={process.env.PUBLIC_URL + "/link.svg"} />
                                        &nbsp;&nbsp;View Resume PDF
                                    </p>
                                   </a>
                                </li>
                                <li>
                                    <p className="all-applied-resume-card-5">
                                        <span className="all-applied-resume-card-6">Applied on:</span>
                                        &nbsp;&nbsp;{moment(val.applied_at).format('DD MMM YYYY')}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-3">
                          <AppliedJobStatus name={val.name} status={val.status} job_id={val._id} />
                        </div>
                      </div>
                    </div>
                </Row>
               ))}
             </>
              
             )}
              
            </div>
        )
    }

}
const mapStateToProps = (state) => {
  return {
    data: state.appliedOnJobReducer.applied_user_data,
    isloading: state.appliedOnJobReducer.isloading,
  };
};
export default connect(mapStateToProps)(AppliedJobCards);
