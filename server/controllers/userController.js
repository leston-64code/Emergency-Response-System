const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.create(req.body);
    if (user != null) {
        return res.status(200).json({
            success: true,
            message: "User created",
            user
        });
    }
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedUser != null) {
        return res.status(200).json({
            success: true,
            updatedUser
        });
    } else {
        return next(new ErrorHandler("Could not be updated", 400));
    }
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser != null) {
        return res.status(200).json({
            success: true,
            deletedUser
        });
    } else {
        return next(new ErrorHandler("Could not be deleted", 400));
    }
});

exports.getOneUser = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user != null) {
        return res.status(200).json({
            success: true,
            user
        });
    } else {
        return next(new ErrorHandler("User not found", 400));
    }
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    const usersCount = await User.countDocuments();
    if (users != null) {
        return res.status(200).json({
            success: true,
            usersCount,
            users
        });
    } else {
        return next(new ErrorHandler("There was some issue", 400));
    }
});
