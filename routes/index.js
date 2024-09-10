const express= require("express");
const multer = require('multer');
const upload = multer();
const router = express.Router();
const indexController=require("../controllers/index");


// API Post
router.post("/login", upload.single(), indexController.userLoginApi);
router.post("/signup", upload.single(), indexController.registerApi);

module.exports = router;