import React , { Component } from 'react';
import Box from './box.js';
import Footer from '../footer/footer.js';
import axios from 'axios';
import PopupModal from './passwordmodel.js';
import 'antd/dist/antd.css';
import { Tabs,Select,Input,Row,Col } from 'antd';
import { MapKey } from '../../Shared/imageUrlPath'
import { withFormik, Form as FormikForm, Field as FormikField, Formik } from 'formik';
import * as Yup from 'yup';
import { message } from "antd";
import { Map, GoogleApiWrapper,Marker, InfoWindow } from 'google-maps-react';


class GoogleSearch extends Component{
	state = {
		lat:"",
		long:""
	}
	componentDidMount(){
		this.handleCurrentLocation()	
	}
	onchangeLocation =(e)=>{
		this.props.takecurrentLocation(e.target.value)
	}
	handleCurrentLocation(){
		// console.log(value.target.value)
		// var input = this.pac_input.current
		// console.log(this.pac_input.current.value)
		const { google } = this.props;
		const maps = google.maps;
		// var options = {
		// 	types: ['(cities)'],
		// };
		// console.log(this.pac_input.current,document.getElementById('pac_input'))
		var input = document.getElementById('pac_input');//this.pac_input.current;
        var autocomplete = new maps.places.Autocomplete(input);
        // console.log(document.getElementById('pac_input').value)
        autocomplete.getPlace();
        autocomplete.addListener('place_changed', () => {
        	this.setState({
        		lat:autocomplete.getPlace().geometry.location.lat(),
        		long:autocomplete.getPlace().geometry.location.lng()
        	})
        	this.props.takeLatLong(autocomplete.getPlace().geometry.location.lat(),autocomplete.getPlace().geometry.location.lng())
        	// console.log(autocomplete.getPlace().geometry.location.lat())
        })
        
	}
	render(){
		return(
			<>
				<input type="search"
					className={this.props.className} 
					// value={this.state.current_location}
					name="current_location"
					id="pac_input"
					defaultValue={this.props.location}
					// ref={this.pac_input}
					// onChange={this.onchangeLocation}
					onBlur={this.onchangeLocation}
					placeholder="Enter Current location"/>
			</>
			)
	}
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDvpdEoXdYswmmdyGd_Xm5co_-fo5Lmaxs'
})(GoogleSearch);
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCq_buWKq5SczlpLmaxxpgQD7zZTNGGXL4'
// })(GoogleSearch);