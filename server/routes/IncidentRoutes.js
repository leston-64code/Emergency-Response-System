const express = require("express")
const { createIncident, getOneIncident, getAllIncidents, updateIncident } = require("../controllers/incidentController")
const router = express.Router()
const multer = require('multer');

// Configure multer for file upload with disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.route("/createincident").post(upload.array('files'), createIncident)
router.route("/getincident/:id").get(getOneIncident)
router.route("/getall").get(getAllIncidents)
router.route("/updateincident/:id").put(updateIncident)

module.exports = router