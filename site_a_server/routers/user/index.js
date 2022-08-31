const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/idOverlapChk", userController.idOverlapChk);

router.post("/regist", userController.regist);

router.post("/login", userController.login);

router.post("/sendToken", userController.sendToken);

router.post("/getPoint", userController.getPoint);

router.post("/buyItem", userController.buyItem);

router.get("/authDID", userController.authDID);

router.get("/redirectURI", userController.redirectURI);

module.exports = router;
