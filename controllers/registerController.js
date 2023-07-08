const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.handleNewUser = async (req, res) => {
    const {username, pwd} = req.body;
    // Check if either is empty
    if(!username || !pwd){
        res.status(400).json({"message": "Username and password are required"});
    }
    // Check if a same username exists;
    const duplicate = await User.findOne({username: username}).exec();
    if(duplicate){
        return res.status(400); //conflict
    }
    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //Create and save a new user with the same command
        const newUser = await User.create({
            "username": username,
            "password": hashedPwd
        })
        console.log(newUser);
        res.status(201).json({"success": `The user ${username} has been created`})
    }
    catch (ex) {
        res.status(500);
    }
}