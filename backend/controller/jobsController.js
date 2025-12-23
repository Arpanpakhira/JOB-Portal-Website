import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";

export const createJobController = async (req, res, next) => {
    try {
        const { company, position } = req.body;

        if (!company || !position) {
            return next("Company and Position are required");
        }

        // userAuth middleware 
        req.body.createdBy = req.user.userId;

        const job = await jobsModel.create(req.body);

        res.status(201).json({
            success: true,
            job,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
// ============= GET JOBS ====================
export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user.userId })
    res.status(200).json({
        totalJobs: jobs.length,
        jobs
    })
}

// ============ UPDATE JOBS ==============
export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    // validation
    if (!company || !position) {
        next("Please Provide all fields!")
    }
    // find job
    const job = await jobsModel.findOne({ _id: id })
    // vaildate
    if (!job) {
        next(`No jobs found with this id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next("You are not Authorised to update the job")
        return;
    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })


    res.status(200).json({ updateJob });

}

// ============ DELETE JOBS ==============
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params
    // find job
    const job = await jobsModel.findOne({ _id: id })

    if (!job) {
        next(`NO job found with this id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('You are not Authorised to delete the job')
        return;
    }
    await job.deleteOne()
    res.status(200).json({ message: "Job Deleted Successfully!" });

};

// ================ JOB STATS & FILTER =====================

export const jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },
        },
    ]);
    res.status(200).json({ totalJobs: stats.length, stats });

};