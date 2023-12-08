const express = require("express");
const { getAllBlogs, addBlog, updateBlog, getOneBlog, deleteBlog, userAllBlogs, cat, searchController, } = require("../controllers/blog-controller");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs)
blogRouter.post("/addblog", addBlog);
blogRouter.put("/updateblog/:slug", updateBlog)
blogRouter.get("/getoneblog/:slug", getOneBlog);
blogRouter.delete("/deleteblog/:id", deleteBlog)
blogRouter.get("/user/:id", userAllBlogs)
blogRouter.get("/search", searchController)

// route for catogory 
blogRouter.get("/category/:cat", cat)









module.exports = blogRouter;