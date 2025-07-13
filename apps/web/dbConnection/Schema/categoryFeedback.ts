import mongoose from "mongoose";

const categoryFeedbackSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const CategoryFeedback =
    mongoose.models.CategoryFeedback ||
    mongoose.model("CategoryFeedback", categoryFeedbackSchema);
