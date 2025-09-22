const express = require("express");
const router = express.Router();

const { ccFormAdd, isCallingUs, serveForm } = require("../app/controllers/customerController");

// Handle form submission
router.post("/form-add", ccFormAdd);

// Trigger an incoming call
router.get("/is-calling", isCallingUs);

module.exports = router;
