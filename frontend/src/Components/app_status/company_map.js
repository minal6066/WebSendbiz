import React, { Component } from 'react';
import D from '../asset/Group 51.png';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Select, message, Card, Row } from 'antd';
import APIManager from '../../APIManager/index';
import './company_map.css';
import {
  Map,
  InfoWindow,
  GoogleApiWrapper,
  Marker,
  showInfoWindow,
} from 'google-maps-react';
import { Formik } from 'formik';
let formButton = null;
const { Option } = Select;

const JobWindow = (props) => {
  console.log(props.data);
  return (
    <Card>
      <Row>
        <img
          alt="example"
          height={99}
          width={164}
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      </Row>
      <div className="custom-map-info-window-text">
        <p className="w-100 m-0 custom-map-info-window-title">
          {props.data ? props.data.title : ''}
        </p>
        <p className="w-100 m-0 custom-map-info-window-company-name">
          {props.data ? props.data.companyDetail[0].comp_info.comp_name : ''}
        </p>
        <p className="w-100 m-0 custom-map-info-window-job-type">
          <span>PERMANENT</span>
        </p>
        <p className="w-100 m-0 custom-map-info-window-location">California</p>
        <p className="w-100 m-0 custom-map-info-window-salary">$5000-6000</p>
      </div>
    </Card>
  );
};
const CompanyWindow = (props) => {
  return (
    <Card>
      <Row>
        <img
          alt="example"
          height={99}
          width={164}
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      </Row>
      <div className="custom-map-info-window-text">
        <p className="w-100 m-0 custom-map-info-window-title">Data Analyst</p>
        <p className="w-100 m-0 custom-map-info-window-company-name">JobHunt</p>
        <p className="w-100 m-0 custom-map-info-window-location">California</p>
      </div>
    </Card>
  );
};
class CustomCompanyMap extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    data: [],
    info: '',
  };
  // componentDidMount(){
  // 	if(this.props.markers !== null && this.props.markers !== undefined){
  // 		this.setState({
  // 			data: this.props.markers
  // 		})
  // 	}

  // 	// if(this.props.renderfrom === "company"){
  // 	// 	console.log(this.props.markers)
  // 	// }
  // 	// else if(this.props.renderfrom === "jobs"){

  // 	// }
  // }
  onMarkerClick(props, marker, e, val) {
    console.log('marker props:', props, marker, e, val);
    if (this.props.renderfrom === 'company') {
      console.log(this.props.markers);
    } else if (this.props.renderfrom === 'jobs') {
      const info = <JobWindow data={val} />;
      this.setState({
        info: info,
      });
    }
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
  onInfoWindowClose = (props, marker) => {
    console.log('hello');
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });
  };
  render() {
    // console.log(this.props.markers)
    const markers = this.props.markers;
    return (
      <>
        <div className="row m-0">
          <Map
            google={this.props.google}
            style={{ width: '100%', height: 'auto' }}
            zoom={4}
            draggable={true}
            className="cutom-map-for-header"
            initialCenter={{
              lat: 28.457523,
              lng: 77.026344,
            }}
            center={{
              lat: 28.457523,
              lng: 77.026344,
            }}
          >
            {/*<Marker
					onClick={this.onMarkerClick}
					name={'Current location'}
					title="Location"
					id={1}
					position={
						{
				            lat: 28.457523,
				            lng: 77.026344
				        }
					}
					>
				
					
				</Marker>*/}

            {this.props.renderfrom === 'company'
              ? markers.map((val, index) => (
                  <Marker
                    onMouseover={(props, marker, e) =>
                      this.onMarkerClick(props, marker, e, val)
                    }
                    position={{
                      lat: val.contact_info ? val.contact_info.latitude : '',
                      lng: val.contact_info ? val.contact_info.longitude : '',
                    }}
                    icon={{
                      url: '/marker_pro.png',
                    }}
                    name={'Current location'}
                  ></Marker>
                ))
              : markers.map((val, index) => (
                  <Marker
                    onMouseover={(props, marker, e) =>
                      this.onMarkerClick(props, marker, e, val)
                    }
                    position={{
                      lat: val.companyDetail[0].contact_info
                        ? val.companyDetail[0].contact_info.latitude
                        : '',
                      lng: val.companyDetail[0].contact_info
                        ? val.companyDetail[0].contact_info.longitude
                        : '',
                    }}
                    icon={{
                      url: '/marker_pro.png',
                    }}
                    name={'Current location'}
                  >
                    {console.log(
                      val.companyDetail[0].contact_info
                        ? val.companyDetail[0].contact_info.latitude
                        : '',
                      '===',
                      val.companyDetail[0].contact_info
                        ? val.companyDetail[0].contact_info.longitude
                        : ''
                    )}
                  </Marker>
                ))}
            <InfoWindow
              onClick={this.onInfoWindowClose}
              position={this.state.selectedPlace.position}
              visible={this.state.showingInfoWindow}
            >
              {this.props.renderfrom === 'company' ? (
                <CompanyWindow data={'company'} />
              ) : null}
              {this.props.renderfrom === 'jobs' ? <>{this.state.info}</> : null}
            </InfoWindow>
          </Map>
        </div>
      </>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDvpdEoXdYswmmdyGd_Xm5co_-fo5Lmaxs',
})(CustomCompanyMap);
// export default CandidatureContact;
