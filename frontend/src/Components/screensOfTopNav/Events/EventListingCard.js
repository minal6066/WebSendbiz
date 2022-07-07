import React, { Component } from 'react';
import { Row, Col, Input, Select, Card, Tag, message } from 'antd';
import Pagination from 'react-js-pagination';
import {
  EnvironmentFilled,
  MessageFilled,
  CalendarFilled,
  LikeFilled,
} from '@ant-design/icons';
import APIManager from '../../../APIManager';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ImageUrl } from '../../../Shared/imageUrlPath';
import { withRouter } from 'react-router-dom';
import cardDefaultPic from '../../../Components/asset/card.svg';

const { Search } = Input;
const { Option } = Select;

const numEachPage = 2;

class EventListingCard extends Component {
  state = {
    minValue: 0,
    maxValue: 2,
    data: null,
    resultsPerPage: 10,
    totalData: null,
    totalPages: null,
    current_page: null,
  };
  componentDidMount() {
    this.makeHttpRequestWithPage();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.date !== prevProps.date) {
      console.log('working!!!');
      this.makeHttpRequestWithPage();
    }
    if (this.props.searchQuery !== prevProps.searchQuery) {
      console.log('working!!!');
      this.makeHttpRequestWithPage();
    }
  }
  makeHttpRequestWithPage = async (pageNumber = 1) => {
    const date = this.props.date;
    const search = this.props.searchQuery;
    APIManager.allEventsSortAndSearch(pageNumber, date, search.toLowerCase())
      .then((resp) => {
        console.log(resp, 'sss');
        this.setState({
          data: resp.data.data,
          total: resp.data.totalCount,
          totalData: resp.data.totalCount,
          //   per_page: resp.data.results,
          current_page: resp.data.currentPage,
        });
      })
      .catch((err) => message.error(err));
  };
  handleChange = (value) => {
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };

  render() {
    let renderPageNumbers;
    console.log('Current Page is: ' + this.state.current_page);
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

    const loading = this.props.isloading;

    return (
      <>
        {this.state.data === null && (
          <div className={'d-flex justify-content-center'}>
            <Spin />
          </div>
        )}

        <h3 className="card-div-head">{`${
          this.state.total ? this.state.total : ''
        } Events Found`}</h3>
        {this.state.data &&
          this.state.data.map((data) => (
            <Card
              className="services-card"
              onClick={() => {
                var ls = require('local-storage');
                ls.set('eventId', data._id);
                this.props.history.push({
                  pathname: '/events/detail',
                  eventId: data._id,
                });
              }}
              style={{ margin: '0 40px 15px 40px' }}
              key={data.comp_id}
            >
              <Row>
                <Col span={3}>
                  <img
                    alt="example"
                    src={
                      data?.imagePath?.length !== 0
                        ? data.imagePath.map((data) =>
                            data ? data : cardDefaultPic
                          )
                        : cardDefaultPic
                    }
                    style={{ width: '100%', height: '100px' }}
                  />
                </Col>
                <Col
                  span={21}
                  style={{ paddingLeft: '20px' }}
                  className="service-detail-row"
                >
                  <Row justify="space-between">
                    <Col span={24}>
                      <div className="service-name">{data.name}</div>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={24}>
                      <div>{data.companyData.comp_info.bus_name}</div>
                    </Col>
                  </Row>
                  <Row align="bottom" style={{ marginTop: '10px' }}>
                    <Col
                      span={20}
                      style={{ display: 'flex', alignSelf: 'self-start' }}
                    >
                      <EnvironmentFilled className="service-icons" />
                      <div
                        className="service-location"
                        style={{ display: 'block' }}
                      >
                        {data.location}
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '10px' }}>
                    <Col
                      span={6}
                      style={{ display: 'flex', alignSelf: 'self-start' }}
                    >
                      <LikeFilled className="service-icons" />
                      <div
                        className="service-location"
                        style={{ display: 'block' }}
                      >
                        {data?.likes?.length} Likes
                      </div>
                    </Col>
                    <Col span={8}>
                      <MessageFilled className="service-icons" />
                      <div className="service-location">
                        {data?.comments?.length} Comments{' '}
                      </div>
                    </Col>
                    <Col span={10}>
                      <CalendarFilled className="service-icons" />
                      <div className="service-location">
                        {`${moment(data.from).format('DD-MM-YY')} to ${moment(
                          data.to
                        ).format('DD-MM-YY')}`}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))}
        <Pagination
          activePage={this.state.currentPage}
          firstPageText={false}
          lastPageText={false}
          itemsCountPerPage={10}
          totalItemsCount={this.state.totalData}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => {
            this.makeHttpRequestWithPage(pageNumber);
          }}
          itemClass="page-item"
          linkClass="page-link"
        />
        <div className={'paginate-container'}>
          {console.log(
            'EVENT LISTING ' + this.state.data + ' ' + this.state.total
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventdata: state.eventReducer.eventdata,
    isloading: state.eventReducer.isloading,
  };
};
export default withRouter(connect(mapStateToProps)(EventListingCard));
