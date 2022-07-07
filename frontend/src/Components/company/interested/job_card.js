import React, { Component, useCallback, useEffect, useState } from 'react';
import { message, Spin, Row, Col, Card, Tag, Popconfirm } from 'antd';
import APIManager from '../../../APIManager/index';
import cardDefaultImage from '../../asset/card.svg';
import moment from 'moment';
import {
  LeftOutlined,
  RightOutlined,
  ClockCircleFilled,
  DeleteFilled,
} from '@ant-design/icons';

const JobCards = (props) => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [total, setTotal] = useState('');
  const [jobId, setJobId] = useState('');
  useEffect(() => {
    makeHttpRequestWithPage(1);
  }, []);
  const deleteService = () => {
    const id = jobId;
    APIManager.deleteIntersted(id)
      .then((resp) => {
        if (resp.data.isSuccess) {
          message.info(resp.data.message);
          makeHttpRequestWithPage(currentPage);
        }
      })
      .catch((err) => {
        message.error('Something went wrong.');
      });
  };
  const makeHttpRequestWithPage = async (pageNumber) => {
    const category = 'job';
    setLoading(true);
    APIManager.getInterstedList(pageNumber, category)
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data, 'resp');
          setData(resp.data.data);
          setTotal(resp.data.totalCount);
          setCurrentPage(resp.data.currentPage);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error('Something went wrong!');
      });
  };

  let renderPageNumbers;
  const pageNumbers = [];
  if (total !== null) {
    for (let i = 1; i <= Math.ceil(total / 10); i++) {
      pageNumbers.push(i);
    }
    renderPageNumbers = pageNumbers.map((number) => {
      // let classes = this.state.currentPage === number ? .active : '';
      return (
        <span
          key={number}
          onClick={() => this.makeHttpRequestWithPage(number)}
          className={
            currentPage === number ? 'page-number-btn' : 'pagination-container'
          }
        >
          {number}
        </span>
      );
    });
  }
  return (
    <div>
      {isloading && (
        <div className={'d-flex justify-content-center'}>
          <Spin />
        </div>
      )}
      {data &&
        data.map((data) => {
          return (
            <Card className="services-card w-100">
              <Row>
                <Col span={3}>
                  <img
                    alt="example"
                    src={data.interestId.media.map((data) => data.filePath)}
                    style={{ width: '100%', height: '119px' }}
                  />
                </Col>
                <Col
                  span={19}
                  style={{ paddingLeft: '20px' }}
                  className="service-detail-row"
                >
                  <Row justify="space-between">
                    <Col span={17}>
                      <div className="service-name">
                        {data.interestId.title}
                      </div>
                      <p className="favourite-para-1 m-0">
                        {/* {val.companyDetail.comp_info.comp_name} */}
                        {data.interestId.companyDetail.map((data) => {
                          return data.comp_info.comp_name;
                        })}
                      </p>
                    </Col>
                    <Col>
                      <Popconfirm
                        title="Are you sure to delete this job?"
                        onConfirm={() => {
                          deleteService();
                        }}
                        // onCancel={cancelDelete}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteFilled
                          onClick={() => setJobId(data._id)}
                          className="service-hidden-icons service-icons"
                        />
                      </Popconfirm>
                    </Col>
                    <Col span={7} className="icon-col"></Col>
                  </Row>
                  <Row>
                    <Col span={18}>
                      <span>
                        <img
                          src={process.env.PUBLIC_URL + '/location-red.png'}
                          style={{ width: 14 }}
                          alt={'image_1'}
                        />
                      </span>
                      <span
                        className="service-s-desc"
                        style={{
                          paddingLeft: '8px',
                          verticalAlign: 'middle',
                        }}
                      >
                        {/* {val.job.location !== null
                                    ? val.job.location
                                    : null} */}
                        {data.interestId.location === '' ||
                        data.interestId.location === null
                          ? 'No location'
                          : data.interestId.location}
                      </span>
                    </Col>
                  </Row>
                  <Row align="bottom" style={{ marginTop: '10px' }}>
                    {/* {val.location === null || val.location === ' ' ? ( */}
                    <Col
                      span={9}
                      style={{
                        display: 'flex',
                        alignSelf: 'self-start',
                      }}
                    >
                      {/* <EnvironmentFilled className="service-icons" /> */}
                      <span>
                        <ClockCircleFilled className="service-icons" />
                      </span>
                      <div
                        className="service-location"
                        style={{ display: 'block' }}
                      >
                        {moment(data.interestId.create).fromNow()}
                      </div>
                    </Col>
                    {/* )} */}
                    <Col span={12}>
                      <img
                        src={process.env.PUBLIC_URL + '/clock-red.png'}
                        className="service-icons"
                        alt={'image_1'}
                        style={{
                          height: '16px',
                          verticalAlign: 'super',
                        }}
                      />
                      <div className="service-location">
                        {moment(data.interestId.create).format('DD MMM YY')}
                      </div>
                    </Col>

                    <Col
                      span={2}
                      style={{ textAlign: 'right' }}
                      className="sponsered"
                    ></Col>
                  </Row>
                </Col>

                <Col span={4}>
                  {/* <img
                    //   onClick={() => this.deleteFavJob(val.job._id)}
                    src={process.env.PUBLIC_URL + '/bookmark-red.svg'}
                    className="favouritejobs-card-5"
                    alt="like"
                  /> */}
                  <Col className="icon-col"></Col>
                </Col>
              </Row>
            </Card>
          );
        })}
      <div className={'d-flex justify-content-end pt-2'}>
        <span
          className={currentPage === 1 ? 'pagination-side-btn' : ''}
          onClick={() => makeHttpRequestWithPage(1)}
        >
          {' '}
          <LeftOutlined />{' '}
        </span>
        <div>{renderPageNumbers}</div>
        <span onClick={() => makeHttpRequestWithPage(1)}>
          <RightOutlined />
        </span>
      </div>
    </div>
  );
};
export default JobCards;
