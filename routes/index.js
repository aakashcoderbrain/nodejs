const express= require("express");
const multer = require('multer');
const upload = multer();
const router = express.Router();
const indexController=require("../controllers/index");


// API Post
router.post("/login", upload.single(), indexController.userLoginApi);
router.post("/signup", upload.single(), indexController.registerApi);
router.post("/reset", upload.single(), indexController.resetPasswordApi);
router.post("/forget", upload.single(), indexController.forgetApi);

//API GET
router.delete("/delete/:email", upload.single(), indexController.deleteApi);

module.exports = router;