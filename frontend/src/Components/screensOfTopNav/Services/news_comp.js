import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import { Col, Row, Card, Button, message, Skeleton, Spin } from 'antd';
import 'react-multi-carousel/lib/styles.css';
import '../../job/apply_job.css';
import APIManager from '../../../APIManager/index';
import moment from 'moment';
import cardDefaultPic from '../../../Components/asset/card.svg';

const { Meta } = Card;
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group">
      <Button
        className="react-multiple-carousel__arrow_custom custom-left"
        onClick={() => previous()}
      >
        <img src={process.env.PUBLIC_URL + '/job-apply-left-arrow.svg'} />
      </Button>
      <Button
        className="react-multiple-carousel__arrow_custom custom-right"
        onClick={() => next()}
      >
        <img src={process.env.PUBLIC_URL + '/job-apply-right-arrow.svg'} />
      </Button>
    </div>
  );
};

export default class NewsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    APIManager.allNewsList()
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            newsData: resp.data.data,
            isLoading: false,
          });
        }
        console.log(this.state.newsData);
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        message.error('Something went wrong!');
      });
  }
  render() {
    const { newsData } = this.state;
    return (
      <>
        <Row className="apply-job-news-bottom" style={{ paddingTop: 70 }}>
          <p className="apply-job-news-bottom-para-1">News</p>
          <p className="apply-job-news-bottom-para-2">Inside JobHunt</p>
        </Row>
        <Row justify="center">
          <div className={'d-flex justify-content-center w-100'}>
            {this.state.isLoading && (
              <div>
                <Spin />
              </div>
            )}
          </div>
          <Col span={20} className="apply-job-scroller">
            <Carousel
              additionalTransfrom={0}
              arrows={false}
              customButtonGroup={<ButtonGroup />}
              autoPlaySpeed={0}
              centerMode={true}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={true}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 40,
                },

                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {newsData &&
                newsData.map((data) => {
                  return (
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <img
                          alt="example"
                          src={
                            data.imagePath.length !== 0
                              ? data.imagePath.map((data) =>
                                  data.filePath ? data.filePath : cardDefaultPic
                                )
                              : cardDefaultPic
                          }
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
                        <span>{data.avgReadTime}</span>
                      </p>
                      <p className="card-heading-job-detail-scroller-2">
                        {moment(data.updatedAt).format('DD MMM YY')}
                      </p>
                    </Card>
                  );
                })}
            </Carousel>
          </Col>
        </Row>
      </>
    );
  }
}
