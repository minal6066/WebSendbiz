const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'user is a required field'],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubBilling' }],
    cycle: {
      type: String,
      enum: ['MONTHLY', 'YEARLY'],
      required: [true, 'billing Cycle is a required field'],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
