const blogModel = require("../models/Blog");
const userModel = require("../models/User");
const mongoose = require("mongoose")
const slugify = require("slugify")

const getAllBlogs = async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    try {
        const totalRecords = await blogModel.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit)
        const blogs = await blogModel.find()
            .populate('user')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        if (!blogs) {
            return res.status(400).send({
                success: false,
                message: "No blogs found"
            })
        }

        res.status(200).send({
            TotalBlogs: blogs.length,
            success: true,
            message: "All blogs here",
            blogs,
            currentPage: page,
            totalPages
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })

    }


}


const addBlog = async(req, res) => {

    try {
        const { image, title, description, category, image2, description2, image3, description3, user } = req.body;
        const slug = slugify(title, { lower: true, strict: true })
        if (!title || !description || !user || !category) {
            return res.status(400).send({
                success: false,
                message: "Please fill All fields",
            })
        }

        const existingUser = await userModel.findById(user)
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "No user found with thid id",
            })
        }

        const blog = new blogModel({ image, title, description, category, image2, description2, image3, description3, user, slug });

        const session = await mongoose.startSession();
        session.startTransaction()
        await blog.save({ session })
        existingUser.blog.push(blog);
        await existingUser.save({ session })
        session.commitTransaction();


        return res.status(201).send({
            success: true,
            message: "Blog created successfully",
            blog
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })

    }


}


const updateBlog = async(req, res) => {
    try {
        const slug = req.params.slug;
        const { image, title, description, } = req.body;
        const blog = await blogModel.findOneAndUpdate({ slug }, {...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Blog updated successfully",
            blog
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })

    }

}

const getOneBlog = async(req, res) => {
    try {
        const slug = req.params.slug;
        const blog = await blogModel.findOne({ slug });
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "No blog found with this id",
            })
        }
        res.status(200).send({
            success: true,
            message: "Blog found",
            blog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })
    }

}



const deleteBlog = async(req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findByIdAndRemove(id).populate("user");
        await blog.user.blog.pull(blog);
        await blog.user.save()
        if (!blog) {
            return res.status(500).send({
                success: false,
                message: "Blog not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Blog deleted"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })

    }

}

const userAllBlogs = async(req, res) => {
    try {
        const { id } = req.params;
        const userBlog = await userModel.findById(id).populate("blog");
        console.log(userBlog)
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "No user found with this id"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User blogs",
            userBlog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })

    }


}

const cat = async(req, res) => {
    const { cat } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    try {
        const totalRecords = await blogModel.countDocuments({ category: cat });
        const totalPages = Math.ceil(totalRecords / limit)
        const allBlogs = await blogModel.find({ category: cat })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        // console.log("here are url params", req.params)
        if (allBlogs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No blogs found with this category"
            })
        }
        return res.status(200).send({
            success: true,
            allBlogs,
            currentPage: page,
            totalPages
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })

    }

}

// const searchController = async(req, res) => {
//     const query = req.query.q;
//     try {
//         const searchResults = await blogModel.find({
//             $or: [{
//                     title: { $regex: query, $options: 'i' }
//                 },
//                 {
//                     description: { $regex: query, $options: 'i' }
//                 }
//             ]
//         })
//         if (searchResults.length === 0) {
//             res.status(404).send({
//                 success: false,
//                 message: "No blogs found with these keywords",

//             })
//         } else
//             return res.status(200).send({
//                 total: searchResults.length,
//                 success: true,
//                 searchResults
//             })

//     } catch (error) {
//         return res.status(500).send({
//             success: false,
//             error
//         })
//     }

// }

const searchController = async(req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const query = req.query.q;
    const searchWords = query.split(' ');

    // Prepare an array to store the regular expressions for each word
    const searchRegexArray = searchWords.map((word) => new RegExp(word, 'i'));
    try {
        const totalRecords = await blogModel.countDocuments({
            $or: [{
                    title: { $in: searchRegexArray }
                },
                {
                    description: { $in: searchRegexArray }
                }
            ]
        });
        const totalPages = Math.ceil(totalRecords / limit)

        const searchResults = await blogModel.find({
                $or: [{
                        title: { $in: searchRegexArray }
                    },
                    {
                        description: { $in: searchRegexArray }
                    }
                ]
            }).skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })

        if (searchResults.length === 0) {
            res.status(404).send({
                success: false,
                message: "No blogs found with these keywords",

            })
        } else
            return res.status(200).send({
                total: searchResults.length,
                success: true,
                searchResults,
                currentPage: page,
                totalPages,
                totalRecords
            })

    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })
    }

}

module.exports = { getAllBlogs, addBlog, updateBlog, getOneBlog, deleteBlog, userAllBlogs, cat, searchController }