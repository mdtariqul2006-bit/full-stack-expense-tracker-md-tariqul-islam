
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
        id: user._id,
        user,
        token: generateToken(user._id)
    });

} catch (err) {
    res
    .status(500)
    .json({message: "Error registering user", error: err.message});
}
};

//login the user

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "All Fields are Required!"});
    }

    try{
        const user = await User.findOne({email});
        if (!user || (!await user.comparePassword(password))){
            return res.status(400).json({message:"Invalid Credentials"});
        }
    

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),


        });

    

} catch (err) {
    res
    .status(500)
    .json({message: "Error registering user", error: err.message});
}
};




//getUserInfo  user

exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        
        if (!user){
            return res.status (404).json({message: "User Not Found"})
        }
        res.status(200).json(user);
    
} catch (err) {
    res
    .status(500)
    .json({message: "Error registering user", error: err.message});
}

};