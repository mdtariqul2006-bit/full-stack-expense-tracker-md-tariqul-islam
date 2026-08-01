const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const { getAllUsers, getSystemStats, deleteUser } = require("../controllers/adminController");


const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/stats", protect, isAdmin, getSystemStats);
router.delete("/users/:id", protect, isAdmin, deleteUser);

module.exports = router;