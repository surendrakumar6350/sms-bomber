import mongoose from "mongoose";

const mobileTrackingSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
    },
    entries: [
        {
            ip: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

export const MobileTracking = mongoose.models.MobileTracking || mongoose.model("MobileTracking", mobileTrackingSchema);
