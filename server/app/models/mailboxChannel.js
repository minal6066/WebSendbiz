const mongoose = require('mongoose');

const mailboxChannelSchema = new mongoose.Schema(
  {
    comp_id: { type: String, ref: 'company' },
    member1: { // one who initiates the chat
      user_id: { type: mongoose.Types.ObjectId, ref: 'user' },
      firstname: { type: String, index: true },
      lastname: { type: String, index: true },
      unseen_message_count: { type: Number },
      chat_deleted: { type: Boolean },
    },
    member2: { // receiver
      user_id: { type: mongoose.Types.ObjectId, ref: 'user' },
      firstname: { type: String, index: true },
      lastname: { type: String, index: true },
      unseen_message_count: { type: Number },
      chat_deleted: { type: Boolean },
    },
    type: { // receiver's type: ,1=Candidate 2=Company 3=Sub user
      type: Number,
    },
    last_message: {
      text: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    messages: [
      {
        text: {
          type: String,
        },
        attachments: [
          {
            key: {
              type: String,
            },
            type: {
              type: String,
            },
          },
        ],
        user_id: {
          type: mongoose.Types.ObjectId,
        },
        created_ts: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

mailboxChannelSchema.virtual('Company', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'comp_id',
  justOne: true,
});

mailboxChannelSchema.virtual('SenderCompany', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'member1.user_id',
  justOne: true,
});
mailboxChannelSchema.virtual('ReceiverCompany', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'member2.user_id',
  justOne: true,
});
mailboxChannelSchema.virtual('Candidate', {
  ref: 'Candidate',
  foreignField: 'can_id',
  localField: 'member2.user_id',
  justOne: true,
});
mailboxChannelSchema.virtual('SenderSubuser', {
  ref: 'SubUser',
  foreignField: 'user_id',
  localField: 'member1.user_id',
  justOne: true,
});
mailboxChannelSchema.virtual('ReceiverSubuser', {
  ref: 'SubUser',
  foreignField: 'user_id',
  localField: 'member2.user_id',
  justOne: true,
});

const MailboxChannel = mongoose.model('MailboxChannel', mailboxChannelSchema);

module.exports = MailboxChannel;
