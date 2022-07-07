import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import HELPERS from '../../APIManager/helper'

const CompanyRoute = ({component: Component, ...rest}) => {
	let isLogin = JSON.parse(localStorage.getItem('token'));
	let user_type = JSON.parse(localStorage.getItem('user_type') || false);
    const user_type2 = JSON.parse(localStorage.getItem('user_type2') || false);
    let type_of_user = HELPERS.isNumber(user_type)
    let type_of_user2 = HELPERS.isNumber(user_type2)
    if(type_of_user === "number" && type_of_user2==="number"){
    	user_type = user_type/(user_type2*99)
    }
    else{
    	localStorage.clear();
    	user_type = 10
    }
	return (
		<Route {...rest} render={props => (
			(user_type == 2 && isLogin) || (user_type == 3 && isLogin) ?
				<Component {...props} />
			: <Redirect to="/login" />
		)} />
	)
}
export default CompanyRoute;