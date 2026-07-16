
const User = require('../models/user')
const jwt = require("jsonwebtoken");

//generate jwt token

const generateToken = (id) => {
    return jwt.sign ({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

//register the user

exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    //validation
    if (!fullName || !email || !password) {
        return res.status(400).json({message: "Please enter all fields"});
    }

    try{
        //checks agsindt database for email already exsiting
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json ({message: "Email already exists! Try a new email"})
        }
    
    

    //create user 
    const user = await User.create ({
        fullName,
        email,
        password,
        profileImageUrl,
    });

    res.status(201).json({
        id: user_id,
        user,
        token: generateToken(user.user_id)
    });

} catch (err) {
    res
    .status(500)
    .json({message: "Error registering user", error: err.message});
}
};

//login the user

exports.loginUser = async (req, res) => {};

//getUserInfo the user

exports.getUserInfo = async (req, res) => {};