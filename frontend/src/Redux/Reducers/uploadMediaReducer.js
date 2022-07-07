import {mediaActionTypes} from '../Actions/uploadMediaAction';

const defaultState = {
	data:null,
	back_status:null,
	first_status:null,
	second_status:null,
	third_status:null,
	fourth_status:null,
	fifth_status:null,
	uploaded: false
}

const uploadMediaReducer = (state = {...defaultState}, action) =>{
	switch (action.type) {
		case mediaActionTypes.UPLOAD_FILE:
			return {
				...state,
				data: action.data,
			}
		case mediaActionTypes.BACK_UPLOAD_FILE:
			return{
				...state,
				back_status: action.back_status,
			}
		case mediaActionTypes.FIRST_UPLOAD_STATUS:
			return {
				...state,
				first_status: action.first_status
			}
		case mediaActionTypes.SECOND_UPLOAD_STATUS:
			return {
				...state,
				second_status: action.second_status
			}
		case mediaActionTypes.THIRD_UPLOAD_STATUS:
			return {
				...state,
				third_status: action.third_status
			}
		case mediaActionTypes.FOURTH_UPLOAD_STATUS:
			return {
				...state,
				fourth_status: action.fourth_status
			}
		case mediaActionTypes.FIFTH_UPLOAD_STATUS:
			return {
				...state,
				fifth_status: action.fifth_status
			}
		default:
			return { ...state };
	}
}
export default uploadMediaReducer;