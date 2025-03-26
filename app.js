const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");


const app = express();

const PORT = process.env.PORT || 8080;
dotenv.config();

connectDB();

app.use(express.json()); 
app.use(cors()); 

app.use("/jobs", jobRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
