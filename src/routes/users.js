const express = require('express');
const router = express.Router();
const {UsersController} = require('./../controller/users');
const upload = require('../middleware/upload');
const {protect} = require ('../middleware/auth');

router.post("/register", UsersController.insert);
router.post("/login", UsersController.login);
router.get("/",protect, UsersController.getAll);
router.get("/:id",protect, UsersController.getById);
router.put("/profile",protect,upload.single("photo"), UsersController.update);


module.exports = router;
