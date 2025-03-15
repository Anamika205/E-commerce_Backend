const express = require("express");
const router = express.Router();
const userAPI = require('../Controller/UserController')

router.post("/register", userAPI.userRegister);
router.get("/login",userAPI.userLogin);


module.exports = router; 

