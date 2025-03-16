const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// userregistration
const registerUser = async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {name, email, password, nid, role } = req.body;

    const image = req.file ? req.file.filename : "";

    try{
        let user = await User.findOne({ email });    //checking is this email already exist or not
        if(user) return res.status(400).json({ msg: "Email alrady exist"})

        user = await User.findOne({nid});        //checking is this NID already exist or not
        if(user) return res.status(400).json({msg:"NID alrady exist"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User ({name, email, password:hashedPassword, nid, image, role});
        await user.save();

        res.status(201).json({msg : "User Register successfully", user});
    } catch (error) {
        res.status(500).json({msg: "Server error"});
    }
}

// User login 
const loginUser =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }); // finding the email
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password); //matching password
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
      
      res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict"})
         .json({ 
            message: "Login successful", 
            user: { id: user._id, name: user.name, email: user.email, nid: user.nid, image: user.image, role: user.role } 
        });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }

// // find User profile
//   const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ msg: "Server error" });
//     }
// };


  module.exports = {registerUser, loginUser};