const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/jobs',jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/assignments', assignmentRoutes);

async function db(){
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    });
}
db();

