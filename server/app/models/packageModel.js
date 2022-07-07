const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    currency: String,
    isGlobal: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
}
);

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
