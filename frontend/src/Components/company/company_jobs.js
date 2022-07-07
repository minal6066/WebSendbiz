import React, { Component } from 'react';
import Box from '../candidate/box.js';
import Footer from '../footer/footer.js';
import './company.css';
import axios from 'axios';
import { Spin, Row, Image, Col } from 'antd';
import { ImageUrl } from '../../Shared/imageUrlPath';
import APIManager from '../../APIManager';
import { connect } from 'react-redux';
import moment from 'moment';

export default function CompanyJobs(props) {
  return (
    <>
      <h6 className="about-company w-100">
        {props.jobs_data.length} Jobs listed
      </h6>
      <div className="col-sm-8 p-0 text-left">
        {props.jobs_data.map((data, index) => (
          <div className="flex-container" key={index}>
            <Row className={'col-sm-12 jobListingclscard-1 job-card-2 mt-3'}>
              <div
                className="col-sm-3 col-xs-3 text-center"
                style={{ padding: '20px 30px' }}
              >
                <Image
                  className="job-card-image-1"
                  src={
                    data.job_logo
                      ? ImageUrl.imageUrlPath + data.job_logo
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
                    <p className="job-card-3">{data.title}</p>
                    <p className="job-card-4">{props.comp_data.comp_name}</p>
                    <p className="job-card-5">
                      <img
                        src={process.env.PUBLIC_URL + '/briefcase-red.png'}
                      />
                      &nbsp;&nbsp;Service
                    </p>
                  </div>
                  <div className="col-sm-3 col-xs-3 text-right p-0">
                    <p className="job-card-7">PERMANENT</p>
                    <p className="job-card-8">
                      {data.is_sponsored ? 'SPONSERED' : ''}
                    </p>
                  </div>
                </Row>
                <ul className="job-card-6">
                  <li>
                    <p>
                      <img src={process.env.PUBLIC_URL + '/location-red.png'} />
                      &nbsp;&nbsp;
                      {data.location ? data.location : 'No location found.'}
                    </p>
                  </li>
                  <li>
                    <p>
                      <img src={process.env.PUBLIC_URL + '/file-badge.svg'} />
                      &nbsp;&nbsp;
                      {`${data.min_experience}-${data.max_experience} years`}
                    </p>
                  </li>
                  <li>
                    <p>
                      <img src={process.env.PUBLIC_URL + '/clock-red.png'} />
                      &nbsp;&nbsp;
                      {data.daysBeforePosted !== 0
                        ? `${data.daysBeforePosted} days ago`
                        : 'today'}
                    </p>
                  </li>
                </ul>
              </div>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
}
