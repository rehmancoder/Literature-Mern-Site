import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import OneBlog from '../blogs/OneBlog';
import "./Cat1.css"

const Category1 = ({ data }) => {
    const [state, setState] = useState([])
    const [errorr, setErrorr] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    // const [categoryHeading, setCategoryHeading] = useState('');

    const getCategory1 = async () => {
        const encodedData = encodeURIComponent(data)
        try {
            setLoading(true)
            await axios.get(`https://mern-backend-pi.vercel.app/api/blog/category/${encodedData}?page=${currentPage}&limit=20`).then((data) => {
                setState(data.data.allBlogs)
                setErrorr(null)
                setTotalPage(data.data.totalPages)
                setLoading(false)

            }).catch((error) => {
                console.log(error)
                setErrorr(error.response.data.message)
                setState("")
                setLoading(false)



            })


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategory1();

    }, [data, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [data])

    const localData = localStorage.getItem('userid')
    // state && state.sort((blog1, blog2) => {
    //     const date1 = new Date(blog1.createdAt);
    //     const date2 = new Date(blog2.createdAt);
    //     return date1 - date2;
    // }).reverse();

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
    const convertHyphenToSpace = (hyphenatedString) => {
        return hyphenatedString.split('-').join(' ');
    };

    // useEffect(() => {


    // }, [data]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPage])
    return (
        <div className='category1GrandParent'>
            <>
                {
                    loading && <h2 className='loading'>LOADING...</h2>
                }
                {
                    !loading && state && <>
                        <div className='catImage'>
                            <img src="/images/banner2.jpeg" alt="banner" />
                            <h2 className='catHeading'>{convertHyphenToSpace(state[0]?.category || "Blog Category")}</h2>
                        </div>
                        <h2 className='recently'>Recently Added  </h2>
                    </>
                }

                <div className='catBlogsParent'>
                    {state && state.map((ele, index) => {
                        return (
                            <div key={ele._id}>
                                <div>
                                    <div className='catBlogs'>
                                        <OneBlog
                                            isUser={localData === ele.user._id}
                                            image={ele.image}
                                            title={ele.title}
                                            description={<NavLink to={`/blog/${ele.slug}`}><button className="readMoreBtn">Read More</button></NavLink>}
                                            category={ele.category}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )
                    }
                    {!loading && errorr && <>
                        <div className='emptyErrorDiv'>
                            <h2 className='error'>NO BLOGS FOUND</h2>
                            <NavLink to="/"><button >Go To HomePage</button></NavLink>
                        </div>
                    </>}
                </div>

                {!loading && state && <div className="pageBtns">
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
        </div>

    )
}

const arePropsEqual = (prevProps, nextProps) => {
    return prevProps.data === nextProps.data;
};
export default React.memo(Category1, arePropsEqual);