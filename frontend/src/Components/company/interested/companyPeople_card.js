import React, { Component } from 'react';
import { Row, Col, Card, Pagination, Tag } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './servicescard.css';
import {
  DeleteFilled,
  EnvironmentFilled
} from '@ant-design/icons';

const CompanyPeopleData = [
  {
    id:'1',
    name:'Trienke Van Aartsen',
    comp_desc:"",
    location:'San Jose, California',
    image:null,
    person: 'Barbara Cotilla',
    position: 'Project Head',
    role:'DEVELOPER'
  },
  {
    id:'2',
    name:'SendBiz',
    comp_desc:"Human Resource, Services",
    location:'San Jose, California',
    image:null,
    person: 'Jamie German',
    position: 'Project Head',
    role:null,
  },
  {
    id:'3',
    name:'Createbytes',
    comp_desc:'Development Studio',
    location:'NCR Delhi',
    image:null,
    person: 'HG Wells',
    position: 'Project Head',
    role:''
  },
  {
    id:'4',
    name:'Van Aartsen',
    comp_desc:"",
    location:'New York',
    image:null,
    person: 'Charles',
    position: 'Project Head',
    role:'developer'
  },
  {
    id:'5',
    name:'Sendbiz',
    comp_desc:"Human Resource, Services",
    location:'San Jose, California',
    image:null,
    person: 'James Peter',
    position: 'Project lead',
    role:''
  },
];

const numEachPage = 2;

export default class CompanyPeople extends Component {
  state = {
    minValue: 0,
    maxValue: 2,
  };

  showCandidateInfo = () => {
    console.log('hello');
    //  this.props.history.push('./Applied-company_info');
  };

  handleChange = (value) => {
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };

  renderb =(e,data)=>{
    console.log(e,data)
  }

  render() {
    // const CompanyServicesData = this.props.data ? this.props.data.data : '';
    // const loading = this.props.isloading ? this.props.isloading : '';
    console.log('props:', this.props)
    
    const paginatedData =
      CompanyPeopleData &&
      CompanyPeopleData.slice(this.state.minValue, this.state.maxValue);
    // console.log('searched obj:', paginatedData, paginatedData.filter((data) =>data.name.toLowerCase().startsWith(searchQuery.toLowerCase())))
    return (
      <>
        {CompanyPeopleData
            .slice(this.state.minValue, this.state.maxValue)
            .map((data) => (
              <Card className="services-card" 
              // onClick={(e)=>this.renderb(e,data)}
              >
                <Row>
                  <Col span={3}>
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      style={{ width: '100%', height: '80px' }}
                    />
                  </Col>
                  <Col
                    span={21}
                    style={{ paddingLeft: '20px' }}
                    className="service-detail-row"
                  >
                    <Row justify="space-between">
                      <Col span={20}>
                        <div className="service-name"
                        >{data.name}</div>
                      </Col>
                      <Col span={4} className="icon-col">
                        <span style={{position:'absolute' ,right:'0px'}}>
                          <Tag color="volcano" className='s-price-tag hidden-role' >{data.role}</Tag>
                          
                        </span>
                        <img  src={process.env.PUBLIC_URL + "/mailbox_red.png"} 
                        className="service-hidden-icons  service-icons"
                        style={{height: 18}}
                        />
                        <DeleteFilled className="service-hidden-icons service-icons" />
                        

                      </Col>
                    </Row>
                    <Row>
                      <p className="interested-comp-desc">{data.comp_desc}</p>
                    </Row>
                    <Row align="bottom" style={{ marginTop: '10px' }}>
                      <Col
                        span={10}
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
                      <Col
                        span={14}
                        style={{ display: 'flex', alignSelf: 'self-start' }}
                      >
                        <img src={process.env.PUBLIC_URL + "/chat_int.png"} 
                        className="service-icons chat-icon" 
                        />
                        <div
                          className="service-location"
                          style={{ display: 'block' }}
                        >
                          {data.person}
                        </div>
                        <div style={{color: '#EE5050', fontWeight: 700, marginLeft:10}} >
                          [{data.position}]
                        </div>
                      </Col>
                    </Row>
                    </Col>
                </Row>
              </Card>
            ))}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={numEachPage} //default size of page
          onChange={this.handleChange}
          total={CompanyPeopleData.length} //total number of card data available
          className="services-pagination"
        />
      </>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     data: state.appliedJobsReducer.data,
//     isloading: state.appliedJobsReducer.isloading,
//   };
// };
// export default withRouter(connect(mapStateToProps)(ServiceCards));
