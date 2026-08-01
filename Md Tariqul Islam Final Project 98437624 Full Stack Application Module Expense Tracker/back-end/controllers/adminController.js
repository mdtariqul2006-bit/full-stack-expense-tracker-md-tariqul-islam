const User = require("../models/user");
const Expense = require("../models/expense");
const Income = require("../models/income");

//list of every user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//totals for all users
exports.getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalExpense = await Expense.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const totalIncome = await Income.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        res.status(200).json({
            totalUsers,
            totalExpenseAllUsers: totalExpense[0]?.total || 0,
            totalIncomeAllUsers: totalIncome[0]?.total || 0,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Stop an admin from deleting their own account
        if (id === req.user.id.toString()) {
            return res.status(400).json({ message: "You cannot delete your own  admin account!" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await Expense.deleteMany({ userId: id });
        await Income.deleteMany({ userId: id });
        await user.deleteOne();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};