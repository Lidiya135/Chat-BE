const express = require("express");
const router = express.Router();
const { getMessage } = require("../controller/messages");
const { protect } = require("../middleware/auth");

router.get("/:receiver_id", protect, getMessage);

module.exports = router;