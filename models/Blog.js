const mongoose = require("mongoose");
const blogRouter = require("../routes/blog-routes");

const blogSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true

    },
    image2: {
        type: String,
    },
    description2: {
        type: String,
    },
    image3: {
        type: String,
    },
    description3: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        required: true

    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;