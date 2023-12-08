const mongoose = require("mongoose");


const connection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("database connected")

    } catch (error) {
        console.log(error)

    }
}

module.exports = connection;