import React, { useState } from 'react';
import "./Blog.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LazyLoad from 'react-lazyload';


const OneBlog = ({ image, title, description, image2, description2, image3, description3, category, isUser, blogId, slug }) => {
    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/createblog/${slug}`)
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`https://mern-backend-pi.vercel.app/api/blog/deleteblog/${blogId}`).then((data) => {
            }).catch((error) => {
                console.log(error)

            })
            // .then(() => navigate("/")).then(() => navigate("/allblogs"))
            // navigate("/allblogs")
            // const data = await res.data;
            // navigate("/");
            // console.log(data)
            // navigate("/allblogs")
            window.location.reload();

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="oneBlog">
                <div className='oneBlogTop'>
                    {image &&
                        <LazyLoad className='oneBlogLazy' height={233} once>
                            <img src={image} alt='Blog_post_image' />
                        </LazyLoad>
                    }
                    <div className='oneBlogTop1'>
                        <h2 className='oneBlogHeading'>{title}</h2>
                        <p>{description}</p>
                        <p className='catPara'> Category : <span className='catSpan'> {category}</span>  </p>
                    </div>
                </div>
                {
                    isUser && (
                        <div className='oneBlogBottom'>
                            <button onClick={handleEdit} className='btn1'>Edit</button>
                            <button onClick={handleDelete} className='btn2'>Delete</button>
                        </div>
                    )
                }
            </div>

        </>
    )
}

export default OneBlog