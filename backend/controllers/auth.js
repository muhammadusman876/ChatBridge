//to hash our password
const bcrypt = require("bcryptjs")
const User = require("../models/user");
const generateTokenAndSetCookie = require("../utils/generateToken");

  
exports.signup = async (req, res) => {
    // res.send("helloo")
    try {
        //destructing our req.body
        const {fullName, username, password, confirmPassword, gender } = req.body;

        //checking if both the password are equal
        if (password !== confirmPassword) {
            return res.status(400).json({error:"Passwords don't match"});
        }

        //will check if this user exist in our database 
        const user = await User.findOne({username});

        //if user exists then the value will be true so throw an error
        if (user) {
            return res.status(400).json({error:"Username already exists"})
        }

        //HASH PASSWORD HERE
        //the higher the value more secure it is but also slower
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //create the user 
        const newUser = new User({
            //here the name of our property and value is same, so we write it just once
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic 
        })

        //saving into our database
        
        if (newUser) {
            //Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            
            res.status(201).json({
                _id : newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic : newUser.profilePic
            })
        } else {
            res.status(400).json({error:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error is signup controller", error.message)
        res.status(500).json({error:"Internal Server Error ok"})
    }
   
  };

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        //here we compare our password
        // if user?.password is null, undefined, or falsy, an empty string is used as the default value for comparison to ensure that the bcrypt.compare() function doesn't throw an error when attempting to compare with null or undefined. This helps avoid potential runtime errors and ensures smooth execution of the comparison operation.
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        //here we call this function and send the payload(user._id) and the response
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error is login controller", error.message)
        res.status(500).json({error:"Internal Server Error ok"})
    }
    
}

exports.logout = (req, res) => {
    try {
        //here our value will be nothing
        res.cookie("jwt","",{maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error is logout controller", error.message)
        res.status(500).json({error:"Internal Server Error ok"})
    }
}