import React, { Component } from 'react';
import { Row, Col, Input, Switch, Image,message } from 'antd';
import './topNav.css';
import { connect } from 'react-redux';
import APIManager from '../../APIManager/index';
import ReactPaginate from 'react-paginate';
import Pagination from 'react-js-pagination';
import { ImageUrl } from '../../Shared/imageUrlPath';
import { withRouter } from 'react-router-dom';

class JobCards extends Component {
  // constructor(props) {
  //   super(props);
    state = {
      jobs:[],
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,
      job_type:''
    };
    // this.handlePageClick = this.handlePageClick.bind(this);
  // }
  componentDidMount(){
    this.loadMoreData()
  }
  componentDidUpdate(prevProps,prevState){
    console.log("prevProps:",prevProps.job_type,this.props.experience);
    if(this.props.job_type !== prevProps.job_type){
      console.log("working!!!");
      this.loadMoreData();
    }
    if(this.props.experience !== prevProps.experience){
      console.log("working!!!");
      this.loadMoreData();
    }
    if(this.props.posted_on !== prevProps.posted_on){
      console.log("working!!!");
      this.loadMoreData();
    }
    if(this.props.searchingValue !== prevProps.searchingValue){
      console.log("working!!!");
      this.loadMoreData();
    }
  }
  loadMoreData = (pageNumber = 1) => {
    const job_type = this.props.job_type;
    const experience = this.props.experience;
    const posted_on = this.props.posted_on;
    const sector = this.props.sector;
    const searchQuery = this.props.searchingValue
    APIManager.jobList(pageNumber,job_type,experience,posted_on,searchQuery.toLowerCase(),sector)
    .then((resp) => {
      this.setState({
        jobs: resp.data.data,
        resultsPerPage: resp.data.results,
        totalData: resp.data.totalCount,
        totalPages: resp.data.totalPages,
        currentPage: resp.data.currentPage,
      });
    })
    .catch((err) =>{
        message.error(err)
    })
  };

  render() {
    console.log(this.state.totalData,"hsdgfjsdd");
    const searchQuery = this.props.searchingValue;
    console.log(searchQuery, 'ddd');
    return (
      <>
        <div className="custom-container" style={{ padding: 0 }}>
        {this.state.jobs &&
            this.state.jobs.map((data,index) => (
              <div className="flex-container job-card-1" key={index}>
                <Row
                  className={'col-sm-12 jobListingclscard-1 job-card-2 mt-3'}
                  onClick={() =>
                    this.props.history.push({
                      pathname: '/apply-for-job',
                      state: { jobId: data._id },
                    })
                  }
                >
                  <div
                    className="col-sm-3 col-xs-3 text-center"
                    style={{ padding: '20px 30px' }}
                  >
                    <Image
                      className="job-card-image-1"
                      src={
                        data.job_logo
                          ? ImageUrl.imageUrlPath+data.job_logo
                          : process.env.PUBLIC_URL + '/Rectangle@2x.png'
                      }
                    />
                  </div>
                  <div
                    className="col-sm-9 col-xs-9"
                    style={{ padding: '20px 30px 20px 0px' }}
                  >
                    <Row>
                      <div className="col-sm-9 col-xs-9 p-0">
                        <p className="job-card-3">{data.title.charAt(0).toUpperCase()+data.title.slice(1)}</p>
                        <p className="job-card-4">
                          {data.companyDetail[0].comp_info.bus_name}
                        </p>
                        <p className="job-card-5 pt-3">
                          <img
                            src={process.env.PUBLIC_URL + '/briefcase-red.png'}
                          />
                          &nbsp;&nbsp;Service
                        </p>
                      </div>
                      <div className="col-sm-3 col-xs-3 text-right p-0">
                        <p className="job-card-7">PERMANENT</p>
                        <p className="job-card-8">
                          {data.isSponsored ? 'SPONSORED' : ''}
                        </p>
                      </div>
                    </Row>
                    <ul className="job-card-6">
                    
                       <div className={"mr-4 pt-3"}> 
                          <img
                            src={process.env.PUBLIC_URL + '/location-red.png'}
                          />
                          &nbsp;&nbsp;
                          {data.location ? data.location : 'No location found.'}
                      </div>
                      <div className={"mr-4 pt-3"}>
                     
                          <img
                            src={process.env.PUBLIC_URL + '/file-badge.svg'}
                          />
                          &nbsp;&nbsp;
                          {`${data.min_experience}-${data.max_experience} years`}
                     
                  </div>
                  <div className={"mr-4 pt-3"}>
                          <img
                            src={process.env.PUBLIC_URL + '/clock-red.png'}
                          />
                          &nbsp;&nbsp;
                          {data.daysBeforePosted !== 0
                            ? `${data.daysBeforePosted} days ago`
                            : 'today'}
                            </div>
                      
                    </ul>
                  </div>
                </Row>
              </div>
            ))}
            <div className={'paginate-container'}>
          <Pagination
            activePage={this.state.currentPage}
            itemsCountPerPage={20}
            firstPageText={false}
            lastPageText={false}
            totalItemsCount={this.state.totalData}
            pageRangeDisplayed={5}
            onChange={(pageNumber) => {
              this.loadMoreData(pageNumber);
            }}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
        </div>
        
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobdata: state.jobManagementReducer.jobdata,
  };
};
export default withRouter(connect(mapStateToProps)(JobCards));
