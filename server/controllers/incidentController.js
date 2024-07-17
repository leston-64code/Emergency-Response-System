const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Incident = require("../models/Incident");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createIncident = catchAsyncErrors(async (req, res, next) => {
    const incident = await Incident.create(req.body);
    if (incident != null) {
        return res.status(200).json({
            success: true,
            message: "Incident created",
            incident
        });
    }
});

exports.updateIncident = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedIncident = await Incident.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedIncident != null) {
        return res.status(200).json({
            success: true,
            updatedIncident
        });
    } else {
        return next(new ErrorHandler("Could not be updated", 400));
    }
});

exports.deleteIncident = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const deletedIncident = await Incident.findByIdAndDelete(id);
    if (deletedIncident != null) {
        return res.status(200).json({
            success: true,
            deletedIncident
        });
    } else {
        return next(new ErrorHandler("Could not be deleted", 400));
    }
});

exports.getOneIncident = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const incident = await Incident.findById(id);
    if (incident != null) {
        return res.status(200).json({
            success: true,
            incident
        });
    } else {
        return next(new ErrorHandler("Incident not found", 400));
    }
});

exports.getAllIncidents = catchAsyncErrors(async (req, res, next) => {
    const incidents = await Incident.find();
    const incidentsCount = await Incident.countDocuments();
    if (incidents != null) {
        return res.status(200).json({
            success: true,
            incidentsCount,
            incidents
        });
    } else {
        return next(new ErrorHandler("There was some issue", 400));
    }
});
