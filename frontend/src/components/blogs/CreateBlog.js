import React, { useState } from 'react';
import "./Blog.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const CreateBlog = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        category: "",
        image: "",
        image2: "",
        description2: "",
        image3: "",
        description3: "",

    })

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

            await axios.post("https://mern-backend-pi.vercel.app/api/blog/addblog", {
                title: input.title,
                description: input.description,
                category: input.category,
                image: input.image,
                image2: input.image2,
                description2: input.description2,
                image3: input.image3,
                description3: input.description3,
                user: localData


            }).then((data) => {
                if (data.data.success === true) {
                    toast.success(data.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    // navigate("/allblogs")
                    // setInput({
                    //     title: "",
                    //     description: "",
                    //     category: "",
                    //     image: "",
                    //     image2: "",
                    //     description2: "",
                    //     image3: "",
                    //     description3: "",
                    // })
                }
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                // console.log(error)
            })
            // const data = await res.data
            // if (data.success === true) {
            //     toast.success(data.message, {
            //         position: toast.POSITION.TOP_CENTER
            //     });
            // }
            // navigate('/signin')

            // console.log(data)
            // return data;

        } catch (error) {
            console.log(error)
            // console.log(error.response.data.message);
            // toast.error(error.response.data.message, {
            //     position: toast.POSITION.TOP_CENTER
            // })

        }
    }

    const optionArr = ["Select Category", "literature-guides", "poetry-guides", "plays", "literary-terms",
        "thesaurus", "grammer", "quizzes", "quotations", "movie-reviews", "series-reviews"]
    return (
        <>
            <ToastContainer />
            <div className="createBlog">
                <h2 className='heading'>POST YOUR BLOG</h2>
                <form className='blogForm' onSubmit={handleSubmit}>
                    <div className='blogFormCh'>
                        <h2>Title</h2>
                        <input type="text" name='title' value={input.title} onChange={handleBlog} autoComplete='off' />
                    </div>

                    <div className='blogFormCh'>
                        <h2>Decription</h2>
                        {/* <input type="texr" name='description' value={input.description} onChange={handleBlog} autoComplete='off' /> */}
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
                        <h2>Image2URL</h2>
                        <input type="text" name='image2' value={input.image2} onChange={handleBlog} autoComplete='off' />
                    </div>

                    <div className='blogFormCh'>
                        <h2>Decription 3</h2>
                        {/* <input type="text" name='description3' value={input.description3} onChange={handleBlog} autoComplete='off' /> */}
                        <textarea name="description3" value={input.description3} cols="30" rows="30" onChange={handleBlog}></textarea>

                    </div>
                    <div className='blogFormCh'>
                        <h2>Image3URL</h2>
                        <input type="text" name='image3' value={input.image3} onChange={handleBlog} autoComplete='off' />
                    </div>

                    <div className='blogFormCh'>
                        <h2>Category</h2>
                        {/* <input type="text" name='category' value={input.category} onChange={handleBlog} autoComplete='off' /> */}
                        <select className='select' name="category" value={input.category} onChange={handleBlog} >


                            {
                                optionArr.map((option, index) => {
                                    return <option key={option} value={option}>{option}</option>
                                })
                            }
                        </select>
                    </div>
                    <button className='blogFormBtn' type='submit'>SUBMIT</button>
                </form>
            </div>
        </>
    )
}

export default CreateBlog