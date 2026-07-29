const express = require("express");
const { importTransactionsFromCSV } = require("../controllers/importController");
const { protect } = require("../middleware/authMiddleware");
const csvUpload = require("../middleware/csvUploadMiddleware");

const router = express.Router();

router.post("/csv", protect, csvUpload.single("file"), importTransactionsFromCSV);

module.exports = router;