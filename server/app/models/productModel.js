const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const productSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [
        true,
        'product should belong to a company, pass companyId here',
      ],
    },
    name: {
      type: String,
      required: [true, 'name is a required field'],
      lowercase: true,
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
    availability: {
      type: String,
      required: [true, 'availability is a required field'],
    },
    reference: {
      type: String,
      required: [true, 'reference is a required field'],
    },
    shopUrl: {
      type: String,
      default: '',
    },
    category: [
      {
        type: String,
        unique: true,
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    pricingPlan: {
      type: String,
      required: [true, 'pricing plan is a required field'],
    },
    deliveryTime: {
      type: String,
      required: [true, 'delivery time is a required field'],
    },
    shortDescription: {
      type: String,
      required: [true, 'short description is a required field'],
    },
    fullDescription: {
      type: String,
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
    isSponsored: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
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
  }
);

productSchema.index({ category: 1 }, { unique: false });
productSchema.index({ name: 'text', companyId: 1 });

productSchema.virtual('companyData', {
  ref: 'Company',
  foreignField: 'comp_id',
  localField: 'companyId',
  justOne: true,
});

productSchema.plugin(uniqueArrayPlugin);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
