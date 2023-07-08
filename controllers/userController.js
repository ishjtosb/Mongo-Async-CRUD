const User = require("../model/User");

const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {

    const result = await User.find();

    if(result) {
        return res.status(200).json(result);
    }
    else{
        return res.sendStatus(404);
    }

}

exports.updateUsernamePassword = async (req, res) => {

    const {oldUName, newUName, password} = req.body;

    const foundUser = await User.findOne({username: oldUName});
    if(!foundUser) {
        return res.sendStatus(404);
    }
    foundUser.username = newUName;
    const hashedPwd = await bcrypt.hash(password, 10);
    foundUser.password = hashedPwd;
    const result = await foundUser.save();

    if(result) {
        return res.status(200).json({"message": "User details have been updated successfully!"});
    }

    return res.sendStatus(404);

}

exports.deleteUser = async (req, res) => {

    const usernameToBeDeleted = req.body.username;

    const foundUser = await User.findOne({username: usernameToBeDeleted});

    if(!foundUser) {
        return res.sendStatus(404);
    }

    const result = await User.deleteOne({username: usernameToBeDeleted});
    if(!result) {
        return res.sendStatus(400);
    }

    return res.status(200).json({"message": "User has been deleted"});

}