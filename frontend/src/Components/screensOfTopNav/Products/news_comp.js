import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import {
    Col,
    Row,
    Card,
    Button,
  } from 'antd';
import 'react-multi-carousel/lib/styles.css';
import '../../job/apply_job.css';


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

  render() {

    return (
      <>
      <Row className="apply-job-news-bottom" style={{ paddingTop: 70 }}>
          <p className="apply-job-news-bottom-para-1">News</p>
          <p className="apply-job-news-bottom-para-2">Inside JobHunt</p>
        </Row>
        <Row justify="center">
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
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/scroller-1.png'}
                  />
                }
              >
                <p className="card-heading-job-detail-scroller-1">
                  6 tips for running a successful online business
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                  />
                  &nbsp;&nbsp;
                  <span>5 min. read</span>
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  12 May 2019
                </p>
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/scroller-1.png'}
                  />
                }
              >
                <p className="card-heading-job-detail-scroller-1">
                  How do you know when it’s time to finally rebrand?
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                  />
                  &nbsp;&nbsp;
                  <span>5 min. read</span>
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  12 May 2019
                </p>
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/scroller-1.png'}
                  />
                }
              >
                <p className="card-heading-job-detail-scroller-1">
                  Here are 6 tips for running a successful online business
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                  />
                  &nbsp;&nbsp;
                  <span>5 min. read</span>
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  12 May 2019
                </p>
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/scroller-1.png'}
                  />
                }
              >
                <p className="card-heading-job-detail-scroller-1">
                  What’s the purpose of logos and why do they matter?
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                  />
                  &nbsp;&nbsp;
                  <span>5 min. read</span>
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  12 May 2019
                </p>
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/scroller-1.png'}
                  />
                }
              >
                <p className="card-heading-job-detail-scroller-1">
                  6 tips for running a successful online business
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/clock_copy_3.svg'}
                  />
                  &nbsp;&nbsp;
                  <span>5 min. read</span>
                </p>
                <p className="card-heading-job-detail-scroller-2">
                  12 May 2019
                </p>
              </Card>
            </Carousel>
          </Col>
        </Row>

      </>
    );
  }
}