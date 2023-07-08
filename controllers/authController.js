const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.handleLogin = async (req, res) => {
    const {username, pwd} = req.body;
    //Check if either is empty
    if(!username || !pwd){
        res.status(400).json({"message": "Username and password are required"});
    }
    
    //Check if username exists
    const foundUser = await User.findOne({username: username}).exec();
    if(!foundUser){
        return res.sendStatus(404);
    }
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        const roles = Object.values(foundUser.roles)
        console.log(roles)
        // JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "10h"}
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        );
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({accessToken});
    }
    else{
        res.status(401).json({"failure": `The username or password is incorrect`});
    }
}