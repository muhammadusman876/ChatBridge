const jwt = require("jsonwebtoken")

const generateTokenAndSetCookie = (userId, res) => {
    //payload that is method userId
    //we call the method, it takes the payload and this is information that will be embedded in jwt token and JWT_SECRET will used to sign the token and to verify the token will use userId payload
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    //set the above thing as a cookie
    res.cookie("jwt", token,{
            maxAge: 15 * 24 * 60 * 60 * 1000, //milisecond
            //will this it will be access by http so for example no one can access by javascript
            httpOnly: true, // prevent XSS attack cross-site scripting attacks
            sameSite : "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development" // http vs https basically cookie only works in https if you are not in development mode
    })
}

module.exports = generateTokenAndSetCookie;