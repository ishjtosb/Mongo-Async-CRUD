const User = require("../model/User");

const jwt = require("jsonwebtoken");

exports.handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //Check if either is empty
    if(!cookies?.jwt){
        return res.sendStatus(400);
    }
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({refreshToken: refreshToken})
    if(!foundUser){
        return res.sendStatus(403);
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username != decoded.username) {
                return res.sendStatus(403);
            }
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "30s"}
            );
            res.json({accessToken})
        }
    )
}