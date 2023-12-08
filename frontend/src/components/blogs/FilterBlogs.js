import React, { useContext, useEffect } from 'react'
import { AppState } from '../../App';
import OneBlog from './OneBlog';
import { NavLink } from "react-router-dom"

const FilterBlogs = () => {
    const { errorr, currentPage, setCurrentPage, searchResults, loading, totalPage, handleFilterBlogs } = useContext(AppState)
    // let userMessage = "To see Blogs please search";

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
        handleFilterBlogs();
    }, [currentPage])

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [currentPage])
    return (
        <>
            {!loading && searchResults && <h2 className='searchHeading'> Your Search Results </h2>}
            {
                loading && <h2 className='loading'>LOADING...</h2>

            }

            <div className='filterBlogs'>


                {
                    searchResults ?
                        (searchResults.map((ele, index) => {
                            return <div key={ele._id}>
                                <OneBlog
                                    image={ele.image}
                                    title={ele.title}
                                    description={<NavLink to={`/blog/${ele.slug}`}><button className="readMoreBtn">Read More</button></NavLink>}
                                    category={ele.category}
                                />
                            </div>
                        })
                        ) : errorr ? (<div className='emptyErrorDiv'>
                            <h2 className='filterBlogsError'>NO BLOGS FOUND</h2>
                            <NavLink to="/"><button >Go To HomePage</button></NavLink>
                        </div>) : <>
                            <h2 className='filterBlogsMessager'>{!loading && "TO SEE BLOGS PLEASE SEARCH"}</h2>
                        </>
                }




            </div>

            {searchResults && <div className="pageBtns">
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
// const arePropsEqual = (preProps, nextProps) => {
//     return preProps.currentPage === nextProps.currentPage

// }
export default FilterBlogs;