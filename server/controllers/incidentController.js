const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Incident = require("../models/Incident");
const ErrorHandler = require("../utils/ErrorHandler");
const axios = require("axios")

exports.createIncident = catchAsyncErrors(async (req, res, next) => {

    let files = req.files.map((ele) => {
        return ele.filename
    })
    req.body.images = files

    let location = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${req.body.latitude}&lon=${req.body.longitude}&format=json`)

    const address = Object.fromEntries(
        Object.entries(location.data.address).filter(([key]) => key !== 'ISO3166-2-lvl4')
    );

    req.body.address = address

    const incident = await Incident.create(req.body);
    if (incident != null) {
        return res.status(200).json({
            success: true,
            message: "Incident created",
            incident
        });
    } else {
        return res.status(400).json({
            success: false,
            tpye: "MANUAL",
        })
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


        let files = incident.images.map((ele, index) => {
            return `${req.protocol}://${req.get('host')}/images/${ele}`
        })

        incident.images = files

        return res.status(200).json({
            success: true,
            incident
        });
    } else {
        return next(new ErrorHandler("Incident not found", 400));
    }
});

exports.getAllIncidents = catchAsyncErrors(async (req, res, next) => {
    try {
        const incidents = await Incident.find();
        const incidentsCount = await Incident.countDocuments();

        const formattedIncidents = incidents.map(incident => {
            return {
                latitude: incident.latitude,
                longitude: incident.longitude,
                // firstImage: incident.images.length > 0 ? `${req.protocol}://${req.get('host')}/images/${path.posix.join('uploads', incident.images[0])}` : null,
                thumbnail: incident.images.length > 0 ? `${req.protocol}://${req.get('host')}/images/${incident.images[0]}` : null,
                volunteerCount: incident.volunteerCount,
                volunteers: incident.volunteers,
                address: incident.address,
                _id: incident._id
            };
        });

        return res.status(200).json({
            success: true,
            incidentsCount,
            incidents: formattedIncidents
        });
    } catch (error) {
        return next(new ErrorHandler("There was some issue", 400));
    }
});

