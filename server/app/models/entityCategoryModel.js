const mongoose = require('mongoose');

const entityCategorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      uppercase: true,
      enum: ['PRODUCT', 'SERVICE', 'NEWS', 'EVENT'],
      required: [true, 'category type is a required field'],
    },
    categoryName: {
      type: String,
      required: [true, 'category name is a required field'],
      lowercase: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

entityCategorySchema.index({ categoryName: 'text' });

const EntityCategory = mongoose.model('EntityCategory', entityCategorySchema);

module.exports = EntityCategory;
