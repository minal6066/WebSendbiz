'use strict';
const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const Schema = mongoose.Schema;
const serviceSchema = new Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      lowercase: true,
      required: [true, 'product name is a required field'],
    },
    location: {
      type: String,
      required: [true, 'location is a required field'],
    },
    duration: {
      type: String,
      lowercase: true,
      required: [true, 'duration is a required field'],
    },
    price: {
      currency: {
        type: String,
        default: 'Euro',
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    period: {
      type: String,
      required: [true, 'period is a required field'],
    },
    category: [
      {
        type: String,
        trim: true,
        unique: true,
      },
    ],
    pricingPlan: {
      type: String,
      required: [true, 'pricing plan is a required field'],
    },
    experience: {
      type: String,
      required: [true, 'experience is a required field'],
    },
    deliveryTime: {
      type: String,
      required: [true, 'delivery time is required field'],
    },
    brochure: [String],
    shortDescription: {
      type: String,
      minlength: 20,
      maxlength: 200,
      required: [true, 'short description is a required field'],
    },
    fullDescription: {
      type: String,
      minlength: 20,
      required: [true, 'full description is a required field'],
    },
    media: [
      {
        fileType: String,
        fileName: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
    clicksPerDay: {
      type: Number,
      default: 0,
    },
    isSponsored: {
      type: Boolean,
      default: false,
    },
    sponsorExpiresAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    clicks : {type : Number},
    clicksPerDay :{type: Number},
    sponsoredExpiresAt : {type: Date},
    // isActive: { type: Boolean, default: true }, // true=Active, false=Deleted
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

serviceSchema.index({ category: 1 }, { unique: false });
serviceSchema.index({ name: 'text', companyId: 1 });

serviceSchema.virtual('companyData', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'companyId',
  justOne: true,
});

serviceSchema.plugin(uniqueArrayPlugin);

const Service = mongoose.model('Service', serviceSchema, 'service');

module.exports = Service;
