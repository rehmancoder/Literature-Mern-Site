import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Blog.css"


const SingleBlog = () => {
    const [blog, setBlog] = useState({});
    const { slug } = useParams()
    const [input, setInput] = useState(
        {
            title: "",
            description: "",
            category: "",
            image: "",
            image2: "",
            image3: "",
            description2: "",
            description3: "",

        }
    )

    const handleBlog = (e) => {
        setInput((preState) => ({
            ...preState,
            [e.target.name]: e.target.value

        }))

    }

    const localData = localStorage.getItem('userid')


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await axios.put(`https://mern-backend-pi.vercel.app/api/blog/updateblog/${slug}`, {
                title: input.title,
                description: input.description,
                category: input.category,
                image: input.image,
                image2: input.image2,
                image3: input.image3,
                description2: input.description2,
                description3: input.description3,
                user: localData


            }).then((data) => {
                if (data.data.success === true) {
                    toast.success(data.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            })

            setInput({
                title: "",
                description: "",
                category: "",
                image: "",
                image2: "",
                image3: "",
                description2: "",
                description3: "",

            })


        } catch (error) {
            console.log(error)

        }
    }



    const getSingleBlog = async () => {
        try {
            const res = await axios.get(`https://mern-backend-pi.vercel.app/api/blog/getoneblog/${slug}`)
            const data = await res.data;
            setBlog(data.blog)
            setInput({
                title: data.blog.title,
                description: data.blog.description,
                category: data.blog.category,
                image: data.blog.image,
                image2: data.blog.image2,
                image3: data.blog.image3,
                description2: data.blog.description2,
                description3: data.blog.description3,

            })

            // await axios.get(`http://localhost:5000/api/blog/getoneblog/${id}`).then((data) => {
            //     setBlog(data.data.blog)
            //     console.log(data.data.blog)
            //     setInput({
            //         title: blog.title,
            //         description: blog.description,
            //         category: blog.category,
            //         image: blog.image
            //     })


            // }).catch((error) => {
            //     console.log(error)
            // })


        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getSingleBlog()

    }, [slug])

    const optionArr = ["Select Category", "literature-guides", "poetry-guides", "plays", "literary-terms",
        "thesaurus", "grammer", "quizzes", "quotations", "movie-reviews", "series-reviews"]
    return (
        <>



            <ToastContainer />
            {

                input &&
                <div className="createBlog">
                    <h2 className='heading'>UPADATE YOUR BLOG</h2>
                    <form onSubmit={handleSubmit} className='blogForm'>
                        <div className='blogFormCh'>
                            <h2>Title</h2>
                            <input type="text" name='title' value={input.title} onChange={handleBlog} autoComplete='off' />
                        </div>
                        <div className='blogFormCh'>
                            <h2>Decription</h2>
                            {/* <input type="text" name='description' value={input.description} onChange={handleBlog} autoComplete='off' /> */}
                            <textarea name="description" value={input.description} cols="30" rows="30" onChange={handleBlog}></textarea>

                        </div>

                        <div className='blogFormCh'>
                            <h2>ImageURL</h2>
                            <input type="text" name='image' value={input.image} onChange={handleBlog} autoComplete='off' />
                        </div>
                        <div className='blogFormCh'>
                            <h2>Decription 2</h2>
                            {/* <input type="text" name='description2' value={input.description2} onChange={handleBlog} autoComplete='off' /> */}
                            <textarea name="description2" value={input.description2} cols="30" rows="30" onChange={handleBlog}></textarea>

                        </div>
                        <div className='blogFormCh'>
                            <h2>Decription 3</h2>
                            {/* <input type="text" name='description3' value={input.description3} onChange={handleBlog} autoComplete='off' /> */}
                            <textarea name="description3" value={input.description3} cols="30" rows="30" onChange={handleBlog}></textarea>

                        </div>
                        <div className='blogFormCh'>
                            <h2>ImageURL2</h2>
                            <input type="text" name='image2' value={input.image2} onChange={handleBlog} autoComplete='off' />
                        </div>
                        <div className='blogFormCh'>
                            <h2>ImageURL3</h2>
                            <input type="text" name='image3' value={input.image3} onChange={handleBlog} autoComplete='off' />
                        </div>
                        <div className='blogFormCh'>
                            <h2>Category</h2>
                            {/* <input type="text" name='category' value={input.category} onChange={handleBlog} autoComplete='off' /> */}
                            {
                                <select className='select' name="category" value={input.category} onChange={handleBlog} >


                                    {
                                        optionArr.map((option, index) => {
                                            return <option key={option} value={option}>{option}</option>
                                        })
                                    }
                                </select>
                            }
                        </div>
                        <button className='blogFormBtn' type='submit'>UPDATE</button>
                    </form>
                </div>

            }
        </>
    )
}

export default SingleBlog;