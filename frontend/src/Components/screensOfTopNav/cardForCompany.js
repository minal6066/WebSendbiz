import React, { Component } from 'react';
import { Row, Col, Input, Switch, Image, message, Spin } from 'antd';
import './topNav.css';
import { connect } from 'react-redux';
import APIManager from '../../APIManager/index';
import Pagination from 'react-js-pagination';
import { withRouter } from 'react-router-dom';
import cardDefaultPic from '../../Components/asset/card.svg';

class CompanyListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      resultsPerPage: null,
      totalData: null,
      totalPages: null,
      currentPage: null,
      isLoading: false,
    };
  }
  async componentDidMount() {
    await this.loadData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchingValue !== prevProps.searchingValue) {
      console.log('working!!!');
      this.loadData();
    }
  }
  loadData = (pageNumber = 1) => {
    const search = this.props.searchingValue;
    this.setState({ isLoading: true });
    APIManager.companyList(pageNumber, search.toLowerCase())
      .then((resp) => {
        console.log(resp.data, '========++++');
        this.setState({
          companies: resp?.data?.data,
          resultsPerPage: resp.data.results,
          totalData: resp.data.totalCount,
          totalPages: resp.data.totalPages,
          currentPage: resp.data.currentPage,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        message.error(err);
      });
  };
  render;
  render() {
    console.log(
      this.state.currentPage,
      this.state.totalData,
      '===================='
    );
    return (
      <>
        <div className={'d-flex justify-content-center'}>
          {this.state.isLoading ? <Spin /> : ''}
        </div>
        <div className="custom-container" style={{ padding: 0 }}>
          <div className="flex-container job-card-1">
            {this.state.companies &&
              this.state.companies.map((data, index) => (
                <Row
                  className={
                    'col-sm-12 jobListingclscard-1 job-card-2 mt-3 p-0'
                  }
                  key={index}
                  onClick={() =>
                    this.props.history.push({
                      // pathname: `/comp-name-${data.comp_info.comp_name
                      //   .split(' ')
                      //   .join('')}/${data._id}`,
                      pathname: `/comp-id${data._id
                        }/comp-name-${data.comp_info.comp_name
                          .split(' ')
                          .join('')}`,
                      state: { compId: data._id },
                    })
                  }
                >
                  <div
                    className="col-sm-3 col-xs-3 text-center"
                    style={{ padding: '20px 10px 20px 30px' }}
                  >

                    <img
                      className="job-card-image-1"
                      alt="logo"
                      src={
                        data.logo.path && data.logo.path !== ''
                          ? data.logo.path
                          : cardDefaultPic
                      }
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div
                    className="col-sm-9 col-xs-9"
                    style={{ padding: '20px 30px 20px 0px' }}
                  >
                    <Row>
                      <div className="col-sm-9 col-xs-9 company-card-8">
                  
                        <p className="job-card-4">
                          {data.comp_info.bus_name ? data.comp_info.bus_name.charAt(0).toUpperCase() +
                            data.comp_info.bus_name.slice(1).toUpperCase() : data.comp_info.comp_name.charAt(0).toUpperCase() +
                          data.comp_info.comp_name.slice(1).toUpperCase()}
                        </p>
                        <p className="job-card-5">
                          <img
                            src={process.env.PUBLIC_URL + '/location-red.png'}
                          />
                          &nbsp;&nbsp;{data.contact_info.city}
                          {', '}
                          {data.contact_info.country}
                        </p>
                      </div>
                      <div className="col-sm-3 col-xs-3 text-right p-0">
                        {data.comp_info.noOf_emp > 0 && (
                          <p className="job-card-7">{`${data.comp_info.noOf_emp} Employees`}</p>
                        )}
                        <p className="job-card-8">
                          {data.isSponsored ? 'SPONSERED' : ''}
                        </p>
                      </div>
                    </Row>
                    <Row className="pt-2">
                      <div className="col-3 company-card-6 right-card-border">
                        <p className="mb-0">{data.jobs.length}</p>
                        <p className="company-card-7 mb-0">Jobs</p>
                      </div>
                      <div className="col-3 company-card-6 right-card-border">
                        <p className="mb-0">{data.products.length}</p>
                        <p className="company-card-7 mb-0">Products</p>
                      </div>
                      <div className="col-3 company-card-6 right-card-border">
                        <p className="mb-0">{data.services.length}</p>
                        <p className="company-card-7 mb-0">Services</p>
                      </div>
                      <div className="col-3 company-card-6">
                        <p className="mb-0">
                          {data.comp_info !== null ? data.comp_info.age : ''}
                        </p>
                        <p className="company-card-7 mb-0">Avg age</p>
                      </div>
                    </Row>
                  </div>
                </Row>
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
                  this.loadData(pageNumber);
                }}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    companyList: state.jobManagementReducer.companyList,
    isLoading: state.jobManagementReducer.isLoading,
  };
};
export default withRouter(connect(mapStateToProps)(CompanyListCard));
