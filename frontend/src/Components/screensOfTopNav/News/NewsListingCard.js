import React, { Component } from 'react';
import { Row, Col, Input, Select, Card, Tag,message } from 'antd';
import {
  EnvironmentFilled,
  MessageFilled,
  CalendarFilled,
  LikeFilled,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import Pagination from 'react-js-pagination';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import '../Services/ServiceListing.css';
import { ImageUrl } from '../../../Shared/imageUrlPath';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import cardDefaultPic from '../../../Components/asset/card.svg';

const { Search } = Input;
const { Option } = Select;

const numEachPage = 2;

class NewsListingCard extends Component {
  state = {
    data: null,
    resultsPerPage: 10,
    totalData: null,
    totalPages: null,
    currentPage: null,
    id: '',
  };
  componentDidMount() {
    this.makeHttpRequestWithPage();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchingValue !== prevProps.searchingValue) {
      console.log('working!!!');
      this.makeHttpRequestWithPage();
    }
    if (this.props.company_name !== prevProps.company_name) {
      this.makeHttpRequestWithPage();
    }
    if (this.props.location !== prevProps.location) {
      this.makeHttpRequestWithPage();
    }
  }
  makeHttpRequestWithPage = async (pageNumber = 1) => {
    const searchingValue = this.props.searchingValue;
    const company_name = this.props.company_name;
    const location = this.props.location;
    APIManager.allNewsListSortAndSearch(
      pageNumber,
      searchingValue,
      company_name,
      location
    ).then((resp) => {
      this.setState({
        data: resp.data.data,
        total: resp.data.totalCount,
        totalData: resp.data.totalCount,
        //   per_page: resp.data.results,
        currentPage: resp.data.currentPage,
      });
    })
    .catch((err) =>{
        message.error(err)
    })
  };

  render() {
    let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / 10); i++) {
        pageNumbers.push(i);
      }
      renderPageNumbers = pageNumbers.map((number) => {
        // let classes = this.state.currentPage === number ? .active : '';
        return (
          <span
            key={number}
            onClick={() => this.makeHttpRequestWithPage(number)}
            className={
              this.state.current_page === number
                ? 'page-number-btn'
                : 'pagination-container'
            }
          >
            {number}
          </span>
        );
      });
    }
    const { searchQuery } = this.props;
    // const searachedData = CompanyNewsData.filter((data) =>
    //   data.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    // );
    // const paginatedData =
    //   searachedData &&
    //   searachedData.slice(this.state.minValue, this.state.maxValue);

    return (
      <>
        {this.state.data !== null && this.state.data.length === 0
          ? 'No data Found'
          : this.state.data &&
            this.state.data.map((data) => (
              <>
                <Row>
                  <Col span={2}></Col>
                  <Card
                    hoverable
                    onClick={() => {
                      var ls = require('local-storage');
                      ls.set('newsId', data._id);
                      this.props.history.push({
                        pathname: '/news/detail',
                        id: data._id,
                      });
                    }}
                    style={{ width: 240, height: 350, marginBottom: 30 }}
                    cover={
                      <img
                        alt="example"
                        src={
                          data.imagePath.length !== 0
                            ? data.imagePath.map((data) =>
                                data ? data : cardDefaultPic
                              )
                            : cardDefaultPic
                        }
                        style={{ height: '200px', width: '100%' }}
                      />
                    }
                  >
                    <p className="card-heading-job-detail-scroller-1">
                      {data.title}
                    </p>
                    <p className="card-heading-job-detail-scroller-2">
                      <img
                        alt="example"
                        src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                      />
                      &nbsp;&nbsp;
                      <span>{data.avgReadTime} read</span>
                    </p>
                    <p className="card-heading-job-detail-scroller-2">
                      {moment(data.updatedAt).format('DD MMM YYYY')}
                    </p>
                  </Card>
                  <Col span={2}></Col>
                </Row>
              </>
            ))}
        <div className={'paginate-container'}>
          {console.log(this.state.currentPage)}
          <Pagination
            activePage={this.state.currentPage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.totalData}
            pageRangeDisplayed={5}
            onChange={(pageNumber) => {
              this.makeHttpRequestWithPage(pageNumber);
            }}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     jobdata: state.jobManagementReducer.jobdata,
//     isloading: state.jobManagementReducer.isloading,
//   };
// };
export default withRouter(NewsListingCard);
