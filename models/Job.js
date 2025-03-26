const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        entity: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        experience: {
            type: String,
            required: true
        },
        education: {
            type: String,
            required: true
        },
        profile: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        salary: {
            type: String,
            required: true
        },
        contactPerson: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            number: { type: String, required: true }
        },
        skills: {
            type: [String],
            required: true
        },
        languages: {
            type: [String],
            required: true
        },
        ageRequirement: {
            type: String,
            required: true
        },
        postingDate: {
            type: Date,
            default: Date.now
        },
        expireDate: {
            type: Date, required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("jobs", jobSchema);
