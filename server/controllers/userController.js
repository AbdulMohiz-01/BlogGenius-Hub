const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json(
            {
                message: "User created successfully",
                user: newUser
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {

}

module.exports = {
    registerUser,
    loginUser,
}