const express = require("express")
const { createUser, getOneUser, getAllUsers, deleteUser, updateUser } = require("../controllers/userController")
const router = express.Router()

router.route("/createuser").post(createUser)
router.route("/getuser/:id").get(getOneUser)
router.route("/getallusers/:id").put(getAllUsers)
router.route("/deleteuser/:id").delete(deleteUser)
router.route("/updateuser/:id").put(updateUser)

module.exports = router