'use strict';
const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'companyId is a required field'],
    },
    image: [
      {
        type: String,
        default: '',
      },
    ],
    title: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'title is a required field'],
    },
    description: {
      type: String,
      required: [true, 'description is a required field'],
    },
    publishedAt: { type: Date },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

newsSchema.index({ title: 'text', companyId: 1 });

newsSchema.virtual('avgReadTime').get(function () {
  const words = this.description.split(' ');
  const time = words.length / 200;
  if (words.length % 200 !== 0) {
    if (!(parseInt(time) > 1)) {
      return 'less than a minute';
    }
    if (parseInt(time) > 60) {
      if (time % 60 === 0) {
        if (parseInt(time / 60) > 1) return `${parseInt(time / 60)} hours`;
        if (parseInt(tme / 60) < 2) return `${parseInt(time / 60)} hour`;
      }
      let minutes = parseFloat(time / 60).toFixed(2) - parseInt(time / 60);
      minutes = minutes * 0.6;
      if (minutes === 0 || minutes < 5)
        return parseInt(time / 60) > 1
          ? `${parseInt(time / 60)} hours`
          : `${parseInt(time / 60)} hour`;
      if (minutes > 5) {
        return `${parseInt(time / 60)} hours and ${minutes} minutes`;
      }
    }
    const decTime = parseFloat(time).toFixed(2);
    const decimal = decTime - parseInt(time);
    let seconds = decimal * 0.6;
    seconds = parseFloat(seconds).toFixed(2);
    if (seconds >= 30) {
      return `${parseInt(time) + 1} minutes`;
    } else if (seconds < 30) {
      return `${parseInt(time)} minutes`;
    }
  }
  return `${time} minutes`;
});

newsSchema.virtual('companyData', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'companyId',
  justOne: true,
});

newsSchema.plugin(uniqueArrayPlugin);

const News = mongoose.model('News', newsSchema, 'news');

module.exports = News;
