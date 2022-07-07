import React, { Component } from 'react';
import { Row, Col, Card, Pagination, Tag } from 'antd';
import './servicescard.css';
import { DeleteFilled, EnvironmentFilled } from '@ant-design/icons';

const ProductData = [
  {
    id: '1',
    name: 'HP LAPTOP ACER ASPIRE 5 SLIM LAPTOP',
    image: null,
    person: 'Barbara Cotilla',
    position: 'Project Head',
  },
  {
    id: '2',
    name: 'LOGITECH M510 WIRELESS COMPUTER MOUSE',
    image: null,
    person: 'Barbara Cotilla',
    position: 'Project Head',
  },
  {
    id: '3',
    name: 'Testing products by HP, samsung and many more',
    image: null,
    person: 'Barbara Cotilla',
    position: 'Project Head',
  },
  {
    id: '4',
    name: 'HP LAPTOP ACER ASPIRE 5 SLIM LAPTOP',
    image: null,
    person: 'Barbara Cotilla',
    position: 'Project Head',
  },
  {
    id: '5',
    name: 'HP LAPTOP ACER ASPIRE 5 SLIM LAPTOP',
    image: null,
    person: 'Barbara Cotilla',
    position: 'Project Head',
  },
];

const numEachPage = 2;

export default class Product extends Component {
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
  renderb = (e, data) => {
    console.log(e, data);
  };
  render() {
    // const CompanyServicesData = this.props.data ? this.props.data.data : '';
    // const loading = this.props.isloading ? this.props.isloading : '';
    console.log('props:', this.props);

    const paginatedData =
      ProductData &&
      ProductData.slice(this.state.minValue, this.state.maxValue);
    // console.log('searched obj:', paginatedData, paginatedData.filter((data) =>data.name.toLowerCase().startsWith(searchQuery.toLowerCase())))
    return (
      <>
        {ProductData.slice(this.state.minValue, this.state.maxValue).map(
          (data) => (
            <Card
              className="services-card"
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
                      <div className="service-name product-name">
                        {data.name}
                      </div>
                    </Col>
                    <Col span={4} className="icon-col">
                      <img
                        src={process.env.PUBLIC_URL + '/mailbox_red.png'}
                        className="service-hidden-icons  service-icons"
                        style={{ height: 18 }}
                      />
                      <DeleteFilled className="service-hidden-icons service-icons" />
                    </Col>
                  </Row>
                  <Row align="bottom" style={{ marginTop: '20px' }}>
                    <Col
                      span={14}
                      style={{ display: 'flex', alignSelf: 'self-start' }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + '/chat_int.png'}
                        className="service-icons chat-icon"
                      />
                      <div
                        className="service-location"
                        style={{ display: 'block' }}
                      >
                        {data.person}
                      </div>
                      <div
                        style={{
                          color: '#EE5050',
                          fontWeight: 700,
                          marginLeft: 10,
                        }}
                      >
                        [{data.position}]
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          )
        )}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={numEachPage} //default size of page
          onChange={this.handleChange}
          total={ProductData.length} //total number of card data available
          className="services-pagination"
        />
      </>
    );
  }
}
