import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required']
    },
    position: {
        type: String,
        required: [true, 'Job Position is required'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['Under Review', 'Interview Scheduled', 'Shortlisted', 'Rejected', 'New'],
        default: 'Under Review'
    },
    workType: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract'],
        default: 'Full-Time'
    },
    workLocation: {
        type: String,
        default: 'Bangalore',
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }
);

export default mongoose.model('Job', jobSchema)