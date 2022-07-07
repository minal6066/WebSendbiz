const mongoose = require('mongoose');
const CatchAsync = require('../utils/catchAsync');
const MailboxChannel = require('../models/mailboxChannel');
const Encryption = require('../utils/encryption');
const AppError = require('../utils/appError');
const Company = require('../models/company');
const SubUser = require('../models/sub_user');
const User = require('../models/user');
const Candidate = require('../models/candidate');

const createMessages = CatchAsync(async (req, res, next) => {
  // Check if subUser
  if (req.decodedData.user_type === 3) {
    const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
    req.decodedData.id = subUser.comp_id;
    req.decodedData.user_type = 2;
  }
  // check if channel exist for the users
  let channelExist = await MailboxChannel.findOne({
    $or: [
      {
        $and: [
          { 'member1.user_id': mongoose.Types.ObjectId(req.body.receiverId) },
          { 'member2.user_id': mongoose.Types.ObjectId(req.decodedData.id) },
        ],
      },
      {
        $and: [
          { 'member1.user_id': mongoose.Types.ObjectId(req.decodedData.id) },
          { 'member2.user_id': mongoose.Types.ObjectId(req.body.receiverId) },
        ],
      },
    ],
  });

  let lastMessageText;
  let lastMessageType;
  if (req.body.messages[0].attachments) {
    lastMessageText =
      typeof req.body.messages !== 'undefined' ? req.body.messages[0].text : '';
    lastMessageType =
      typeof req.body.messages[0].attachments !== 'undefined'
        ? req.body.messages[0].attachments[0].type
        : undefined;
  } else {
    lastMessageText =
      typeof req.body.messages !== 'undefined'
        ? req.body.messages[0].text
        : undefined;
    lastMessageType = 'TEXT';
  }

  if (channelExist === null) {
    // only company and sub-user can initiate message
    if (req.decodedData.user_type === 1) {
      return next(new AppError('Candidate cannot initiate a chat', 403));
    }
    let companyId;

    if (req.decodedData.user_type === 2) {
      companyId = req.decodedData.id;
    }

    if (req.decodedData.id === 3) {
      const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
      companyId = subUser.comp_id;
    }
    // fetch company
    // const company = await Company.findOne({ comp_id: subUser.comp_id });
    let member1Data;
    let member2Data;
    const member1UserDetails = await User.findById(req.decodedData.id);
    if (member1UserDetails) {
      if (member1UserDetails.user_type === 1) {
        // candidate
        const candidate = await Candidate.findOne({
          can_id: req.decodedData.id,
        });
        member1Data = {
          firstname: candidate.can_detail.firstName,
          lastname: candidate.can_detail.lastName,
        };
      } else if (member1UserDetails.user_type === 2) {
        // company
        const company = await Company.findOne({ comp_id: req.decodedData.id });
        member1Data = { firstname: company.comp_info.comp_name };
      } else if (member1UserDetails.user_type === 3) {
        // sub-user
        const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
        member1Data = {
          firstname: subUser.first_name,
          lastname: subUser.last_name,
        };
      }
    } else {
      return next(new AppError('Invalid User', 403));
    }

    const member2UserDetails = await User.findById(req.body.receiverId);
    if (member2UserDetails) {
      if (member2UserDetails.user_type === 1) {
        // candidate
        const candidate = await Candidate.findOne({
          can_id: req.body.receiverId,
        });
        member2Data = {
          firstname: candidate.can_detail.firstName,
          lastname: candidate.can_detail.lastName,
        };
      } else if (member2UserDetails.user_type === 2) {
        // company
        const company = await Company.findOne({ comp_id: req.body.receiverId });
        member2Data = { firstname: company.comp_info.comp_name };
      } else if (member2UserDetails.user_type === 3) {
        // sub-user
        const subUser = await SubUser.findOne({ user_id: req.body.receiverId });
        member2Data = {
          firstname: subUser.first_name,
          lastname: subUser.last_name,
        };
      }
    } else {
      return next(new AppError('Invalid User', 403));
    }

    // create channel and add message with it
    const addChannel = {
      comp_id: companyId,
      member1: {
        // one who initiates the chat
        user_id: mongoose.Types.ObjectId(req.decodedData.id),
        firstname: member1Data.firstname,
        lastname: member1Data.lastname,
        unseen_message_count: 0,
        chat_deleted: false,
      },
      member2: {
        // receiver
        user_id: mongoose.Types.ObjectId(req.body.receiverId),
        firstname: member2Data.firstname,
        lastname: member2Data.lastname,
        unseen_message_count: 1,
        chat_deleted: false,
      },
      type:
        typeof req.body.recieverType !== 'undefined'
          ? req.body.recieverType
          : undefined,
      last_message: {
        text: Encryption.encryptData(lastMessageText),
        type: lastMessageType,
      },
      messages:
        typeof req.body.messages !== 'undefined'
          ? req.body.messages.map((message) => ({
            text:
              typeof message.text !== 'undefined'
                ? Encryption.encryptData(message.text)
                : undefined,
            attachments:
              typeof message.attachments !== 'undefined'
                ? message.attachments.map((attachments) => ({
                  key:
                    typeof attachments.key !== 'undefined'
                      ? attachments.key
                      : undefined,
                  type:
                    typeof attachments.type !== 'undefined'
                      ? attachments.type
                      : undefined,
                }))
                : [],
            user_id:
              typeof req.decodedData.id !== 'undefined'
                ? mongoose.Types.ObjectId(req.decodedData.id)
                : undefined,
          }))
          : [],
    };

    channelExist = await MailboxChannel.create(addChannel);
  } else {
    // add messages if the channel already exist
    if (channelExist.is_active) {
      const AddMessage =
        typeof req.body.messages !== 'undefined'
          ? req.body.messages.map((message) => ({
            text:
              typeof message.text !== 'undefined'
                ? Encryption.encryptData(message.text)
                : undefined,
            attachments:
              typeof message.attachments !== 'undefined'
                ? message.attachments.map((attachments) => ({
                  key:
                    typeof attachments.key !== 'undefined'
                      ? attachments.key
                      : undefined,
                  type:
                    typeof attachments.type !== 'undefined'
                      ? attachments.type
                      : undefined,
                }))
                : [],
            user_id:
              typeof req.decodedData.id !== 'undefined'
                ? mongoose.Types.ObjectId(req.decodedData.id)
                : undefined,
          }))
          : [];

      const dynamicQuery = {};
      if (
        channelExist.member1.user_id.toString() !==
        req.decodedData.id.toString()
      ) {
        Object.assign(dynamicQuery, { 'member1.unseen_message_count': 1 });
      } else {
        Object.assign(dynamicQuery, { 'member2.unseen_message_count': 1 });
      }

      await MailboxChannel.findByIdAndUpdate(channelExist._id, {
        $set: {
          last_message: {
            text: Encryption.encryptData(lastMessageText),
            type: lastMessageType,
          },
        },
        $inc: dynamicQuery,
        $push: {
          messages: AddMessage,
        },
      });
    } else {
      // activate the channel,if inactive and add a message
      const AddMessage =
        typeof req.body.messages !== 'undefined'
          ? req.body.messages.map((message) => ({
            text:
              typeof message.text !== 'undefined'
                ? Encryption.encryptData(message.text)
                : undefined,
            attachments:
              typeof message.attachments !== 'undefined'
                ? message.attachments.map((attachments) => ({
                  key:
                    typeof attachments.key !== 'undefined'
                      ? attachments.key
                      : undefined,
                  type:
                    typeof attachments.type !== 'undefined'
                      ? attachments.type
                      : undefined,
                }))
                : [],
            user_id:
              typeof req.decodedData.id !== 'undefined'
                ? mongoose.Types.ObjectId(req.decodedData.id)
                : undefined,
          }))
          : [];

      const dynamicQuery = {};
      if (
        channelExist.member1.user_id.toString() !==
        req.decodedData.id.toString()
      ) {
        Object.assign(dynamicQuery, { 'member1.unseen_message_count': 1 });
      } else {
        Object.assign(dynamicQuery, { 'member2.unseen_message_count': 1 });
      }

      await MailboxChannel.findByIdAndUpdate(channelExist._id, {
        $set: {
          is_active: true,
          last_message: {
            text: Encryption.encryptData(lastMessageText),
            type: lastMessageType,
          },
        },
        $inc: dynamicQuery,
        $push: {
          messages: AddMessage,
        },
      });
    }
  }
  return res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'Created',
    data: { _id: channelExist._id },
  });
});

const listChannels = CatchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const populate = [];
  let company;

  if (req.decodedData.user_type === 3) {
    const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
    req.decodedData.id = subUser.comp_id;
    req.decodedData.user_type = 2;
  }

  const query = {
    $and: [
      {
        $or: [
          {
            'member1.user_id': mongoose.Types.ObjectId(req.decodedData.id),
          },
          {
            'member2.user_id': mongoose.Types.ObjectId(req.decodedData.id),
          },
        ],
      },
      { is_active: true },
    ],
  };

  if (req.decodedData.user_type === 2) {
    // company
    // const candidate = await Candidate.findOne({can_id: req.decodedData.id});
    company = await Company.findOne({ comp_id: req.decodedData.id });
    query.$and[0].$or.push(
      { comp_id: company.comp_id },
      { 'member1.user_id': mongoose.Types.ObjectId(company.comp_id) },
      { 'member2.user_id': mongoose.Types.ObjectId(company.comp_id) }
    );

    populate.push(
      { path: 'SenderCompany', select: 'comp_id comp_info.comp_name logo' },
      { path: 'ReceiverCompany', select: 'comp_id comp_info.comp_name logo' },
      {
        path: 'Candidate',
        select:
          'can_id can_detail.profile can_detail.firstName can_detail.lastName',
      },
      {
        path: 'SenderSubuser',
        select: 'user_id first_name last_name, user_image comp_id',
      },
      {
        path: 'ReceiverSubuser',
        select: 'user_id first_name last_name, user_image comp_id',
      }
    );
  }

  if (req.decodedData.user_type === 3) {
    // sub-user
    const candidate = await SubUser.findOne({ user_id: req.decodedData.id });
    company = await Company.findOne({ comp_id: candidate.comp_id });
    query.$and[0].$or.push(
      { comp_id: company.comp_id },
      { 'member1.user_id': mongoose.Types.ObjectId(company.comp_id) },
      { 'member2.user_id': mongoose.Types.ObjectId(company.comp_id) }
    );

    populate.push(
      { path: 'SenderCompany', select: 'comp_id comp_info.comp_name logo' },
      { path: 'ReceiverCompany', select: 'comp_id comp_info.comp_name logo' },
      {
        path: 'Candidate',
        select:
          'can_id can_detail.profile can_detail.firstName can_detail.lastName',
      },
      {
        path: 'SenderSubuser',
        select: 'user_id first_name last_name, user_image comp_id',
      },
      {
        path: 'ReceiverSubuser',
        select: 'user_id first_name last_name, user_image comp_id',
      }
    );
  }

  if (req.decodedData.user_type === 1) {
    // candidate
    populate.push({
      path: 'SenderCompany',
      select: 'comp_id comp_info.comp_name logo',
    });
    populate.push(
      { path: 'Company', select: 'comp_id comp_info.comp_name logo' },
      {
        path: 'SenderSubuser',
        select: 'user_id first_name last_name, user_image comp_id',
      },
      {
        path: 'ReceiverSubuser',
        select: 'user_id first_name last_name, user_image comp_id',
      }
    );
  }
  if (req.query.search) {
    query.$and.push({
      $or: [
        { 'member1.firstname': new RegExp(req.query.search, 'i') },
        { 'member1.lastname': new RegExp(req.query.search, 'i') },
        { 'member2.firstname': new RegExp(req.query.search, 'i') },
        { 'member2.lastname': new RegExp(req.query.search, 'i') },
      ],
    });
  }
  console.log(populate);
  // fetch list of channels
  const channels = JSON.parse(
    JSON.stringify(
      await MailboxChannel.find(query, { messages: { $slice: -10 } })
        .populate(populate)
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit)
    )
  );
  console.log(channels);
  const documentCount = await MailboxChannel.countDocuments(query);
  const channelList = [];
  for (let i = 0; i < channels.length; i++) {
    channels[i].last_message.text = Encryption.decryptData(
      channels[i].last_message.text
    );
    if (
      channels[i].member1.user_id.toString() === req.decodedData.id.toString()
    ) {
      channels[i].user_id = channels[i].member1.user_id;
      channels[i].unseen_message_count =
        channels[i].member1.unseen_message_count;
      channels[i].member2 = undefined;
      channels[i].member1 = undefined;
    } else {
      channels[i].user_id = channels[i].member2.user_id;
      channels[i].unseen_message_count =
        channels[i].member2.unseen_message_count;
      channels[i].member1 = undefined;
      channels[i].member2 = undefined;
    }
    for (let j = 0; j < channels[i].messages.length; j++) {
      channels[i].messages[j].text = Encryption.decryptData(
        channels[i].messages[j].text
      );
    }

    if (channels[i].SenderCompany) {
      if (
        channels[i].SenderCompany.comp_id.toString() !==
        req.decodedData.id.toString()
      ) {
        channels[i].company = {
          compName: channels[i].SenderCompany.comp_info.comp_name,
          logo: channels[i].SenderCompany.logo,
          compId: channels[i].SenderCompany.comp_id,
        };
      }
    }
    if (channels[i].ReceiverCompany) {
      if (
        channels[i].ReceiverCompany.comp_id.toString() !==
        req.decodedData.id.toString()
      ) {
        channels[i].company = {
          compName: channels[i].ReceiverCompany.comp_info.comp_name,
          logo: channels[i].ReceiverCompany.logo,
          compId: channels[i].ReceiverCompany.comp_id,
        };
      }
    }
    if (channels[i].Candidate) {
      if (
        channels[i].Candidate.can_id.toString() !==
        req.decodedData.id.toString()
      ) {
        channels[i].candidate = {
          firstname: channels[i].Candidate.can_detail.firstName,
          lastname: channels[i].Candidate.can_detail.lastName,
          profile: channels[i].Candidate.can_detail.profile,
          compId: channels[i].Candidate.can_id,
        };
      }
    }

    if (channels[i].SenderSubuser) {
      if (
        channels[i].SenderSubuser.user_id.toString() !==
        req.decodedData.id.toString()
      ) {
        channels[i].subUser = {
          firstname: channels[i].SenderSubuser.first_name,
          lastname: channels[i].SenderSubuser.last_name,
          profile: channels[i].SenderSubuser.user_image,
          compId: channels[i].SenderSubuser.comp_id,
        };
      }
    }
    if (channels[i].ReceiverSubuser) {
      if (
        channels[i].ReceiverSubuser.user_id.toString() !==
        req.decodedData.id.toString()
      ) {
        channels[i].subUser = {
          firstname: channels[i].ReceiverSubuser.first_name,
          lastname: channels[i].ReceiverSubuser.last_name,
          profile: channels[i].ReceiverSubuser.user_image,
          compId: channels[i].ReceiverSubuser.comp_id,
        };
      }
    }

    if (req.decodedData.user_type === 1) {
      channels[i].company = {
        compName: channels[i].Company.comp_info.comp_name,
        logo: channels[i].Company.logo,
        compId: channels[i].Company.comp_id,
      };
    }

    channelList.push({
      id: channels[i]._id,
      lastMessage: channels[i].last_message,
      createdBy: channels[i].user_id,
      unseenMessageCount: channels[i].unseen_message_count,
      messages: channels[i].messages,
      company: channels[i].company,
      candidate: channels[i].candidate,
      subUser: channels[i].subUser,
      createdAt: channels[i].createdAt,
      updatedAt: channels[i].updatedAt,
    });
  }

  return res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? documentCount / limit
        : parseInt(documentCount / limit, 10) + 1,
    currentPage,
    results: channelList.length,
    data: channelList,
  });
});

const deleteChannels = CatchAsync(async (req, res, next) => {
  await MailboxChannel.findByIdAndUpdate(req.params.channelId, {
    $set: { is_active: false },
  });

  return res.status(200).json({
    status: 'success',
    isSuccess: true,
    _id: req.params.channelId,
  });
});

const getMessages = CatchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;

  const channel = await MailboxChannel.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.channelId),
        is_active: true,
        $or: [
          {
            'member1.user_id': mongoose.Types.ObjectId(req.decodedData.id),
          },
          {
            'member2.user_id': mongoose.Types.ObjectId(req.decodedData.id),
          },
        ],
      },
    },

    { $unwind: '$messages' },
    {
      $sort: { 'messages.created_ts': -1 },
    },
    { $skip: (currentPage - 1) * limit },
    { $limit: limit },
    {
      $group: {
        _id: '$_id',
        messages: { $push: '$messages' },
      },
    },
  ]);

  for (let i = 0; i < channel.length; i++) {
    for (let j = 0; j < channel[i].messages.length; j++) {
      channel[i].messages[j].text = Encryption.decryptData(
        channel[i].messages[j].text
      );
    }
  }

  const documentCount = await MailboxChannel.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.channelId) } },
    { $project: { count: { $size: '$messages' } } },
  ]);
  const totalCount = documentCount.length === 0 ? 0 : documentCount[0].count;
  const totalRecordsFetched =
    (currentPage - 1) * 10 + (channel[0] ? channel[0].messages.length : 0);
  return res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount,
    totalPages:
      totalCount % limit === 0
        ? totalCount / limit
        : parseInt(totalCount / limit, 10) + 1,
    currentPage,
    hasMore: totalRecordsFetched < totalCount ? true : false,
    results: channel[0] ? channel[0].messages.length : 0,
    data: channel[0] ? channel[0].messages : [],
  });
});

const updateUnseenMessage = CatchAsync(async (req, res, next) => {
  const dynamicQuery = {};
  const channel = await MailboxChannel.findById(req.params.channelId).lean();
  if (channel === null) {
    return next(new AppError('Invalid Request', 400));
  }
  if (channel.member1.user_id.toString() === req.decodedData.id.toString()) {
    Object.assign(dynamicQuery, { 'member1.unseen_message_count': 0 });
  } else {
    Object.assign(dynamicQuery, { 'member2.unseen_message_count': 0 });
  }
  await MailboxChannel.findByIdAndUpdate(req.params.channelId, {
    $set: dynamicQuery,
  });

  return res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: channel._id,
  });
});

const getchannelByUserId = CatchAsync(async (req, res, next) => {
  const query = {
    $or: [
      {
        $and: [
          { 'member1.user_id': mongoose.Types.ObjectId(req.params.userId) },
          { 'member2.user_id': mongoose.Types.ObjectId(req.decodedData.id) },
        ],
      },
      {
        $and: [
          { 'member1.user_id': mongoose.Types.ObjectId(req.decodedData.id) },
          { 'member2.user_id': mongoose.Types.ObjectId(req.params.userId) },
        ],
      },
    ],
  };

  // fetch list of channels
  const channels = JSON.parse(
    JSON.stringify(
      await MailboxChannel.find(query, { messages: { $slice: -10 } })
    )
  );
  const channelList = [];
  for (let i = 0; i < channels.length; i++) {
    channels[i].last_message.text = Encryption.decryptData(
      channels[i].last_message.text
    );
    if (
      channels[i].member1.user_id.toString() === req.decodedData.id.toString()
    ) {
      channels[i].user_id = channels[i].member1.user_id;
      channels[i].unseen_message_count =
        channels[i].member1.unseen_message_count;
      channels[i].member1 = undefined;
    } else {
      channels[i].user_id = channels[i].member2.user_id;
      channels[i].unseen_message_count =
        channels[i].member2.unseen_message_count;
      channels[i].member2 = undefined;
    }
    for (let j = 0; j < channels[i].messages.length; j++) {
      channels[i].messages[j].text = Encryption.decryptData(
        channels[i].messages[j].text
      );
    }

    channelList.push({
      id: channels[i]._id,
      lastMessage: channels[i].last_message,
      createdBy: channels[i].member1,
      receivedBY: channels[i].member2,
      messages: channels[i].messages,
      createdAt: channels[i].createdAt,
      updatedAt: channels[i].updatedAt,
    });
  }

  return res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: channelList,
  });
});

module.exports = {
  createMessages,
  listChannels,
  deleteChannels,
  getMessages,
  updateUnseenMessage,
  getchannelByUserId,
};
