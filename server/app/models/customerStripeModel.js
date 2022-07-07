const mongoose = require('mongoose');

const stripeCustomerSchema = new mongoose.Schema(
  {
    stripeCxId: {
      type: String,
      required: true,
    },
    paymentMethods: [
      {
        card: String,
        defaultCard: Boolean,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const StripeCx = mongoose.model('StripeCx', stripeCustomerSchema);

module.exports = StripeCx;
