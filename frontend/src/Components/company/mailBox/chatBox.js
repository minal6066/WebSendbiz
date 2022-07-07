import React, { useState, useEffect, useRef } from 'react';
import userDefaultPic from '../../asset/user.svg';
import pin from '../../asset/pin.svg';
import './style.scss';
import sendButton from '../../asset/send.svg';
import option from '../../asset/options.svg';
import APIManager from '../../../APIManager/index';
import { message, Spin } from 'antd';
import { connect } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const ChatBox = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.chatuser) {
      sethasmore(true);
      var ls = require('local-storage');
      const id = ls.get("channelId");
      APIManager.listChat(id, "1")
        .then((resp) => {
          if (resp.status === 200) {
            setisLoading(false);
            setData([...resp.data.data]);
            setTotal(resp.data.totalCount);
            setCurrentPage(resp.data.currentPage);
            setLoadmorebtn(resp.data.hasMore);
          }
          console.log(resp, 'more messages loaded!');
        })
        .catch((err) => {
          setisLoading(false);
          message.error('Something went wrong......');
        });
    }
  }, [props.chatuser]);
  const [total, setTotal] = useState('');
  const [current_page, setCurrentPage] = useState('');
  const [sendbtn, setSendbtn] = useState(false);
  const [messgaeInput, setMessageInput] = useState('');
  const [hasmore, sethasmore] = useState(false);
  const [loadmorebtn, setLoadmorebtn] = useState(true);
  const [testData, setTestData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const receiverId = props.otherChats
    ? (props.chatuser.company ? props.chatuser.company.compId : "" || props.chatuser.subUser ? props.chatuser.subUser.compId : "" || props.chatuser.candidate ? props.chatuser.candidate.compId : "")
    : props.user.userId._id;
  const userType = props.chatuser.company && '2' || props.chatuser.subUser && "3" || props.chatuser.candidate && "1";
  const listMessages = () => {
    if (props.chatuser) {
      sethasmore(true);
      var ls = require('local-storage');
      const id = ls.get("channelId");
      APIManager.listChat(id, "1")
        .then((resp) => {
          if (resp.status === 200) {
            setisLoading(false);
            setData([...resp.data.data]);
            setTotal(resp.data.totalCount);
            setCurrentPage(resp.data.currentPage);
            setLoadmorebtn(resp.data.hasMore);
          }
          console.log(resp, 'more messages loaded!');
        })
        .catch((err) => {
          setisLoading(false);
          message.error('Something went wrong......');
        });
    }
  };
  // const checkChannelExist = (data) => {
  //   console.log(data, ';;;;');
  //   const id = data.company.compId;
  //   setLoading(true);
  //   APIManager.checkChannel(id)
  //     .then((resp) => {
  //       console.log(resp, 'resonse of channel');
  //       if (resp.data.isSuccess) {
  //         setLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       message.error('Something went wrong.');
  //     });
  // };
  const listMoreMessages = async (page) => {
    sethasmore(true);
    var ls = require('local-storage');
    const id = ls.get("channelId");
    // const id =
    //   props.chatHistory && props.chatHistory.data.map((data) => data.id);
    // const id=props.chatuser.company.compId;
    setisLoading(true);
    await APIManager.listChat(id, page)
      .then((resp) => {
        if (resp.status === 200) {
          setisLoading(false);
          setData((prevState) => [...prevState, ...resp.data.data]);
          setTotal(resp.data.totalCount);
          setCurrentPage(resp.data.currentPage);
          setLoadmorebtn(resp.data.hasMore);
        }
        console.log(resp, 'more messages loaded!');
      })
      .catch((err) => {
        setisLoading(false);
        message.error('Something went wrong.....');
      });
  };

  const senderId = props.userInfo ? props.userInfo.data.user._id : '';
  const refreshPage = () => {
    APIManager.checkChannel(receiverId);
  };
  const name = props.otherChats
    ? (props.chatuser.company ? props.chatuser.company.compName : "" || props.chatuser.subUser ? props.chatuser.subUser.firstname : "" || props.chatuser.candidate ? props.chatuser.candidate.firstname : "")
    : (props.user.userType === 1
      ? props.user.userId.candidateData.can_detail.firstName
      : '') ||
    (props.user.userType === 2
      ? props.user.userId.companyData.comp_info.comp_name
      : '') ||
    (props.user.userType === 3
      ? props.user.userId.subUserData.first_name
      : '')

  //handle change in message input
  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };
  //handle submission of message
  const handleSubmit = (e) => {
    e.preventDefault();
    const param = {
      receiverId: receiverId,
      recieverType: userType,
      messages: [
        {
          text: messgaeInput,
        },
      ],
    };
    console.log(param, 'param');
    if (messgaeInput) {
      var ls = require('local-storage');
      const id = ls.get("channelId");
      APIManager.createMessage(param)
        .then((resp) => {
          console.log(resp);
          if (resp.data.isSuccess) {
            listMessages();
            refreshPage();
            setMessageInput('');
          }
        })
        .catch((error) => message.error('Something went wrong!'));
    }
  };
  const currentChat = props.chatHistory
    ? props.chatHistory.data.map((data) => data.messages)
    : '';
  console.log(props, 'props--------------');
  return (
    <>
      <div className={'chat-box-container'}>
        <div className={'chat-box-header p-3 border-bottom'}>
          <div className={'user-pic-container'}>
            <img
              src={userDefaultPic}
              alt={'user-image'}
              className={'user-pic'}
            />
          </div>
          <div className={'w-100 ml-2'}>
            <span className={'user-name'}>{name ? name : ''}</span>
          </div>
          <div className={'d-flex flex-shrink-0 time-style'}>
            <img src={option} className={'option-btn'} />
          </div>
        </div>

        <div className={'msg-container'}>
          {props.isloading || isLoading ? (
            <div className={'d-flex justify-content-center'}>
              <Spin />{' '}
            </div>
          ) : (
            ''
          )}
          {loadmorebtn || currentChat.length >= 1 ? (
            // <button onClick={() => listMoreMessages(current_page + 1)}>
            //   OK
            // </button>
            <div className={'d-flex justify-content-center'}>
              <PlusCircleOutlined
                onClick={() => listMoreMessages(current_page + 1)}
              />
            </div>
          ) : (
            ''
          )}
          {hasmore
            ? data &&
            data
              .slice(0)
              .reverse()
              .map((data) => (
                <>
                  {!data.user_id.includes(senderId) ? (
                    <div className={'msg-style-user m-2'}>{data.text}</div>
                  ) : (
                    <div>
                      <div className={'msg-style-self m-2'}>{data.text}</div>
                    </div>
                  )}
                </>
              ))
            : currentChat.length !== 0 &&
            currentChat[0].map((data) => (
              <>
                {!data.user_id.includes(senderId) ? (
                  <div className={'m-2'}>
                    <div className={'d-flex justify-content-start` time-stamp'}>
                      {moment(data.created_ts).fromNow()}
                    </div>
                    <div className={'msg-style-user m-2'}>{data.text}</div>
                  </div>
                ) : (
                  <div className={'m-2'}>
                    <div className={'d-flex justify-content-end time-stamp'}>
                      {moment(data.created_ts).fromNow()}
                    </div>
                    <div className={'msg-style-self'}>
                      {data.text}
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={'msg-creater-container '}>
            <div className={'w-100 mr-2'}>
              <textarea
                className={'msg-creater-area'}
                placeholder={'Type a message here'}
                value={messgaeInput}
                onChange={handleChange}
              />
            </div>
            <div className={'d-flex flex-shrink-0 mr-2'}>
              <img src={pin} className={'attach-btn'} />
            </div>
            <div>
              <button type={'submit'} className={'send-btn-container'}>
                <img src={sendButton} className={'send-btn'} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    chatHistory: state.checkChannelReducer.chatHistory,
    isloading: state.checkChannelReducer.isloading,
    messages: state.messagesReducer.messages,
    userInfo: state.AuthReducer.user,
  };
};
export default connect(mapStateToProps)(ChatBox);
