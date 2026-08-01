require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");

const [, , email, password, ...nameParts] = process.argv;
const fullName = nameParts.join(" ") || "Admin";

if (!email || !password) {
    console.error("Usage: node scripts/createAdmin.js <email> <password> [full name]");
    process.exit(1);
}

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        let user = await User.findOne({ email });

        if (user) {
            user.role = "admin";
            await user.save();
            console.log(`Existing user "${email}" promoted to admin.`);
        } else {
            user = await User.create({
                fullName,
                email,
                password, 
                role: "admin",
            });
            console.log(`New admin user created: ${email}`);
        }
    } catch (error) {
        console.error("Failed to create/promote admin:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

run();