const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/idOverlapChk", userController.idOverlapChk);

router.post("/regist", userController.regist);

router.post("/login", userController.login);

router.post("/sendToken", userController.sendToken);

router.post("/getPoint", userController.getPoint);

module.exports = router;
