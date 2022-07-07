'use strict';
const mongoose = require('mongoose');
const AppError = require('../utils/appError');

const eventSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'companyId is a required field'],
    },
    image: [String],
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'name is a required field'],
    },
    location: {
      type: String,
      required: [true, 'location is a required field'],
    },
    from: {
      type: Date,
      required: [true, 'from date is a required field'],
    },
    to: {
      type: Date,
      required: [true, 'to date is a required field'],
    },
    description: {
      type: String,
      required: [true, 'description is a required field'],
    },
    likes: [
      {
        userType: Number,
        refId: mongoose.Schema.Types.ObjectId,
        name: String,
        profileImage: String,
      },
    ],
    comments: [
      {
        userType: Number,
        refId: mongoose.Schema.Types.ObjectId,
        name: String,
        profileImage: String,
        comment: String,
        createdAt: Date,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isSponsored: {
      type: Boolean,
      default: false,
    },
    totalClicks: { type: Number },
    clicksPerDay: { type: Number },
    sponsorExpiresAt: { type: Date },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

eventSchema.index({ name: 'text', companyId: 1 });

eventSchema.virtual('companyData', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'companyId',
  justOne: true,
});

eventSchema.pre('save', function (next) {
  if (!this.isModified('from') && !this.isModified('to')) return next();
  if (this.from > this.to) {
    return next(new AppError('From date cannot be higher than to date', 401));
  }
  next();
});

const Event = mongoose.model('Event', eventSchema, 'event');
module.exports = Event;
