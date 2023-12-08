const express = require("express");
const connection = require("./configures/mongodb-connection");
const router = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const dotenv = require("dotenv");
const cors = require("cors")
const path = require('path');

const app = express();
dotenv.config();

connection();
app.use(cors());
app.use(express.json())
app.use('/api/user/', router)
app.use("/api/blog/", blogRouter)

// app.use(express.static(path.join(__dirname, './frontend/build')))

// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "./frontend/build/index.html"))

// })

const PORT = process.env.APP_PORT || 8000;

app.listen(PORT, () => {
    console.log("port is working")
})