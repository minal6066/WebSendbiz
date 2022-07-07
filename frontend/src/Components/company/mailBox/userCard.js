import React, { useEffect, useState } from 'react';
import './style.scss';
import userDefaultPic from '../../asset/user.svg';
import { fileUrl } from '../../../Shared/imageUrlPath';
import APIManager from '../../../APIManager/index';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import moment from 'moment';

const UserCard = (props) => {
  useEffect(() => {
    APIManager.listChannnel().then((resp) =>
      console.log(resp, 'respone from list channel')
    );
  }, []);
  const [isLoading, setLoading] = useState(false);
  //check channel if exists or not
  const checkChannelExist = (data) => {
    console.log(data, ';;;;');
    const id = data.company ? data.company.compId : "" || data.subUser ? data.subUser.compId : "" || data.candidate ? data.candidate.compId : "";
    setLoading(true);
    APIManager.checkChannel(id)
      .then((resp) => {
        console.log(resp, 'resonse of channel');
        if (resp.data.isSuccess) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error('Something went wrong..');
      });
  };
  const turncateMessage = (str) => {
    return str.length >= 55 ? str.substring(0, 60) + '...' : str;
  };
  const totalChannels = props.channelList ? props.channelList.data : [];
  console.log(props.channelList, 'props');
  return (
    <>
      {isLoading ? (
        <div className={'d-flex justify-content-center'}>
          {' '}
          <Spin />{' '}
        </div>
      ) : (
        ''
      )}
      {totalChannels &&
        totalChannels.map((data) => {
          return (
            <div
              //className={'user-card-container m-2'}
              className={
                data.unseenMessageCount > 0
                  ? 'unseen-msg-card m-2'
                  : 'user-card-container m-2'
              }
              onClick={() => {
                var ls = require('local-storage');
                ls.set('chatUserId', data.company ? data.compId : "" || data.subUser ? data.subUser.compId : "");
                ls.set('channelId', data.id);
                //setuserInfo(data);
                props.getIdfromProps(data);
                checkChannelExist(data);
              }}
            >
              <div className={'mb-4'}>
                <div className={'pic-name-container'}>
                  <div className={'user-pic-container'}>
                    <img
                      src={
                        //image ? fileUrl.fileUrlPath + image :
                        userDefaultPic
                      }
                      alt={'user-image'}
                      className={'user-pic'}
                      alt={'image'}
                    />
                  </div>
                  <div className={'w-100 ml-2'}>
                    <span className={'user-name'}>
                      {data.company ? data.company.compName : "" || data.subUser ? data.subUser.firstname : "" || data.candidate ? data.candidate.firstname : ""}
                    </span>
                  </div>
                  <div className={'d-flex flex-shrink-0 time-style'}>
                    {moment(data.createdAt).fromNow()}
                  </div>
                </div>
              </div>
              <div className={'displayed-msg-container'}>
                <div>
                  <span className={'displayed-msg'}>
                    {/* {data.messages ? turncateMessage(data.messages[0].text) : ''} */}
                    {turncateMessage(data.lastMessage.text)}
                  </span>
                </div>
                {data.unseenMessageCount > 0 && (
                  <div className={'unseen-count'}>
                    {data.unseenMessageCount}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    channelList: state.mailBoxReducer.channelList,
    isloading: state.mailBoxReducer.isloading,
  };
};
export default connect(mapStateToProps)(UserCard);
