const User = require("../model/User");

exports.handleLogout = async (req, res) => {
    const cookies = req.cookies;
    //Check if either is empty
    if(!cookies?.jwt){
        res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken});
    if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        res.sendStatus(403);
    }
    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.sendStatus(204);
}