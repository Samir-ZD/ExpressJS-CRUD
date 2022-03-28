const User = require('../models/employeeModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

exports.signup = async (req, res) => {
    try {
        //check if user exists
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(409).json({ message: "User Already Exist" })
        }
        //compare passwords
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ message: "Password And Confirm Password Do Not Match" })
        }
        //encrypt password
        const salt = await bcrypt.genSalt(12)
        const hashPass = req.body.password = await bcrypt.hash(req.body.password, salt)

        //create user(Signup)
        const createUser = await User.create(req.body)
        res.status(200).json({ message: "User Created Successfully", data: createUser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({ message: "User Doesn't Exist" })
        }
        //compare inserted password with password in DB
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        res.status(200).json({ message: "Login Successfull" })
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}