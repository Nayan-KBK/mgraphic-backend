const { default: mongoose } = require("mongoose");
const Job = require("../models/Job");

// 🎯 Add a new job
const addJob = async (req, res) => {
    try {
        const {
            entity, title, experience, education, profile, location, description, salary,
            contactPerson, skills, languages, ageRequirement, postingDate, expireDate
        } = req.body;

        if (!entity || !title || !experience || !education || !profile || !location ||
            !description || !salary || !contactPerson || !skills || !languages ||
            !ageRequirement || !expireDate) {
            return res.status(400).json({ message: "⚠️ All fields are required!" });
        }

        const job = new Job({
            entity, title, experience, education, profile, location, description, salary,
            contactPerson, skills, languages, ageRequirement,
            postingDate: postingDate || Date.now(),
            expireDate
        });

        await job.save();

        res.status(201).json({ message: "✅ Job added successfully", job });
    } catch (error) {
        res.status(500).json({ message: `❌ ${error.message}` });
    }
};

// 📌 Get all jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: `❌ ${error.message}` });
    }
};

// 🔍 Get a single job by ID
const getJobById = async (req, res) => {


    try {
        const { id } = req.params;

        // ✅ Validate if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "❌ Invalid job ID format" });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: "⚠️ Job not found" });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: `❌ ${error.message}` });
    }

    // try {
    //     const job = await Job.findById(req.params.id);
    //     if (!job) {
    //         return res.status(404).json({ message: "⚠️ Job not found" });
    //     }
    //     res.status(200).json(job);
    // } catch (error) {
    //     res.status(500).json({ message: `❌ ${error.message}` });
    // }
};

// 📝 Update Job
const updateJob = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "❌ Invalid job ID format" });
        }

        // ✅ Use `$set` to update only provided fields
        const job = await Job.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true } // Ensures validation rules apply
        );

        if (!job) {
            return res.status(404).json({ message: "⚠️ Job not found" });
        }

        res.status(200).json({ message: "✅ Job updated successfully", job });
    } catch (error) {
        res.status(500).json({ message: `❌ ${error.message}` });
    }
};

// ❌ Delete a job
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "⚠️ Job not found" });
        }
        res.status(200).json({ message: "✅ Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: `❌ ${error.message}` });
    }
};

// ✅ Export all controllers
module.exports = { addJob, getJobs, getJobById, updateJob, deleteJob };
