import React , { Component } from 'react';
import { Formik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
let formButton = null;



let initialValues = {
	"tag":"",
	"link":""
}
class SocialModal extends Component{
	constructor(){
		super();
		this.state = {
			formIsValid:false,
			fields: {},
		}
	}
	dataChange = () =>{
		formButton.click()
		this.props.onHide()
	}

	render(){
		// console.log(this.props.title)
		return(
			<>
				<Modal {...this.props} animation={false} aria-labelledby="contained-modal-title-vcenter">
			      	<div className="modal-header">
				      	<div className="modal-title h4" id="contained-modal-title-vcenter">
				      		Add link
				      	</div>
				      	<button type="button" onClick={this.props.onHide} className="close">
				      		<span aria-hidden="true"><img src={"./cancel-circle.png"} alt="cancel" /></span>

				      		<span className="sr-only">Close</span>
				      	</button>
			    	</div>
					<Modal.Body className="show-grid">
						<Formik initialValues={initialValues} 
			                onSubmit={(values, { setSubmitting }) => {
					            setTimeout(() => {
					              setSubmitting(false);
					              this.props.setdata(values);
					            }, 500);
					          }}>
			                    {(formikProps) => {
			                        const {
			                            values,
			                            errors,
			                            handleChange,
			                            handleSubmit,
			                            handleBlur,
			                            touched,
			                        } = formikProps;
			                    return (
						<form onSubmit={formikProps.handleSubmit}>
							<div className="row custom-row">
								<div className="form-group w-100 m-0">
									<label className="input_label_profile" htmlFor="inputOldPassword">Domain</label>
									<input className="input-font form-control border profile-form-control" 
									type="text"
									name="tag"
									onChange={handleChange}   />
								</div>
							</div>
							<div className="row custom-row">
								<div className="form-group w-100 m-0">
									<label className="input_label_profile" htmlFor="inputPassword">Link</label>
									<input className="input-font form-control border profile-form-control" 
									type="text"
									name="link"
									onChange={handleChange}/>
								</div>
							</div>
							<button style={{opacity:0}} 
							type={"submit"} ref={(e) => { formButton = e }} >
							</button>
						</form>
						);
					    }}
			        	</Formik>
					</Modal.Body>
					<Modal.Footer>
						<button type="button" onClick={this.dataChange} 
							className="btn btn-dark bold-family btn-save-font cursor">
							Add link
						</button>
					</Modal.Footer>
			    </Modal>
		    
        	</>
			)
	}
}
export default SocialModal;			