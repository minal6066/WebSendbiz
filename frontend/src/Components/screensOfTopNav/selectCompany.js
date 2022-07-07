import React, { Component, useEffect, useState } from 'react';
import APIManager from '../../APIManager';
import { Row, Col, Input, Pagination, Select } from 'antd';
const { Option } = Select;
export default function SelectCompany(props){
  const[compOptions,setcompOptions] = useState([]);
  const [search,setsearch] = useState(true);

  useEffect(()=>{
    const search = ""
    companyList(1,search);
  },[props])

  const handleCompanyChange = (value) =>{
  	// console.log(value)
  	props.handleCompanyChange(value)
  }
  const handleCompanySearch = (value) =>{
    companyList(1,value)
    console.log(value)
  }
  
  const companyList = (pageNumber=1,search) =>{
      let options = [];
      APIManager.companyListSortAndSearch(pageNumber,search.toLowerCase())
      .then(
        (resp) =>{
          // console.log(resp)
          resp.data.data.map((data) => {
            // console.log(data)
            options.push(
              {
                label: data.comp_info ? data.comp_info.comp_name : "",
                value: data.comp_info ? data._id : "",
                key: data._id
              }
            )
          })
        // console.log(options)<Option key={data._id} value={data.comp_info.comp_name}>{data.comp_info ? data.comp_info.comp_name : ""}</Option>
        // this.setState({compOptions:options})
        setcompOptions(options)
        })
      .catch((err) =>
        console.log(err)
      );
   }
  return(
  		<Select
          maxTagCount= {1}
          mode="multiple"
          placeholder="Company"
          style={{ float: 'right' }}
          onChange={handleCompanyChange}
          onSearch={handleCompanySearch}
          className="s-search-select"
          options={compOptions}
        >
        </Select>
  	)
}