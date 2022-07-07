import React, { Component } from 'react';
import D from '../asset/Group 51.png';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { message } from 'antd';
import APIManager from '../../APIManager/index';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Formik } from 'formik';
import { MapKey } from '../../Shared/imageUrlPath';
let formButton = null;
const { Option } = Select;
class CustomMap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('custom map');
    //var ls = require('local-storage');
    let lat = this.props.lat; //ls.get('lat')
    let lng = this.props.long; //ls.get('long')
    console.log(lat, lng);
    return (
      <>
        <div
          className="form-group m-0"
          style={{ width: '95%', height: '200px' }}
        >
          <label className="input_label_profile" htmlFor="exampleInputBio1">
            Map
          </label>
          <Map
            google={this.props.google}
            style={{ width: '88%', height: '200px' }}
            initialCenter={{
              lat: lat,
              lng: lng,
            }}
            center={{
              lat: lat,
              lng: lng,
            }}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={''}
              icon={{
                url: '/marker_pro.png',
              }}
              position={{ lat: lat, lng: lng }}
            />
            {/*<InfoWindow marker={this.state.activeMarker} 
						visible={this.state.showingInfoWindow}
						onClose={this.onClose}
					>
						<div>
							<h4>{this.state.selectedPlace.name}</h4>
						</div>
					</InfoWindow>*/}
          </Map>
        </div>
      </>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: MapKey.key,
})(CustomMap);
// export default CandidatureContact;
