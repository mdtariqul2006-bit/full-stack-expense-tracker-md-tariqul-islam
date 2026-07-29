const express = require ("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
    importExpensesFromCSV,
} = require ("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");
const csvUpload = require("../middleware/csvUploadMiddleware");
console.log("csvUpload type:", typeof csvUpload, typeof csvUpload.single);

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);
router.post("/import-csv", protect, csvUpload.single("file"), importExpensesFromCSV);

module.exports = router;