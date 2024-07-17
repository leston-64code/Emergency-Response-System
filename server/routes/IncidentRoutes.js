const express = require("express")
const { createIncident, getOneIncident, getAllIncidents, updateIncident } = require("../controllers/incidentController")
const router = express.Router()

router.route("/createincident").post(createIncident)
router.route("/getincident/:id").get(getOneIncident)
router.route("/getall").get(getAllIncidents)
router.route("/updateincident/:id").put(updateIncident)

module.exports = router