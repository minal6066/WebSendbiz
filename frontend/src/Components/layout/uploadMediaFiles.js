import  {React, useState} from 'react';
import {Upload, message } from 'antd';
import APIManager from "../../APIManager/index";
import HELPERS from '../../APIManager/helper'
import { dispatchAction } from '../../Redux/Store/index';
import {uploadMedia} from '../../Redux/Actions/uploadMediaAction'

const UploadMediaFiles = (props) =>{
	const [allImages, setAllImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fileName, setFileName] = useState('');
	const [uploadUrl, setUploadUrl] = useState('');
	const [uploadflags, setuploadflags] = useState({
		first_flag:false,
		second_flag:false,
		third_flag:false,
		fourth_flag:false,
		fifth_flag:false,
	})

	const onChange = ( info) =>{
		if(info.file.status === "uploading"){
			setLoading(true);
		}
		if(info.file.status === "error"){
			let file_list = info.file.originFileObj;

			let newImages = allImages
			newImages.push(file_list);
			console.log("before setstate:", newImages);
			setLoading(false);
			setAllImages(newImages);
			props.getAllImages(allImages)
			if(allImages.length === 1){
				console.log(allImages.length,"1")
				getFirstPreSignedUrl(file_list)
				uploadflags.first_flag = true
				setuploadflags(uploadflags)
				dispatchAction(uploadMedia(uploadflags))
			}
			else if(allImages.length === 2){
				console.log(allImages.length,"2")
				// getSecondPreSignedUrl(file_list)
				uploadflags.second_flag = true
				setuploadflags(uploadflags)
				dispatchAction(uploadMedia(uploadflags))
			}
			else if(allImages.length === 3){
				console.log(allImages.length,"3")
				// getThirdPreSignedUrl(file_list)
				uploadflags.third_flag = true
				setuploadflags(uploadflags)
				dispatchAction(uploadMedia(uploadflags))
			}
			else if(allImages.length === 4){
				console.log(allImages.length,"4")
				// getFourthPreSignedUrl(file_list)
				uploadflags.fourth_flag = true
				setuploadflags(uploadflags)
				dispatchAction(uploadMedia(uploadflags))
			}
			else if(allImages.length === 5){
				console.log(allImages.length,"5")
				// getFifthPreSignedUrl(file_list)
				uploadflags.fifth_flag = true
				setuploadflags(uploadflags)
				dispatchAction(uploadMedia(uploadflags))
			}
			// getFirstPreSignedUrl(file_list)
		}

		
		
	}
// ====================get presigned urls for all images or videos================
	const getFirstPreSignedUrl = (file) =>{
		const image_type = file.img_type
		const uploadParams = {
			files: [
				{
					requestType: 'CompanyMedia',
					contentType: image_type,
				},
			],
		};

		APIManager.preSignedUrl(uploadParams).then((resp) => {
			console.log(resp, 'pppppppppppp');
			if (resp.status === 200) {
				resp.data.forEach((data) => {

					setFileName(data.fileName);
					setUploadUrl(data.url);
					
				});
				HELPERS.uploadFirstFile(file,resp.data[0].url);
			}
		});
	}
	const getSecondPreSignedUrl = (file) =>{
		const image_type = file.img_type
		const uploadParams = {
			files: [
				{
					requestType: 'CompanyMedia',
					contentType: image_type,
				},
			],
		};

		APIManager.preSignedUrl(uploadParams).then((resp) => {
			console.log(resp, 'pppppppppppp');
			if (resp.status === 200) {
				resp.data.forEach((data) => {

					setFileName(data.fileName);
					setUploadUrl(data.url);
					
				});
				HELPERS.uploadSecondFile(file,uploadUrl);
			}
		});
	}
	const getThirdPreSignedUrl = (file) =>{
		const image_type = file.img_type
		const uploadParams = {
			files: [
				{
					requestType: 'CompanyMedia',
					contentType: image_type,
				},
			],
		};

		APIManager.preSignedUrl(uploadParams).then((resp) => {
			console.log(resp, 'pppppppppppp');
			if (resp.status === 200) {
				resp.data.forEach((data) => {

					setFileName(data.fileName);
					setUploadUrl(data.url);
					
				});
				HELPERS.uploadThirdFile(file,uploadUrl);
			}
		});
	}
	const getFourthPreSignedUrl = (file) =>{
		const image_type = file.img_type
		const uploadParams = {
			files: [
				{
					requestType: 'CompanyMedia',
					contentType: image_type,
				},
			],
		};

		APIManager.preSignedUrl(uploadParams).then((resp) => {
			console.log(resp, 'pppppppppppp');
			if (resp.status === 200) {
				resp.data.forEach((data) => {

					setFileName(data.fileName);
					setUploadUrl(data.url);
					
				});
				HELPERS.uploadFourthFile(file,uploadUrl);
			}
		});
	}
	const getFifthPreSignedUrl = (file) =>{
		const image_type = file.img_type
		const uploadParams = {
			files: [
				{
					requestType: 'CompanyMedia',
					contentType: image_type,
				},
			],
		};

		APIManager.preSignedUrl(uploadParams).then((resp) => {
			console.log(resp, 'pppppppppppp');
			if (resp.status === 200) {
				resp.data.forEach((data) => {

					setFileName(data.fileName);
					setUploadUrl(data.url);
					
				});
				HELPERS.uploadFifthFile(file,uploadUrl);
			}
		});
	}
// ====================end get presigned urls for all images or videos================
	

	

  	const beforeUpload =(file)=> {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	}

	return(
		<Upload
	        name="avatar"
	        listType="picture-card"
	        multiple
	        className="avatar-uploader"
	        showUploadList={false}
	        beforeUpload={beforeUpload}
	        onChange={onChange}
	      >
	        <img src={process.env.PUBLIC_URL + "/upload.svg"} />
	      </Upload>
	)
}
export default UploadMediaFiles;
