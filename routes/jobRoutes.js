const express = require("express");
const { addJob, getJobs, getJobById, updateJob, deleteJob } = require("../controllers/jobController");

const router = express.Router();

// 📌 Add a new job
router.post("/add-job", addJob);

// 📌 Get all jobs
router.get("/get-all-jobs", getJobs);

// 🔍 Get a single job by ID
router.get("/get-job/:id", getJobById);

// ✏️ Update a job
router.patch("/edit-job/:id", updateJob);

// ❌ Delete a job
router.delete("/delete/:id", deleteJob);

module.exports = router;
