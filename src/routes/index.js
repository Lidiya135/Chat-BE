const express = require('express');
const router = express.Router();
const UsersRouter = require('../routes/users');
const messageRoute = require("./messages");

router.use("/users",UsersRouter);
router.use("/messages", messageRoute);

module.exports = router;