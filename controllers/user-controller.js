const userModel = require("../models/User");
const bcrypt = require("bcrypt")

const getAllUsers = async(req, res) => {
    let users
    try {
        users = await userModel.find()
    } catch (error) {
        return console.log(error)
    }
    if (!users) {
        return res.status(404).send({
            message: "No user found"
        })
    }
    return res.status(200).send({
        TotalUsers: users.length,
        success: "true",
        users,
    })
}

const signupController = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exist please login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            blog: []
        })
        await user.save();

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })

    }



}


const loginController = async(req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }

        const existingUser = await userModel.findOne({ email })

        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "User not found please signup",
            })
        }

        const comparePasword = await bcrypt.compare(password, existingUser.password)

        if (!comparePasword) {
            return res.status(400).send({
                success: false,
                message: "Invalid userEmail or password",
            })
        }

        res.status(200).send({
            success: true,
            message: "Login sucessfully",
            user: existingUser
        })


    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })
    }
}


module.exports = { getAllUsers, signupController, loginController }