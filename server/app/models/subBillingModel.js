 const mongoose = require('mongoose');

const subBillingSchema = new mongoose.Schema(
  {
    isBase: Boolean,
    type: {
      type: String,
      enum: ['PREMIUM', 'SUBUSER', 'SPONSORED'],
    },
    entity: {
      entityId: mongoose.Schema.Types.ObjectId,
      name: String,
      period: Number,
    },
    price: Number,
    currency: String,
    billingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Billing',
    },
    isActive: Boolean,
    isReccuring: Boolean,
    expiresAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const SubBilling = mongoose.model('SubBilling', subBillingSchema);

module.exports = SubBilling;
