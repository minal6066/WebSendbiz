import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
      console.log('props for mapped:', this.props)
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 40.7128, lng: -74.0060 }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDvpdEoXdYswmmdyGd_Xm5co_-fo5Lmaxs',
})(MapContainer);