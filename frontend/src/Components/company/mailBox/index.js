import React, { useState, useEffect } from 'react';
import './style.scss';
import { Input, Select, Button, Spin, message } from 'antd';
import { SearchOutlined, PlusCircleFilled } from '@ant-design/icons';
import UserCard from './userCard';
import ChatBox from './chatBox';
import refresh from '../../asset/refresh.svg';
import { connect } from 'react-redux';
import APIManager from '../../../APIManager/index';
import { configConsumerProps } from 'antd/lib/config-provider';
import { addSubUserOverView } from '../../../Redux/Actions/companyInfoAction';

const { Option } = Select;
const MailBox = (props) => {
  useEffect(() => {
    console.log('chatId');
    APIManager.listChannnel();
  }, []);

  //show user in chatbox
  const [chatBox, showChatBox] = useState(false);
  const [chatuser, setChatUser] = useState('');
  const [otherChats, setOtherChats] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openedotherChats, setopenedotherChats] = useState(false);
  const user = props.location.userInfo;
  console.log(user, 'user');
  console.log(
    props.channelList ? props.channelList : '',
    'ppppppppppppiiiiiiiiii'
  );
  //get id when the user click on the card
  const getIdfromProps = (userInfo) => {
    setChatUser(userInfo);
    setOtherChats(true);
    console.log(userInfo, 'llllllllllll');
    setCurrentId(userInfo.company ? userInfo.compId : "" || userInfo.subUser ? userInfo.subUser.compId : "" || userInfo.candidate ? userInfo.candidate.compId : "");
    var ls = require('local-storage');
    ls.set('chatUserId', currentId);
    setopenedotherChats(!openedotherChats);
  };
  console.log(props.channelList ? props.channelList : 'dddd');
  console.log(props.location.userInfo, 'lll');
  //refresh state for new message
  const refreshPage = () => {
    var ls = require('local-storage');
    const id = ls.get('chatUserId');
    setIsLoading(true);
    APIManager.checkChannel(id)
      .then((resp) => {
        if (resp.data.isSuccess) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        message.error('Something went wrong.');
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && (
        <div className={'d-flex justify-content-center'}>
          <Spin />
        </div>
      )}
      <div className={'mail-box-container'}>
        <label>
          <span className={'mail-box-label'}>Mailbox</span>
        </label>
        <div className={'d-flex'}>
          <div className={'w-100 mr-2'}>
            <div>
              <Input
                size="large"
                className="resume-data-1 company-joblist-input service-input"
                placeholder="Search for users"
                prefix={<SearchOutlined />}
              // onChange={this.handleChange}
              //value={this.state.searchQuery}
              />
            </div>
            <div className={'sort-n-newchat-container'}>
              <div className={'sort-container'}>
                <Select
                  name="permissions"
                  className="sort-select"
                  placeholder="Sort By"
                //  onChange={this.handleSort}
                >
                  <Option value="price.amount">low to high</Option>
                  <Option value="-price.amount">high to low</Option>
                  <Option value="reset">reset</Option>
                </Select>
              </div>
              <div className={'chat-container'} onClick={refreshPage}>
                <span className={'mr-2 plus-btn-container'}>
                  {/* <PlusCircleFilled /> */}
                  <img src={refresh} />
                </span>
                <span className={'new-chat-btn mt-1'}>Refresh</span>
              </div>
            </div>
            <div className={'mt-4'} onClick={() => showChatBox(true)}>
              <UserCard user={user} getIdfromProps={getIdfromProps} />
            </div>
          </div>
          {chatBox || user ? (
            <div className={'w-100'}>
              <ChatBox
                otherChats={otherChats}
                openedotherChats={openedotherChats}
                user={user}
                chatuser={chatuser}
                refreshPage={refreshPage}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    channelList: state.mailBoxReducer.channelList,
    isloading: state.mailBoxReducer.isloading,
  };
};
export default connect(mapStateToProps)(MailBox);
