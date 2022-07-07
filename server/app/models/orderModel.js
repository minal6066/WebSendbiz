const {
  Schema: {
    Types: { ObjectId },
  },
  model,
  Schema,
} = require('mongoose');

const orderSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['PREMIUM', 'SUBUSER', 'SPONSORED'],
    },
    packages: [
      {
        type: ObjectId,
        ref: 'SubBilling',
      },
    ],
    price: {
      type: Number,
      required: [true, 'price is a required field'],
    },
    user: {
      type: ObjectId,
      required: [true, 'user is a required field'],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
    },
    paymentMethod: String,
    last4: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

orderSchema.index({ paymentId: 1 });

const Order = model('Order', orderSchema);

module.exports = Order;
