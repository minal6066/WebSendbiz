"use strict";
const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const job = require("./job");

const Schema = mongoose.Schema;

const sponsoredSchema = new Schema(
  {
    sp_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Sponsored id is a required field"],
    },
    category: {
      type: String,
      enum: ["JOB", "PRODUCT", "SERVICE", "COMPANY"],
    },
    clicks: { type: Number, required: true },
    users_seen: [],
    isActive: { type: Boolean, default: true },
    sp_info: {
      amount: { type: Number },
      days: { type: Number },
      clicks: { type: Number },
      createdAt: { type: Date, default: Date.now() },
    },
    clicks_per_day: { type: Number },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Sponsored = mongoose.model("Sponsored", sponsoredSchema, "sponsored");

module.exports = Sponsored;
