const mongoose = require('mongoose');

const { Schema } = mongoose;

const subUserSchema = new Schema(
  {
    user_id: { type: String, required: [true, 'user_id is a required field'] },
    comp_id: { type: String, required: [true, 'comp_id is a required field'] },
    title: { type: String, required: true },
    fee: { type: Number },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    permission: { type: String, required: true, lowercase: true },
    user_image: { type: String, default: '' },
    create: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }, // true=Active, false=Deleted
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

subUserSchema.index({ user_id: 1, comp_id: 1 });

module.exports = mongoose.model('SubUser', subUserSchema, 'sub_user');
