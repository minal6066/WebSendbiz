import React, { Component } from 'react';
import { Row, Col, Card, Pagination, Tag } from 'antd';
import './servicescard.css';
import {
  DeleteFilled,
  EnvironmentFilled
} from '@ant-design/icons';

const NewsData = [
  {
    id:'1',
    title:'Latest News: test news updates',
    name:"Ahemad Naseri",
    image:null
  },
  {
    id:'2',
    title:'Marketing Tips for online business',
    name:"Stephen Shaw",
    image:null,
  },
  {
    id:'3',
    title:'6 Top Tips for online business',
    name:"Richie Daniel",
    image:null,
  },
  {
    id: '4',
    title:'Growth strategy for online business',
    name:"Harry George",
    image:null,
  },
  {
    id: '5',
    title:'AI/ML workshops and its benefits',
    name:"Peter Pan",
    image:null,
  },
];

const numEachPage = 2;

export default class Services extends Component {
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
      NewsData &&
      NewsData.slice(this.state.minValue, this.state.maxValue);
    // console.log('searched obj:', paginatedData, paginatedData.filter((data) =>data.name.toLowerCase().startsWith(searchQuery.toLowerCase())))
    return (
      <>
        {NewsData
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
                        >{data.title}</div>
                      </Col>

                      <Col span={4} className="icon-col">
                        <img  src={process.env.PUBLIC_URL + "/mailbox_red.png"} 
                        className="service-hidden-icons  service-icons"
                        style={{height: 18}}
                        />
                        <DeleteFilled className="service-hidden-icons service-icons" />
                      </Col>
                    </Row>
                    <Row align="middle" style={{paddingTop: '10px'}}>
                    <Col
                        span={12}
                        style={{ display: 'flex', alignSelf: 'self-start' }}
                      >
                        <div
                          className="service-location"
                          style={{ display: 'block' }}
                        >
                          {data.name}
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
          total={NewsData.length} //total number of card data available
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