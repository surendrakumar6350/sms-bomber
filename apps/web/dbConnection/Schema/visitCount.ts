import mongoose from "mongoose";

const visitCountSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  today: {
    type: Number,
    required: true,
  },
  lastUpdatedDate: {
    type: String,
    required: true,
  },
});

export const VisitCount = mongoose.models.VisitCount || mongoose.model("VisitCount", visitCountSchema);