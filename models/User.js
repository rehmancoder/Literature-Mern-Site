const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blog: [{
        type: mongoose.Types.ObjectId,
        ref: "blogs",
        required: true
    }]

}, { timestamps: true })


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;