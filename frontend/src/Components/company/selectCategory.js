import React, { Component, useEffect, useState } from 'react';
import APIManager from '../../APIManager';
import { Row, Col, Input, Pagination, Select } from 'antd';
const { Option } = Select;
export default function SelectCategory(props){
  const[cateOptions,setcatOptions] = useState([]);
  const [search,setsearch] = useState(true);

  useEffect(()=>{
    const search = ""
    categoryList(1,search);
  },[props])

  // const handleCategoryChange = (value) =>{
  // 	// console.log(value)
  // 	props.handleCompanyChange(value)
  // }
  const handleCategorySearch = (value) =>{
    categoryList(1,value)
    console.log(value)
  }
  
  const categoryList = (pageNumber=1,search) =>{
      let options = [];
      APIManager.allServiceCategories(pageNumber,search.toLowerCase())
      .then(
        (resp) =>{
          // console.log(resp)
          resp.data.data.map((data) => {
            // console.log(data)
            options.push({
              label: data ? data.categoryName : '',
              value: data ? data._id : '',
              key: data._id,
            });
          })
        // console.log(options)<Option key={data._id} value={data.comp_info.comp_name}>{data.comp_info ? data.comp_info.comp_name : ""}</Option>
        // this.setState({compOptions:options})
        setcatOptions(options)
        })
      .catch((err) =>
        console.log(err)
      );
   }
   {console.log(cateOptions)}
  return(

  		<Select
          mode="multiple"
          placeholder="Category"
          name={props.name}
          filterOption={false}
          style={{ float: 'right' }}
          onSearch={handleCategorySearch}
          className="input-label-field-custom-select-type-2"
          options={cateOptions}
        >
        </Select>
  	)
}