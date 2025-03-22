const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    document: { type: String, required: true }, // Path to uploaded verification document
    isVerified: { type: Boolean, default: false }, // AI will update this if verified
    role: { type: String, enum: ["lawyer"], default: "lawyer" } // Role field for authentication
}, { timestamps: true });

module.exports = mongoose.model("Lawyer", lawyerSchema);
