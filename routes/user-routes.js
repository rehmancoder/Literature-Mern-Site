const express = require("express");
const { getAllUsers, signupController, loginController } = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signupController);
router.post("/login", loginController)







module.exports = router