import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Blog.css"
import OneBlog from './OneBlog';
import { NavLink } from 'react-router-dom';

const Blog = ({ currentPage, setCurrentPage }) => {
    const [blog, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1);





    const getAllBlogs = async () => {
        try {
            setLoading(true)
            await axios.get(`https://mern-backend-pi.vercel.app/api/blog?page=${currentPage}&limit=20`).then((data) => {
                setBlogs(data.data.blogs)
                setTotalPage(data.data.totalPages)
                setLoading(false)

            }).catch((error) => {
                console.log(error)
                setLoading(false)

            })

            // const data = await res.data;
            // console.log(data.blogs)
            // setBlogs(data.blogs)
            // return data
        } catch (error) {
            console.log(error)
        }
    }
    // getAllBlogs()

    useEffect(() => {
        getAllBlogs()
        // console.log("blog is", blog)
        // blog.sort((blog1, blog2) => {
        //     const date1 = new Date(blog1.createdAt);
        //     const date2 = new Date(blog2.createdAt);
        //     return date1 - date2;
        // }).reverse();


    }, [currentPage])
    const localData = localStorage.getItem('userid')
    const localData2 = localStorage.getItem('user')




    // console.log("sorted blogs here ---------------------->", blog);



    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [currentPage])
    let message;
    if (blog.length === 0) {
        return message = <h2 className='allBlogsErrorHeading'>LOADING</h2>
    }



    return (
        <>
            <h2 className='allBlogsHeading'>ALL BLOGS</h2>
            {
                loading && <h2 className='loading'>Loading...</h2>
            }
            <div className='allBlogs'>

                {
                    blog && blog.map((ele, index) => {
                        return (
                            <div key={ele._id}>
                                <OneBlog
                                    blogId={ele._id}
                                    isUser={localData === ele.user._id && localData2}
                                    image={ele.image}
                                    title={ele.title}
                                    description={<NavLink to={`/blog/${ele.slug}`}> <button className="readMoreBtn">Read More</button>  </NavLink>}
                                    image2={ele.image2}
                                    description2={ele.description2}
                                    image3={ele.image3}
                                    description3={ele.description3}
                                    category={ele.category}
                                    slug={ele.slug}

                                />

                            </div>
                        )
                    })
                }
                {message}
            </div>

            {blog && <div className="pageBtns">
                <button className='prevBtn' onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <p><span>{currentPage}</span>OF<span>{totalPage}</span></p>
                <button className='nextBtn' onClick={handleNextPage} disabled={currentPage === totalPage}>
                    Next
                </button>
            </div>
            }

        </>
    )
}

const arePropsEqual = (preProps, nextProps) => {
    return preProps.currentPage === nextProps.currentPage

}

export default React.memo(Blog, arePropsEqual);